<?php
require 'database.php';

$connection = connect();
$result = $connection->query("SELECT user_id AS id, email, first_name, last_name, display_name, role, status, is_master_admin FROM users");

$users = [];
while($row = $result->fetch_assoc()) {
    $users[] = $row;
}

$connection->close();
echo json_encode($users);
?>