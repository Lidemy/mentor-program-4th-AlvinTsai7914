<?php 
  require_once("conn.php");

  $result = $conn->query('select * from AlvinTsai7914_comments order by id desc');

  if (!$result) {
    die('Error' . $conn.error);
  }
?>

<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="utf-8">

    <title>註冊會員</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>

  <header class='warning'>
    <strong>注意！本網站為練習用，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼！</strong>
  </header>

  <main class='board'>
    <a href='index.php' class='board__btn'>回留言板</a>
    <a href='login.php' class='board__btn'>登入</a>
    <h1 class='board__title'>註冊會員</h1>

    <?php 
      if (!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        if ($code == '1') {
          $msg = '資料不齊全';
        }elseif ($code == '2') {
          $msg = '帳號已被註冊';
        };
        echo '<h4 class="error">錯誤：' . $msg . '</h4>';
      };
    ?>

    <form method='POST' action='handle_register.php' class='board__new-commnet-form'>
      <div class='board__nickname'>
        <span>暱稱：</span>
        <input type='text' name='nickname'/>
      </div>
      <div class='board__nickname'>
        <span>帳號：</span>
        <input type='text' name='username'/>
      </div>
      <div class='board__nickname'>
        <span>密碼：</span>
        <input type='password' name='password'/>
      </div>
      <input type='submit' class='board__submit-btn'></input>
    </form>

</main>


</body>
</html>