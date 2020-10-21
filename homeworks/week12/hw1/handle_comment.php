<?php
    require_once('conn.php');
    header('Content-type:application/json;charset=utf-8');
    header('Access-Control-Allow-Origin: * ');

    if (empty($_GET['site_key'])) {
        $json = array (   
          "ok" => false,
          "message" => "Please send site_key in url"
        );
        
        $response = json_encode($json);
        echo $response;
        die();
    };

    $site_key = $_GET['site_key'];

    $page = 1;
    if (!empty($_GET['page'])) {
      $page = $_GET['page'];
    }
    $item_per_page = 5;
    $offset = ($page - 1) * $item_per_page; 

    $sql = '
    select nickname, content, created_at 
    from alvintsai_discussions 
    where site_key=? order by id desc
    limit ? offset ? 
    ';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sii', $site_key,  $item_per_page, $offset);
    $result = $stmt->execute();

    if (!$result) {
        $json = array(
            "ok" => false,
            "message" => $conn->error
        );
        $reponse = json_encode($json);
        echo $response;
        die(); 
    }

    $result = $stmt->get_result();
    $discussions = array();
    while ($row = $result->fetch_assoc()) {
        array_push($discussions,array(
            "nickname" => $row['nickname'],
            "content" => $row['content'],
            "created_at" => $row['created_at']
        ));
    }

    $json = array(
        "ok" => true,
        "discussions" => $discussions
    );

    $response = json_encode($json);
    echo $response;
?>
