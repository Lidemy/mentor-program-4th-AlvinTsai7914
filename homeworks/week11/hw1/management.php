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

  <main class='manage__board'>


    <?php if ($user['role'] !== '2') { 
        header("Location: index.php");
    }else{ ?>
        <a href='handle_logout.php' class='board__btn'>登出</a>
        <a href='index.php' class='board__btn'>回上一頁</a>
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
        <?php echo escape($user['nickname']); ?>
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
              <td><?php echo  escape($row['id']) ?></td>
              <td><?php echo  escape($row['nickname']) . '(@' . escape($row['username']) . ')' ?></td>
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
                <a class='manage__btn' href='handle_management.php?id=<?php echo $row['id']?>&role=0'>停權</a>
                <a class='manage__btn' href='handle_management.php?id=<?php echo $row['id']?>&role=1'>一般</a>
                <a class='manage__btn' href='handle_management.php?id=<?php echo $row['id']?>&role=2'>管理員</a>
              </td>
            </tr>
        <?php }}?>
    </table>
</main>
</body>
</html>
