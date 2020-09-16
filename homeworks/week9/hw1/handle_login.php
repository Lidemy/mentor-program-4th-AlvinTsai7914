<?php 
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    if (empty($_POST['username']) || empty($_POST['password'])) {
        header('Location: login.php?errCode=1');
        die('請填寫完成');
    };

    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "select * from AlvinTsai7914_users where username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s',$username);
    $result = $stmt->execute();
    
    /* prepare_stmt 取代
    $sql = sprintf(
        "select * from users where username='%s'",
        $username
    );
    $result = $conn->query($sql);
    */
    if (!$result) {
        die($conn->error);
    }

    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        header('Location: login.php?errCode=2');
        exit();
    }

    $row = $result->fetch_assoc();
    if (password_verify($password,$row['password'])){
        //登入成功
        /*
            1. 產生 session id (token)
            2. 把 username 寫入檔案
            3. set-cookie: session-id
        */
        $_SESSION['username'] = $username;



        /*
        //登入成功
        //設定token
        $token = generateToken();
        $sql = sprintf(
            "insert into tokens(token,username) values('%s','%s')", 
            $token,
            $username
        );
        $conn->query($sql);
        if (!$result) {
            die($conn->error);
        }

        //儲存到COOKIE
        setcookie('token',$token,time() + 3600*3);
        */
        header('Location: index.php');
    }else{
        header('Location: login.php?errCode=2');
    };
?>