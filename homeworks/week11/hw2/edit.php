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

  if (!$user || $user['role'] !== '2') {
    Header('Location:index.php?errCode=3');
  }

  if (!empty($_GET['post_id'])){
    $id = $_GET['post_id'];
  }


  $stmt = $conn->prepare('SELECT * FROM alvintsai_blog_posts WHERE id=?');
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
        <a href='index.php  '>Who's Blog</a>
      </div>
      <ul class="navbar__list">
        <div>
          <li><a href="admin.php">文章列表</a></li>
          <li><a href="#">分類專區</a></li>
          <li><a href="#">關於我</a></li>
        </div>
        <div>
          <li><a href="edit.php">新增文章</a></li>     
          <li><a href="handle_logout.php">登出</a></li>     

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
<?php if (!empty($id)) { ?>
        <form action="handle_update_post.php" method="POST">
<?php }else {?>
        <form action="handle_add_post.php" method="POST">
<?php } ?>
          <div class="edit-post__title">
            編輯文章：
          </div>
          <div class="edit-post__input-wrapper">
            <textarea name='post_title' class="edit-post__input"><?php if(!empty($id)) {echo escape($row['post_title']);} ?></textarea>
          </div>
          <div class="edit-post__input-wrapper">
            <textarea name='post_content' rows="20" class="edit-post__content"><?php if(!empty($id)) {echo escape($row['post_content']);} ?></textarea>
          </div>
          <div class="edit-post__btn-wrapper">
          <input type='hidden' name='id' value='<?php echo $row['id'];?>'/>
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
         echo $input = 
          ($id) ? 
          '<input type="submit" class="edit-post__btn" value="編輯送出"></input>':
          '<input type="submit" class="edit-post__btn"  value="新增送出"></input>';    
?>
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>

</body>
</html>