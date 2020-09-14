<?php 
    session_start(); 
    require_once('conn.php');
    require_once('utils.php');

    if (empty($_POST['content'])) {
        header('Location: update_comment.php?errCode=1&id=' . $_POST['id']);
        die('請填寫完成');
    };

    $username = $_SESSION['username'];
    $id = $_POST['id'];
    $content = $_POST['content'];
    
    print_r($id);

    $sql = "update AlvinTsai7914_comments set content=? where id=? and username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sis', $content, $id, $username);
    $result = $stmt->execute();

    if (!$result) {
        die('Error' . $conn.error);
    };

      header("Location: index.php");
?>

