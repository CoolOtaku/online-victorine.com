<?php 
$api = new Api(null);
if(isset($_POST)){
    $quizzes = json_decode($_POST['newQuizzes']);

    $res = mysqli_query($_SESSION['db'],"INSERT INTO `quizzes` (`theme`, `title`, `cover`, `questions`) VALUES ('".$quizzes->theme."', '".$quizzes->title."', '".$quizzes->cover."', '".questionsEncoding($quizzes->questions)."')");
    if($res){
        $api->add('res', true);
    }else{
        $api->add('res', false);
    }
    $api->returnRes();
}
function questionsEncoding($questions){
    foreach ($questions as &$value) {
        $value->question = str_replace("\"", "”", $value->question);
        $value->question = str_replace("'", "′", $value->question);
        foreach ($value->answers as &$v) {
            $v = str_replace("\"", "”", $v);
            $v = str_replace("'", "′", $v);
        }
    }
    return json_encode($questions, JSON_UNESCAPED_UNICODE);
}
?>