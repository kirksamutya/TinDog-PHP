<?php
require 'database.php';

// Get user ID from the query string (e.g., ?user=1)
$userId = $_GET['user'] ?? 0;

if ($userId <= 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid user ID specified.']);
    exit();
}

$connection = connect();
$statement = $connection->prepare("SELECT user_id AS id, email, first_name, last_name, display_name, role, status, is_master_admin FROM users WHERE user_id = ?");
$statement->bind_param("i", $userId);
$statement->execute();
$result = $statement->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode(['success' => true, 'data' => $user]);
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'User not found.']);
}

$statement->close();
$connection->close();
?>