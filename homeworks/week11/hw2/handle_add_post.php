<?php 
    session_start(); 
    require_once('conn.php');
    require_once('utils.php');

    if (empty($_POST['post_title']) || empty($_POST['post_content'])) {
        header('Location: edit.php?errCode=1');
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

    $sql = "insert into alvintsai_blog_posts(username, post_title, post_content) values(?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss',$username, $title, $content);
    $result = $stmt->execute();


    if (!$result) {
        die('Error' . $conn.error);
    };

      header("Location: index.php?code=1");
?>

