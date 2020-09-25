<?php 
    require_once('conn.php');

    header('Content-type:application/json;charset=utf-8');

    if (empty($_POST['content'])) {
        $JSON = array(
            "result" => false,
            "message" => "Plese input content"
        );
        $response = json_encode($JSON);
        echo $response;
        die();
    };

    $username = $_POST['username'];
    $content = $_POST['content'];

    $sql = 'insert into AlvinTsai7914_comments(username, content) values(?,?)';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss',$username,$content);
    $result = $stmt->execute();

    if (!$result) {
        $JSON = array(
            "result" => false,
            "message" => $conn->error
        );
        $response = json_encode($JSON);
        echo $response;     
        die();
    };

    $JSON = array(
        "result" => true,
        "message" => "Seccess",
    );

    $response = json_encode($JSON);
    echo $response; 
?>
