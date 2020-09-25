<?php 
    session_start(); 
    require_once('conn.php');
    require_once('utils.php');

    if (empty($_POST['content'])) {
        header('Location: update_comment.php?errCode=1&id=' . $_POST['id']);
        die('請填寫完成');
    };

    if (!empty($_SESSION['username'])) {
        $username = $_SESSION['username'];
        $user = getUserFromUsername($username);
    }

    $username = $_SESSION['username'];
    $id = $_POST['id'];
    $content = $_POST['content'];

    
    if ($user['role'] == '2') {
        $sql = "update alvintsai_comments set content=? where id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('si', $content, $id);
        $result = $stmt->execute();
    }else {
        $sql = "update alvintsai_comments set content=? where id=? and username=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('sis', $content, $id, $username);
        $result = $stmt->execute();
    
    };

    if (!$result) {
        die('Error' . $conn.error);
    };

      header("Location: index.php");
?>

