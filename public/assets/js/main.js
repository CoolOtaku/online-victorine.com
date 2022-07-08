var initial_position;
var last_position;
var thisQuestion;
function setSesion(){
  initial_position = -1;
  last_position = TestData.questions.length-1;
}
function setQuestion(){
  initial_position++;
  if(initial_position > last_position){
    CompleteTheTest();
  }else if(initial_position == last_position) {
    $("#btn_next").text("Завершити тест");
  }
  thisQuestion = TestData.questions[initial_position];
  $("#question").text(thisQuestion.question);
  $("#answers").empty();
  $.each(thisQuestion.answers, function(i, v) {
    $("#answers").append("<div class=\"alert alert-dark\" role=\"alert\"><input type=\"radio\" class=\"btn-check\" name=\"resanswer\" id=\""+i+"\" autocomplete=\"off\"><label class=\"btn btn-outline-success\" for=\""+i+"\">"+v+"</label></div>");
  });
}
function verifyAnswer(){
  var selected = document.querySelector('input[name="resanswer"]:checked');
  if(selected == null){
    var noSelected = document.getElementById('liveToast');
    var toast = new bootstrap.Toast(noSelected);
    toast.show();
    return false;
  }
  answersSets.push(selected.id);
  if(selected.id == thisQuestion.true_reply){
    count_true_reply++;
  }
  setQuestion();
}
jQuery.isSubstring = function(haystack, needle) {
  return haystack.indexOf(needle) !== -1;
};
