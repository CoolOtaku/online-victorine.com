<?php 
$api = new Api(null);
if(isset($_POST)){
    $theme = $_POST['theme'];
    $theme = str_replace("\"", "”", $theme);
    $theme = str_replace("'", "′", $theme);

    $res = mysqli_query($_SESSION['db'],"INSERT INTO `themes` (`theme`) VALUES ('$theme')");
    if($res){
        $api->add('res', true);
    }else{
        $api->add('res', false);
    }
    $api->returnRes();
}
?>