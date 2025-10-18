<?php
require 'database.php';

$input = json_decode(file_get_contents('php://input'), true);

if (empty($input['email']) || empty($input['password']) || empty($input['firstName']) || empty($input['lastName'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
    exit();
}

$connection = connect();
$connection->begin_transaction();

try {
    $stmt = $connection->prepare("SELECT user_id FROM users WHERE email = ?");
    $stmt->bind_param("s", $input['email']);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        throw new Exception('An account with this email already exists.', 409);
    }
    $stmt->close();

    $userStmt = $connection->prepare("INSERT INTO users (email, password, first_name, last_name, display_name, role, status) VALUES (?, ?, ?, ?, ?, ?, ?)");
    
    $hashedPassword = password_hash($input['password'], PASSWORD_DEFAULT);
    
    $displayName = $input['displayName'] ?? $input['firstName'] . ' ' . $input['lastName'];
    $role = $input['role'] ?? 'user';
    $status = 'active';
    
    $userStmt->bind_param("sssssss", $input['email'], $hashedPassword, $input['firstName'], $input['lastName'], $displayName, $role, $status);
    
    if (!$userStmt->execute()) {
        throw new Exception('Failed to create user account.');
    }
    
    $newUserId = $connection->insert_id;
    $userStmt->close();

    $profileStmt = $connection->prepare("INSERT INTO profiles (user_id, location, owner_bio, dog_name, dog_breed, dog_age, dog_sex, dog_size, dog_bio, avatar_url, cover_photo_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
    $location = $input['location'] ?? null;
    $ownerBio = $input['ownerBio'] ?? null;
    $dogName = $input['dogName'] ?? null;
    $dogBreed = $input['dogBreed'] ?? null;
    $dogAge = $input['age'] ?? null;
    $dogSex = $input['dogSex'] ?? null;
    $dogSize = $input['dogSize'] ?? null;
    $dogBio = $input['bio'] ?? null;
    $avatarUrl = $input['dogAvatar'] ?? null;
    $coverPhotoUrl = $input['dogCoverPhoto'] ?? null;

    $profileStmt->bind_param("issssssssss", $newUserId, $location, $ownerBio, $dogName, $dogBreed, $dogAge, $dogSex, $dogSize, $dogBio, $avatarUrl, $coverPhotoUrl);

    if (!$profileStmt->execute()) {
        throw new Exception('Failed to create user profile.');
    }
    $profileStmt->close();

    $connection->commit();
    echo json_encode(['success' => true, 'userId' => $newUserId]);

} catch (Exception $e) {
    $connection->rollback();
    http_response_code($e->getCode() > 0 ? $e->getCode() : 500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} finally {
    $connection->close();
}
?>