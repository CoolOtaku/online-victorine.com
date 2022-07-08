<?php 
if(isset($_POST)){
	ReturnThemes();
}
function ReturnThemes(){
    $themes = mysqli_query($_SESSION['db'],"SELECT * FROM `themes`");
    $emparray = array();
    while($row = mysqli_fetch_assoc($themes)){
        $value = $row['theme'];
        $count = mysqli_fetch_assoc(mysqli_query($_SESSION['db'],"SELECT COUNT(*) as total FROM `quizzes` WHERE `theme` LIKE '$value'"));
        $row['count_tests'] = $count['total'];
        $emparray[] = $row;
    }
    $res = json_encode($emparray);
	exit($res);
}
?>