<?php
    $rawPayload= file_get_contents('php://input');
    $temp = json_decode($rawPayload, true);
    
    $presision = $temp["presision"];
    $comment = $temp["comment"];
    $detected = $temp["condition"];
    // $detected = 'circling';
    
    $host = 'localhost';
    $user = 'root';
    $pass = '';
    $db = 'webextension';

    $con = mysqli_connect($host, $user, $pass, $db);
    if($con){
         echo('connected successfully to webextension');  
    }
        // $comment = $_POST['comment'];
        // $detection = $_POST['detection'];
        // $js_data = json_decode($_POST['php://input'], true);
        // echo $js_data['js_message'];
    
    // if(isset($_POST["body"])){
    
        // if(isset($_POST["Submit"])){
        $conn = mysqli_connect('localhost','root','','webextension');
        if($conn->connect_error){
             echo "$conn->connect_error";
            die("Connection Failed : ". $conn->connect_error);
        }
        //$sql = "INSERT INTO tests(`Dfired_emp_id`, `Dfired_deleter_id) VALUES ('55', '77')";
        $sql="INSERT INTO `Evaluation`(`comment`,  `accuracy`, `detected`) VALUES ('$comment','$presision', '$detected')";
        
        //$sql = "INSERT INTO Evaluation(comment, detected, accuracy) VALUES ('$comment', '$detected', $presision)";
        //$sql = "INSERT INTO Evaluation(comment, accuracy) VALUES ('$comment', '$presision')";
        if($conn){
            // echo($emp_id);
        }
        $conn->query($sql);
        
        $conn->close();
    // }

?>