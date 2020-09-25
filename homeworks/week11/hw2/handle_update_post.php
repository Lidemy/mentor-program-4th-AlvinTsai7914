<?php 
    session_start(); 
    require_once('conn.php');
    require_once('utils.php');

    if (empty($_POST['post_title']) || empty($_POST['post_content'])) {
        header('Location: edit.php?errCode=1&post_id=' . $_POST['id']);
        die('請填寫完成');
    };

    if (!empty($_SESSION['username'])) {
        $username = $_SESSION['username'];
        $user = getUserFromUsername($username);
    }

    $username = $_SESSION['username'];
    $id = $_POST['id'];
    $title = $_POST['post_title'];
    $content = $_POST['post_content'];

    $sql = "update alvintsai_blog_posts set post_title=?, post_content=? where id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssi', $title, $content, $id);
    $result = $stmt->execute();


    if (!$result) {
        die('Error' . $conn.error);
    };

      header("Location: index.php?code=2");
?>

