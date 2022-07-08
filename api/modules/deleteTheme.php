<?php 
$api = new Api(null);
if(isset($_POST)){
    $theme = $_POST['theme'];
    $res = mysqli_query($_SESSION['db'],"DELETE FROM `themes` WHERE `theme` LIKE '$theme'");
    if($res){
        $api->add('res', true);
    }else{
        $api->add('res', false);
    }
    $api->returnRes();
}
?>