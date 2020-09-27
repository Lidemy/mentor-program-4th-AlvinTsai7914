<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");
  /*
    1. 從 cookie 裡面讀取 PHPSESSID (token)
    2. 從檔案讀取 session id 的內容
    3. 放到 $_SESSION
  */ 
  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  $id = $_GET['id'];
  $stmt = $conn->prepare('select * from alvintsai_comments where id = ?');
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();

  if (!$result) {
    die('Error' . $conn.error);
  };  

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
?>

<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="utf-8">

    <title>留言板</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>

  <header class='warning'>
    <strong>注意！本網站為練習用，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼！</strong>
  </header>

  <main class='board'>

    <?php 
      if (!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        if ($code == '1') {
          $msg = '資料不齊全';
        };
        echo '<h4 class="error">錯誤：' . $msg . '</h4>';
      };
    ?>
    <h3>
    你好！
    <?php echo escape($user['nickname']); ?>
    </h3>
    <h1 class='board__title'>編輯留言</h1>

    <!--留言表單-->
    <form method='POST' action='handle_update_comment.php' class='board__new-commnet-form'>
      <textarea name='content' row='5'><?php echo $row['content'];?></textarea>
      <input type='hidden' name='id' value='<?php echo $row['id'];?>'/>
      <input type='submit' class='board__submit-btn'></input>
    </form>
</main>
<script>
  var btn = document.querySelector('.board__update-nickname-btn')
  btn.addEventListener('click',function(){
    var form = document.querySelector('.board__update-user-form');
    form.classList.toggle('hide');
  })
</script>
</body>
</html>