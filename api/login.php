<?php
session_start();
require_once '<api/database.php';

$conn = connect();


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    if (empty($email) || empty($password)) {
        header("Location: login_page.php?error=empty");
        exit();
    }
    
    $stmt = $conn->prepare("SELECT user_id, email, password, first_name, last_name, role, status FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        if ($user['status'] !== 'active') {
            header("Location: login_page.php?error=suspended");
            exit();
        }
        
        if ($password === $user['password']) {
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_name'] = $user['first_name'] . ' ' . $user['last_name'];
            $_SESSION['user_role'] = $user['role'];
            header("Location: dashboard.php");
            exit();
        } else {
            header("Location: login_page.php?error=invalid");
            exit();
        }
    } else {
        header("Location: login_page.php?error=invalid");
        exit();
    }
    
    $stmt->close();
}

$conn->close();
?>