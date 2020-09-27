<?php 
    session_start(); 
    require_once('conn.php');
    require_once('utils.php');

    if (empty($_GET['id'])) {
        header('Location: index.php?errCode=3');
        die('請填寫完成');
    };

    if (!empty($_SESSION['username'])) {
        $username = $_SESSION['username'];
        $user = getUserFromUsername($username);
    }
    
    $id = $_GET['id'];

    if (!empty($user) && $user['role'] == '2') {
        $sql = "update alvintsai_blog_posts set is_deleted=1 where id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $id);
        $result = $stmt->execute();
    }

    if (!$result) {
        die('Error' . $conn.error);
    };

      header("Location: admin.php");
?>

