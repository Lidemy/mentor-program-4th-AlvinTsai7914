<?php 
    require_once('conn.php');

    if (empty($_POST['nickname']) || empty($_POST['username']) || empty($_POST['password'])) {
        header('Location: register.php?errCode=1');
        die('請填寫完成');
    };

    
    $nickname = $_POST['nickname'];
    $username = $_POST['username'];
    $password = password_hash($_POST['password'],PASSWORD_DEFAULT);

    $sql = 'insert into alvintsai_users(nickname, username, password) value(?,?,?)';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss',$nickname ,$username, $password);
    $result = $stmt->execute();
    
    /* 
    $sql = sprintf(
        "insert into users(nickname, username, password) value('%s','%s','%s')",
        $nickname,$username,$password
    );

    $result = $conn->query($sql);
    */

    if (!$result) {
        $code = $conn->errno;
        if ($code == 1062) {
            header('Location: register.php?errCode=2');
        }
        die('Error' . $conn->error);
    };

      header("Location: index.php");
?>