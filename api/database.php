<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

function connect() {
    $serverName = "sql12.freesqldatabase.com";
    $username = "sql12802844";
    $password = "ltm1KTaiw4";
    $dbName = "sql12802844";

    $connection = new mysqli($serverName, $username, $password, $dbName);

    if ($connection->connect_error) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
        exit();
    }

    return $connection;
}
?>