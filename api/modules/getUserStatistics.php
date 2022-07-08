<?php
$api = new Api(null);
if(isset($_POST)){
	$user_login = $_POST['user_login'];

	$user = mysqli_fetch_assoc(mysqli_query($_SESSION['db'],"SELECT * FROM `user_statistics` WHERE `user_login` LIKE '$user_login'"));
	if($user){
		$api = new Api($user);
	}else{
		$api->add('question_count', 0);
		$api->add('question_true', 0);
		$api->add('test_count', 0);
		$api->add('badly_res', 0);
		$api->add('normal_res', 0);
		$api->add('not_bad_res', 0);
		$api->add('perfectly_res', 0);
	}
	$api->returnRes();
}
?>