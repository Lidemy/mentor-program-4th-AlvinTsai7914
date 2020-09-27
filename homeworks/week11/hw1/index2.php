<?php
require_once('conn.php');
  $result = $conn->query('SELECT * FROM AlvinTsai7914_users');
  if (!result) {
    die($conn->error);
  };

  while ($row = $result->fetch_assoc()) {
    echo 'id' . $row['id'];
    echo '<br>';
    echo 'username' . $row['username'] . '<br>';
  }

  ?>