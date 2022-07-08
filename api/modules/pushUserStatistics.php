<?php
$api = new Api(null);
if(isset($_POST)){
	$user_login = $_POST['user_login'];
	$question_count = $_POST['question_count'];
	$question_true = $_POST['question_true'];
	$res = $_POST['res'];

	$user = mysqli_fetch_assoc(mysqli_query($_SESSION['db'],"SELECT * FROM `user_statistics` WHERE `user_login` LIKE '$user_login'"));
	if($user){
		$q_c = $user['question_count'] + $question_count;
		$q_t = $user['question_true'] + $question_true;
		$test_count = $user['test_count']+1;
		$res_count = $user[$res]+1;
		$result = mysqli_query($_SESSION['db'],"UPDATE `user_statistics` SET `question_count` = $q_c, `question_true` = $q_t, `test_count` = $test_count, `".$res."` = ".$res_count." WHERE `user_login` LIKE '$user_login';");
	}else{
		$result = mysqli_query($_SESSION['db'],"INSERT INTO `user_statistics` (`user_login`, `question_count`,`question_true`,`$res`) VALUES ('$user_login', $question_count, $question_true, 1);");
	}
	if ($result) {
		exit("true");
	}else{
		exit("false");
	}
}
?>