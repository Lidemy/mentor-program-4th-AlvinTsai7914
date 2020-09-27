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

  /*被 php 內建 session 取代
  $username = NULL;
  
  if (!empty($_COOKIE['token'])) {
    $user = getUserFromToken($_COOKIE['token']);
    $username = $user['username'];
  }
  */

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = $_GET['page'];
  }
  $item_per_page = 10;
  $offset = ($page - 1) * $item_per_page;   //自動憑頁碼計算要跳過幾筆資料

  $stmt = $conn->prepare(
    'select '.
      'C.id as id, C.content as content, '.
      'C.created_at as created_at, U.nickname as nickname, U.username as username '.
    'from alvintsai_comments as C ' .
    'left join alvintsai_users as U on C.username = U.username '.
    'where C.is_deleted is NULL '.
    'order by C.id desc '.
    'limit ? offset ? '
  );
  $stmt->bind_param('ii', $item_per_page, $offset);
  $result = $stmt->execute();
  //$result = $conn->query('select * from comments order by id desc');
  
  if (!$result) {
    die('Error' . $conn.error);
  };  
  $result = $stmt->get_result();

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


    <?php if (!$username) { ?>
      <a href='register.php' class='board__btn'>註冊</a>
      <a href='login.php' class='board__btn'>登入</a>
    <?php }else if ($user['role'] == '2'){ ?>
      <a href='handle_logout.php' class='board__btn'>登出</a>
      <a href='management.php' class='board__btn'>會員管理</a>
    <?php }else { ?>
      <a href='handle_logout.php' class='board__btn'>登出</a>
    <?php }?>

    <?php 
      if (!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        if ($code == '1') {
          $msg = '資料不齊全';
        };
        echo '<h4 class="error">錯誤：' . $msg . '</h4>';
      };
    ?>


    <?php 
      if ($user) {
      ?>
    <h3>
      你好！
      <?php echo escape($user['nickname']); ?>
      <button class='board__update-nickname-btn'>編輯暱稱</button>
    </h3>
    <?php } ?>
    
    <!--改暱稱表單-->
    <form method='POST' action='handle_update_user.php' class='hide board__update-user-form'>
      <div class='board__nickname'>
        <span>新的暱稱：</span>
        <input type='text' name='nickname'/>
        <input type='submit' class='board__nickname-submit-btn'/>
      </div>
    </form>
    <h1 class='board__title'>Comments</h1>

    <!--留言表單-->
    <form method='POST' action='handle_add_comment.php' class='board__new-commnet-form'>
      <textarea name='content' row='5'></textarea>
      <?php if (!$username) { ?>
        請先登入
      <?php }else if ($user['role'] == '0'){ ?>
        <p class='baned'>您已被停權，請聯絡管理員。</p>
      <?php }else{ ?> 
        <input type='submit' class='board__submit-btn'></input>
      <?php }?>
    </form>

    <!--分隔線-->
    <div class='board__hr'></div> 
    
    <!--下面的留言-->
    <?php
        if (!$user || $user['role'] !== '2'){ 
          while ($row = $result->fetch_assoc()) { 
    ?>
            <section class='card'>
                <div class='card__avatar'></div>
                <div class='card__body'>
                  <div class='card__info'>
                    <span class='card__autor'>
                      <?php echo escape($row['nickname']); ?>
                      (@<?php echo escape($row['username']); ?>)
                    </span>
                    <span class='card__time'>
                      <?php echo $row['created_at']; ?>
                    </span>
                    <!--編輯按鈕-->
                    <?php if($row['username'] === $username) {?>
                    <a href='update_comment.php?id=<?php echo $row['id']?>'>編輯</a>
                    <?php } ?>
                    <!--刪除按鈕-->
                    <?php if($row['username'] === $username) {?>
                    <a href='handle_delete_comment.php?id=<?php echo $row['id']?>'>刪除</a>
                    <?php } ?>
                  </div>  
                  <p class="card__content"><?php echo escape($row['content']); ?></p>
                </div>
            </section>
      <?php 
        }}else {
          while ($row = $result->fetch_assoc()) { 
        ?>
              <section class='card'>
                <div class='card__avatar'></div>
                <div class='card__body'>
                  <div class='card__info'>
                    <span class='card__autor'>
                      <?php echo escape($row['nickname']); ?>
                      (@<?php echo escape($row['username']); ?>)
                    </span>
                    <span class='card__time'>
                      <?php echo $row['created_at']; ?>
                    </span>
                    <a href='update_comment.php?id=<?php echo $row['id']?>'>編輯</a>
                    <a href='handle_delete_comment.php?id=<?php echo $row['id']?>'>刪除</a>
                  </div>  
                  <p class="card__content"><?php echo escape($row['content']); ?></p>
                </div>
              </section>
      <?php }}?>                
    <div class='board__hr'></div> 

    <?php 
      $stmt = $conn->prepare(
        'select count(id) as count from alvintsai_comments where is_deleted IS NULL'
      );
      $result = $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $count = $row['count'];
      $total_page = ceil($count / $item_per_page);

    ?>
    <div class='page-info'>
      <span>總共有 <?php echo $count ?> 筆留言，頁數：</span>
      <span><?php echo $page ?> / <?php echo $total_page ?> </span>
    </div>
    <div class='paginator'>
    <?php if ($page != 1) { ?>
      <a href='index.php?page=1'>首頁</a>
      <a href='index.php?page=<?php echo $page - 1?>'>上一頁</a>
    <?php } ?>
    <?php if ($page != $total_page) { ?>
      <a href='index.php?page=<?php echo $page + 1?>'>下一頁</a>
      <a href='index.php?page=<?php echo $total_page ?>'>最後一頁</a>
    <?php } ?>
    </div>
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