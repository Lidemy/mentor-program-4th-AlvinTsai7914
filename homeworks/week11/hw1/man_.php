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
  $item_per_page = 10;
  $offset = ($page - 1) * $item_per_page;   //自動憑頁碼計算要跳過幾筆資料

  $stmt = $conn->prepare(
    'select * from alvintsai_users order by id '
  );
  $result = $stmt->execute();

  if (!$result) {
    die('Error' . $conn.error);
  };  

  $result = $stmt->get_result();
  ?>

<html lang="en">
<!DOCTYPE html>
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
      <a href='login.php' class='board__btn'>登入</a>
    <?php }else{ ?>
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


    <?php if ($user) { ?>
      <h3>
        你好！
        <?php echo  $user['nickname']; ?>
      </h3>
    <?php } ?>


    <h1 class='board__title'>會員管理</h1>

    <!--分隔線-->
    <div class='board__hr'></div> 
    <table  class='manage__table'  rules="all" cellpadding='5';>
      
        <?php 
          if ($user['role'] !== '2') { 
            echo '<h2>無權閱覽</h2>';
            echo '<a href="index.php">返回首頁</a>';
          }else{
        ?>
            <td>id</td>
            <td>暱稱(@帳號)</td>
            <td>使用者身分</td>
            <td>執行動作</td>
        <?php while ($row = $result->fetch_assoc()) { ?>          
            <tr>
              <td><?php echo  $row['id'] ?></td>
              <td><?php echo  $row['nickname'] . '(@' . $row['username'] . ')' ?></td>
              <td>
                <?php if ($row['role'] == '0') { ?>
                  <p style='color:red'>停權</p>
                <?php }else if ($row['role'] == '1'){ ?>
                  <p style='color:black'>一般使用者</p>
                <?php }else if ($row['role'] == '2'){ ?>
                  <p style='color:#0db4d4'>管理員</p>
                <?php } ?>
              </td>
              <td>
                <button class='manage__btn'>修改權限</button>
              </td>
            </tr>
        <?php }}?>
    </table>
</main>
</body>
</html>
