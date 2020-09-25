<?php 
    session_start(); 
    require_once('conn.php');
    require_once('utils.php');

    if (empty($_GET['id'])) {
        header('Location: index.php?errCode=1');
        die('請填寫完成');
    };

    if (!empty($_SESSION['username'])) {
        $username = $_SESSION['username'];
        $user = getUserFromUsername($username);
    }
    
    $id = $_GET['id'];
    $role = $_GET['role'];

    if ($user['role'] == '2') {
        $sql = "update alvintsai_users set role=? where id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ii', $role, $id);
        $result = $stmt->execute();
    }else {
        header("Location: index.php");
    }

    if (!$result) {
        die('Error' . $conn.error);
    };

        header("Location: management.php");
?>

