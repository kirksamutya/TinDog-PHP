<?php
require 'database.php';

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

if (empty($input['user_id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing user_id.']);
    exit();
}

$connection = connect();

$query = "UPDATE users SET 
    email = ?, 
    first_name = ?, 
    last_name = ?, 
    display_name = ?,
    status = ?
    WHERE user_id = ?";

$statement = $connection->prepare($query);
$statement->bind_param(
    "sssssi",
    $input['email'],
    $input['first_name'],
    $input['last_name'],
    $input['display_name'],
    $input['status'],
    $input['user_id']
);

if ($statement->execute()) {
    echo json_encode(['success' => true, 'message' => 'User updated successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to update user.']);
}

$statement->close();
$connection->close();
?>
