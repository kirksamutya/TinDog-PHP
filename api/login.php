<?php
require 'database.php';

$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

$connection = connect();
$statement = $connection->prepare("SELECT user_id, password, status FROM users WHERE email = ? AND role = 'user'");
$statement->bind_param("s", $email);
$statement->execute();
$result = $statement->get_result();

$response = ['success' => false, 'message' => 'Invalid user credentials.'];

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        $response = [
            'success' => true,
            'userId' => $user['user_id'],
            'status' => $user['status']
        ];
    }
}

$statement->close();
$connection->close();
echo json_encode($response);
