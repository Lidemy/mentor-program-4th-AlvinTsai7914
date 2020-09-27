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
  $id = $_GET['post_id']; 
  $stmt = $conn->prepare( 'SELECT * FROM alvintsai_blog_posts WHERE id=?');
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  
  if (!$result) {
    die('Error' . $conn.error);
  };  
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
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
<?php if (!empty($user) && $user['role'] == '2') { ?>
          <li><a href="edit.php">新增文章</a></li>
<?php }?>
<?php if(!empty($user)) { ?>          
          <li><a href="handle_logout.php">登出</a></li>
<?php }else { ?>
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
      <article class="post">
        <div class="post__header">
          <div><?php echo escape($row['post_title'])?></div>
          <div class="post__actions">
<?php if (!empty($user) && $user['role'] == '2') { ?>
            <a class="post__action" href="edit.php?post_id=<?php echo  $row['id']?>">編輯</a>
<?php } ?>
          </div>
        </div>
        <div class="post__info">
          <?php echo $row['created_at']?>
        </div>
        <div class="post__content">
          <?php echo escape($row['post_content'])?>
        </div>
      </article>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>


