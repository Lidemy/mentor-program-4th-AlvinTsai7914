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

  $stmt = $conn->prepare(
    'select '.
      'P.id as id, P.post_content as content, '.
      'P.post_title as title, P.created_at as created_at, U.username as username '.
    'from alvintsai_blog_posts as P ' .
    'left join alvintsai_users as U on P.username = U.username '.
    'where P.is_deleted is NULL '.
    'order by P.id desc '
  );

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
    <div class="container">
      <div class="admin-posts">
<?php while ($row = $result->fetch_assoc()) {?>
        <div class="admin-post" >
          <div class="admin-post__title">
            <a href="blog.php?post_id=<?php echo $row['id'] ?>"><?php echo escape(mb_substr($row['title'],0,40,"UTF-8")) ?></a>
          </div>
          <div class="admin-post__info">
            <div class="admin-post__created-at">
              <?php echo $row['created_at'] ?>
            </div>
<?php if (!empty($user) && $user['role'] == '2') { ?>
            <a class="admin-post__btn" href="edit.php?post_id=<?php echo $row['id']?>">
              編輯
            </a>
            <a class="admin-post__btn delete_post_btn" name="<?php echo $row['title']?>" id="<?php echo $row['id']?>">
              刪除
            </a>
<?php }?>
          </div>
        </div>
<?php } ?>
        

      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
  <!--<div class='delete__background'></div>
  <form class='delete__form' method='POST' action='handle_delete.php'>
      <div class='delete__form-title'>確定刪除文章「123132」?</div>
      <div class='delete__form-button'>
        <input type='submit' value='刪除' name='confirm_delete' ></input>
        <input type='button' value='取消' name='cancle_delete'></input>
      </div>
  </form>-->
  <script>
    var body = document.querySelector('body');
    var element = document.querySelector('.admin-posts');
    var delete_post_btn = document.querySelector('.delete_post_btn');



    element.addEventListener('click',function (e) {
      if (e.target.classList == 'admin-post__btn delete_post_btn') {
        body.setAttribute("style","overflow:hidden")
        var div = document.createElement('div');
        div.classList = 'delete__background';

        var form = document.createElement('form');
        form.setAttribute("class", "delete__form");
        form.setAttribute("method", "GET");
        form.setAttribute("action", `handle_delete_post.php`);
        form.innerHTML = `
        <div class='delete__form-title'>確定刪除「${escape(e.target.name)}」?</div>
          <div class='delete__form-button'>
            <input type='hidden' name='id' value='${escape(e.target.id)}'/>
            <input type='submit' value='刪除'></input>
            <input class='delete__form-button__cancel-btn' type='button' value='取消' name='cancle_delete'></input>
            <input style=display:none 
          </div>`;

        body.appendChild(div);
        body.appendChild(form);
        listener();
      }
    })


    function listener() {
      var element = document.querySelector('.delete__form');
      element.addEventListener('click',function(e){
        console.log(e.target)
        if(e.target.classList == 'delete__form-button__cancel-btn') {
          body.setAttribute("style","");
          var form = document.querySelector('.delete__form');
          var div = document.querySelector('.delete__background')
          body.removeChild(div);
          body.removeChild(form);
        }

    })
    }

  </script>
</body>
</html>