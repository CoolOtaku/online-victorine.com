<?php 
if(isset($_POST)){
	switch ($_POST['type']) {
		case 'byThemeAndName':
			ReturnByThemeAndName($_POST['theme'], $_POST['name']);
			break;
	}
}
function ReturnByThemeAndName($theme, $name){
    $test = mysqli_query($_SESSION['db'],"SELECT * FROM `quizzes` WHERE `theme` LIKE '$theme' AND `title` LIKE '$name'");
    $row = mysqli_fetch_assoc($test);
    $questionsObj = json_decode($row['questions']);
    $row['questions'] = $questionsObj;
    $res = json_encode($row);
    exit($res);
}
?>