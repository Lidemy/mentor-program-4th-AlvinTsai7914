<?php 
    session_start(); 
    require_once('conn.php');
    require_once('utils.php');

    if (empty($_POST['nickname'])) {
        header('Location: index.php?errCode=1');
        die('請填寫完成');
    };

    $username = $_SESSION['username'];
    //$user = getUserFromToken($_COOKIE['token']);
    $nickname = $_POST['nickname'];
    $sql = "update alvintsai_users set nickname=? where username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss',$nickname,$username);
    $result = $stmt->execute();

    /*$sql = sprintf("insert into comments(nickname, content) values('%s','%s')",$nickname,$content);
    $result = $conn->query($sql);*/

    if (!$result) {
        die('Error' . $conn.error);
    };

      header("Location: index.php");
?>

