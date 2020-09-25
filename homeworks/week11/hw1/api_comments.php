<?php 
    require_once("conn.php");
        $page = 1;
    if (!empty($_GET['page'])) {
        $page = $_GET['page'];
    }
    $item_per_page = 10;
    $offset = ($page - 1) * $item_per_page;   

    $stmt = $conn->prepare(
        'select '.
        'C.id as id, C.content as content, '.
        'C.created_at as created_at, U.nickname as nickname, U.username as username '.
        'from comments as C ' .
        'left join users as U on C.username = U.username '.
        'where C.is_deleted is NULL '.
        'order by C.id desc '.
        'limit ? offset ? '
    );
    $stmt->bind_param('ii', $item_per_page, $offset);
    $result = $stmt->execute();
    if (!$result) {
        die('Error' . $conn.error);
      };  
    $result = $stmt->get_result();
    $comments = array();
    while ($row = $result->fetch_assoc()    ) {
        array_push($comments,array(
            "id" => $row['id'],
            "username" => $row['username'],
            "nickname" => $row['nickname'],
            "created_at" => $row['created_at'],
            "content" => $row['content'],
        ));
    }

    $JSON = array();
    $JSON = array(
        "comments" => $comments
    );

    $response = json_encode($JSON);
    header('Content-type:application/json;charset=utf-8');
    echo $response;

?>