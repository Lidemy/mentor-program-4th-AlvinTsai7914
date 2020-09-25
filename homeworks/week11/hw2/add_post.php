<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = $_GET['page'];
  }
  $item_per_page = 5;
  $offset = ($page - 1) * $item_per_page;  

  $stmt = $conn->prepare(
    'select '.
      'P.id as id, P.post_content as content, '.
      'P.post_title as title, P.created_at as created_at, U.username as username '.
    'from alvintsai_blog_posts as P ' .
    'left join alvintsai_users as U on P.username = U.username '.
    'where P.is_deleted is NULL '.
    'order by P.id desc '.
    'limit ? offset ? '
  );
  $stmt->bind_param('ii', $item_per_page, $offset);
  $result = $stmt->execute();
  
  if (!$result) {
    die('Error' . $conn.error);
  };  
  $result = $stmt->get_result();
?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <nav class="navbar">
    <div class="wrapper navbar__wrapper">
      <div class="navbar__site-name">
        <a href='index.php  '>Who's Blog</a>
      </div>
      <ul class="navbar__list">
        <div>
          <li><a href="admin.php">文章列表</a></li>
          <li><a href="#">分類專區</a></li>
          <li><a href="#">關於我</a></li>
        </div>
        <div>
<?php 
  if ($user) { 
    if ($user['role'] == '2') {
?>
          <li><a href="#">後台管理</a></li>     
<?php } ?>    
          <li><a href="handle_logout.php">登出</a></li>     
<?php }else{ ?>          
          <li><a href="login.php">登入</a></li>
<?php } ?>
        </div>
      </ul>
    </div>
  </nav>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="container-wrapper">
    <div class="container">
      <div class="edit-post">
        <form action="" method="POST">
          <div class="edit-post__title">
            發表文章：
          </div>
          <div class="edit-post__input-wrapper">
            <input class="edit-post__input" placeholder="請輸入文章標題" />
          </div>
          <div class="edit-post__input-wrapper">
            <textarea rows="20" class="edit-post__content"></textarea>
          </div>
          <div class="edit-post__btn-wrapper">
<?php if (!empty($user) && $user['role'] == '2') { ?>
              <div class="edit-post__btn">送出</div>
<?php }else if (!empty($user) && $user['role'] == '1'){ ?>
              <div class='ban'>您的權限無法新增文章。</div>
              <a class="btn-read-more" href="index.php"?>READ MORE</a>
<?php }else{}?>           
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>