<?php
    global $db;
    $Ip = "localhost";
    $UserName = "root";
    $Password = "";
    $DbName = "online_victorine";
    
    $db = mysqli_connect($Ip, $UserName, $Password, $DbName);
    mysqli_set_charset($db, "utf8mb4");
    
    if(!$db){
        die ("ПОМИЛКА підключення до Б!");
    }

    date_default_timezone_set('Europe/Kiev');

?>
