<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");
  if (!empty($_GET['code'])) {
    $code = $_GET['code'];
    switch ($code) {
      case '1':
        echo '<script>alert("新增完成");</script>';
        break;
      case '2':
        echo '<script>alert("編輯完成");</script>';
        break;
      default:
        break;
    }
  }


  if (!empty($_GET['errCode'])) {
    $error = $_GET['errCode'];
    switch ($error) {
      case '1':
        echo '<script>alert("連線失敗，請重新一次");</script>';
        break;
      case '3':
        echo '<script>alert("您沒有權限");</script>';
        break;
      default:
        break;
    }
  }

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
        <a href='index.php'>Who's Blog</a>
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
          <li><a href="edit.php">新增文章</a></li>     
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
    <div class="posts">
<?php
  while ($row = $result->fetch_assoc()) { 
    $title = $row['title'];
    $created_at = $row['created_at'];
    $content = $row['content'];
?>        
      <article class="post">
        <div class="post__header">
          <div><?php echo escape(mb_substr($title,0,48,"UTF-8")) ?></div>
          <div class="post__actions">
<?php if (!empty($user) && $user['role'] == '2') { ?>
            <a class="post__action" href="edit.php?post_id=<?php echo $row['id']?>">編輯</a>
<?php }?>
          </div>
        </div>
        <div class="post__info"><?php echo $created_at ?></div>
        <div class="post__content"><?php echo escape(mb_substr($content,0,300,"UTF-8")) ?></div>
        <a class="btn-read-more" href="blog.php?post_id=<?php echo $row['id']?>">READ MORE</a>
      </article>
<?php } ?>
    </div>
  </div> 
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>