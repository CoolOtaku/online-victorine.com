let api_key = $("#api_key").val();

var TestData = null;
var count_true_reply = 0;
var answersSets = [];
var theme = $.cookie('test_theme');
var name = $.cookie('test_name');

let formData = new FormData();
formData.append("api_key", api_key);
formData.append("type", "byThemeAndName");
formData.append("theme", theme);
formData.append("name", name);

$.ajax({
  type: "POST",
  url: 'api/getTest',
  contentType: false, processData: false, dataType: "json",
  data: formData,
  success: function (response) {
    TestData = response;
    $("#test-cover").attr("style", "background-image: url(" + TestData.cover + ");");
    $("#title").text(TestData.title);
    setSesion();
    setQuestion();
  }
});

$("#btn_next").click(function () {
  verifyAnswer();
});

function CompleteTheTest() {
  var percentage = (count_true_reply * 100 / initial_position);
  $("#test-cover").attr("class", "");
  if (percentage <= 40) {
    $("#test-cover").attr("style", "background-image: url(public/assets/img/badly_icon.png); background-repeat: no-repeat; background-position: center; height: 150px;");
    $("#question").text("Трішки погано, але не розчаровуйся");
  } else if (percentage >= 41 && percentage <= 60) {
    $("#test-cover").attr("style", "background-image: url(public/assets/img/normal_icon.png); background-repeat: no-repeat; background-position: center; height: 150px;");
    $("#question").text("Нормально, не поганий результат!");
  } else if (percentage >= 61 && percentage <= 99) {
    $("#test-cover").attr("style", "background-image: url(public/assets/img/not_bad_icon.png); background-repeat: no-repeat; background-position: center; height: 150px;");
    $("#question").text("Хороший результат, так тримати!");
  } else if (percentage == 100) {
    $("#test-cover").attr("style", "background-image: url(public/assets/img/perfectly_icon.png); background-repeat: no-repeat; background-position: center; height: 150px;");
    $("#question").text("Perfect!!! Ви пройшли тест ідеально!");
  }
  $("#answers").empty();
  $("#answers").append("<div class=\"text-center alert alert-dark\">Загальний відсоток правельних відповідей: " + percentage + "%<br>Кількість правельних відповідей: " + count_true_reply + "<br>Кількість запитань: " + initial_position + "</div>")
  $("#con-btn").html("<button id=\"btn_exit\" class=\"btn btn-primary mb-3\">Ок</button>");
  $("#btn_exit").click(function () { window.location.href = "/"; });

  $.each(TestData.questions, function (index, value) {
    var itemView = "";
    $.each(value.answers, function (i, v) {
      var bg = "bg-color2";
      if (i == answersSets[index]) {
        bg = "bg-danger bg-gradient";
      }
      if (i == value.true_reply) {
        bg = "bg-success bg-gradient";
      }
      itemView += "<div class=\"p-md-2 mb-2 text-black rounded " + bg + "\">" + v + "</div>";
    });
    $("#con-btn").append("<div class=\"text-center alert alert-dark\"><h5 class=\"pb-2 text-center fst-italic border-bottom\">" + value.question + "</h5>" + itemView + "</div>")
  });

  if ($.cookie('user_email')) {
    pushRes();
  }
}

function pushRes() {
  var res = $("#question").text();
  switch (res) {
    case "Трішки погано, але не розчаровуйся":
      res = "badly_res";
      break;
    case "Нормально, не поганий результат!":
      res = "normal_res";
      break;
    case "Хороший результат, так тримати!":
      res = "not_bad_res";
      break;
    case "Perfect!!! Ви пройшли тест ідеально!":
      res = "perfectly_res";
      break;
  }

  let formData = new FormData();
  formData.append("api_key", api_key);
  formData.append("user_login", $.cookie('user_email'));
  formData.append("question_count", initial_position);
  formData.append("question_true", count_true_reply);
  formData.append("res", res);

  $.ajax({
    type: "POST",
    url: 'api/pushUserStatistics',
    contentType: false, processData: false,
    data: formData,
    success: function (response) {
      console.log(response);
    }
  });
}