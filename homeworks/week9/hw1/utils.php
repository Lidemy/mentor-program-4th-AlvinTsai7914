<?php
  require_once('conn.php');

  function generateToken () {
    $s = '';
    for ($i=1; $i<=16; $i++) {
      $s.=chr(rand(65,90));
    };
    return $s;
  }

  function getUserFromUsername ($username) {
    global $conn;
    $sql = sprintf(
      "select * from AlvinTsai7914_users where username = '%s'",
      $username
    );
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row;
  };
  
  /*被 getUserFromUsername() 取代
  function getUserFromToken () {
    global $conn;
    //依 COOKIE 裡的 token，從 db-tokens 裡找出 username
    $token = $_COOKIE['token'];
    $sql = sprintf(
      "select username from tokens where token = '%s'",
      $token
    );
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $username = $row['username'];

    //依 username 從 db-users 裡抓出 * (含 id, username, nickname)
    $sql = sprintf(
      "select * from users where username = '%s'",
      $username
    );
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row;
  };
  */

  function escape($str) {
    return htmlspecialchars($str,ENT_QUOTES);
  }
?>