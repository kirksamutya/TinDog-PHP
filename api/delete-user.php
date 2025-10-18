<?php
require 'database.php';

$input = json_decode(file_get_contents('php://input'), true);
$userId = $input['userId'] ?? 0;

$response = ['success' => false, 'message' => 'Invalid user ID.'];

if ($userId > 0) {
    $connection = connect();
    // Prevent master admin from being deleted
    $statement = $connection->prepare("DELETE FROM users WHERE user_id = ? AND is_master_admin = FALSE");
    $statement->bind_param("i", $userId);

    if ($statement->execute() && $statement->affected_rows > 0) {
        $response = ['success' => true];
    } else {
        $response['message'] = 'User could not be deleted or does not exist.';
    }
    $statement->close();
    $connection->close();
}

echo json_encode($response);
?>