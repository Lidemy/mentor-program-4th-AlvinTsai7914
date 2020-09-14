<?php 
    session_start(); 
    require_once('conn.php');
    require_once('utils.php');

    if (empty($_POST['content'])) {
        header('Location: index.php?errCode=1');
        die('請填寫完成');
    };
    
    //$user = getUserFromToken($_COOKIE['token']);
    $username = $_SESSION['username'];
    $content = $_POST['content'];

    $sql = 'insert into AlvinTsai7914_comments(username, content) values(?,?)';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss',$username,$content);
    $result = $stmt->execute();

    /*$sql = sprintf("insert into comments(nickname, content) values('%s','%s')",$nickname,$content);
    $result = $conn->query($sql);*/

    if (!$result) {
        die('Error' . $conn.error);
    };

      header("Location: index.php");
?>

