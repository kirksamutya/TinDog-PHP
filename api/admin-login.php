<?php
require 'database.php';

$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

$connection = connect();
$statement = $connection->prepare("SELECT user_id, password FROM users WHERE email = ? AND role = 'admin'");
$statement->bind_param("s", $email);
$statement->execute();
$result = $statement->get_result();

$response = ['success' => false, 'message' => 'Invalid administrator credentials.'];

if ($result->num_rows > 0) {
    $admin = $result->fetch_assoc();
    if ($password === $admin['password']) {
        $response = ['success' => true, 'adminId' => $admin['user_id']];
    }
}

$statement->close();
$connection->close();
echo json_encode($response);
?>