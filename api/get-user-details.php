<?php
require 'database.php';

$userId = $_GET['user'] ?? 0;

if ($userId <= 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid user ID specified.']);
    exit();
}

$connection = connect();

$statement = $connection->prepare("
    SELECT 
        u.user_id AS id, u.email, u.first_name, u.last_name, u.role, u.status, u.is_master_admin, u.created_at, u.last_seen,
        p.display_name, p.location, p.owner_bio, p.dog_name, p.dog_breed, p.dog_age, p.dog_sex, p.dog_size, p.dog_bio
    FROM users u
    LEFT JOIN profiles p ON u.user_id = p.user_id
    WHERE u.user_id = ?
");
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