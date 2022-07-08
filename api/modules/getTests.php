<?php 
if(isset($_POST)){
	switch ($_POST['type']) {
		case 'themes':
			ReturnThemes();
			break;
		case 'byTheme':
			ReturnByTheme($_POST['theme']);
			break;
		case 'all':
			ReturnAll();
			break;
	}
}
function ReturnThemes(){
    $themes = mysqli_query($_SESSION['db'],"SELECT * FROM `themes`");
    $emparray = array();
    while($row = mysqli_fetch_assoc($themes)){
        $emparray[] = $row['theme'];
    }
    $res = "{\n\"themes\":\n".json_encode($emparray)."\n}";
	exit($res);
}
function ReturnByTheme($theme){
    $tests = mysqli_query($_SESSION['db'],"SELECT * FROM `quizzes` WHERE `theme` LIKE '$theme'");
    $emparray = array();
    while($row = mysqli_fetch_assoc($tests)){
    	$questionsObj = json_decode($row['questions']);
    	$row['questions'] = $questionsObj;
        $emparray[] = $row;
    }
    $res = json_encode($emparray);
    exit($res);
}
function ReturnAll(){
	$tests = mysqli_query($_SESSION['db'],"SELECT * FROM `quizzes`");
    $emparray = array();
    while($row = mysqli_fetch_assoc($tests)){
    	$questionsObj = json_decode($row['questions']);
    	$row['questions'] = $questionsObj;
        $emparray[] = $row;
    }
    $res = json_encode($emparray);
    exit($res);
}
?>