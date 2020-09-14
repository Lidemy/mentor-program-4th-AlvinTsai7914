<?php 
    session_start(); 
    require_once('conn.php');
    require_once('utils.php');

    if (empty($_GET['id'])) {
        header('Location: index.php?errCode=1');
        die('請填寫完成');
    };

    $id = $_GET['id'];
    $username = $_SESSION['username'];
    //hard delete
    //$sql = "delete from comments where id=?";

    //soft delete
    $sql = "update AlvinTsai7914_comments set is_deleted=1 where id=? and username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $id, $username);
    $result = $stmt->execute();

    if (!$result) {
        die('Error' . $conn.error);
    };

      header("Location: index.php");
?>

