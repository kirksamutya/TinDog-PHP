<?php
require 'database.php';

$input = json_decode(file_get_contents('php://input'), true);

if (empty($input['email']) || empty($input['password']) || empty($input['firstName']) || empty($input['lastName'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
    exit();
}

$connection = connect();

$stmt = $connection->prepare("SELECT user_id FROM users WHERE email = ?");
$stmt->bind_param("s", $input['email']);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    http_response_code(409); // 409 Conflict
    echo json_encode(['success' => false, 'message' => 'An account with this email already exists.']);
    $stmt->close();
    $connection->close();
    exit();
}
$stmt->close();

$statement = $connection->prepare("INSERT INTO users (email, password, first_name, last_name, display_name, role, status) VALUES (?, ?, ?, ?, ?, ?, ?)");

$displayName = $input['displayName'] ?? $input['firstName'] . ' ' . $input['lastName'];
$role = $input['role'] ?? 'user';
$status = 'active';

$statement->bind_param("sssssss", $input['email'], $input['password'], $input['firstName'], $input['lastName'], $displayName, $role, $status);

$response = [];
if ($statement->execute()) {
    $newUserId = $connection->insert_id;
    $response = ['success' => true, 'userId' => $newUserId];
} else {
    http_response_code(500);
    $response = ['success' => false, 'message' => 'Failed to create user.'];
}

$statement->close();
$connection->close();
echo json_encode($response);
?>