<?php 
require_once $_SERVER['DOCUMENT_ROOT']."/router/router.php";
require_once $_SERVER['DOCUMENT_ROOT']."/api/db.php";
require_once $_SERVER['DOCUMENT_ROOT']."/api/api.php";
$url = key($_GET);

$_SESSION['ApiKey'] = base64_encode($_SERVER['REMOTE_ADDR']);
$_SESSION['db'] = $db;
if($_POST['api_key'] != $_SESSION['ApiKey']){
    exit('{"error":"Invalid api_key!"}');
}

$r = new Router();
$r->addRoute("getTests", "modules/getTests.php");
$r->addRoute("getTest", "modules/getTest.php");
$r->addRoute("pushUserStatistics", "modules/pushUserStatistics.php");
$r->addRoute("getUserStatistics", "modules/getUserStatistics.php");

$r->addRoute("verifyAdmin", "modules/verifyAdmin.php");
$r->addRoute("getThemes", "modules/getThemes.php");
$r->addRoute("addNewTheme", "modules/addNewTheme.php");
$r->addRoute("deleteTheme", "modules/deleteTheme.php");
$r->addRoute("addNewQuizzes", "modules/addNewQuizzes.php");
$r->addRoute("deleteQuizzes", "modules/deleteQuizzes.php");
$r->addRoute("getAdministrators", "modules/getAdministrators.php");
$r->addRoute("addAdministrators", "modules/addAdministrators.php");
$r->addRoute("deleteAdministrators", "modules/deleteAdministrators.php");
$r->addRoute("editQuizzes", "modules/editQuizzes.php");

$r->route($url);
?>