let api_key = $("#api_key").val();
Start();
loadUser();
function Start(){
  let formData = new FormData();
  formData.append("api_key", api_key);
  formData.append("type", "themes");
  $.ajax({
      type: "POST",
      url: 'api/getTests',
      contentType: false,processData: false,dataType: "json",
      data:formData,
      success: function(response) {
        response.themes.forEach((value, index) => {
          $("#tests").append("<div class=\"text-center alert alert-dark\" aria-label=\""+value+"\"><div class=\"container-fluid justify-content-center\"><div class=\"bg-color2 rounded-3\"><button class=\"btn collapsed w-100\" data-bs-toggle=\"collapse\" data-bs-target=\"#t"+index+"\" aria-controls=\"t"+index+"\" aria-expanded=\"false\" aria-label=\""+value+"\"><h4>"+value+"</h4></button></div><div class=\"row navbar-collapse collapse\" id=\"t"+index+"\"></div></div></div>")
          
          formData.append("type", "byTheme");
          formData.append("theme", value);
          $.ajax({
            type: "POST",
            url: 'api/getTests',
            contentType: false,processData: false,dataType: "json",
            data:formData,
            success: function(response2) {
              response2.forEach((v, i) => {
                $("#t"+index).append("<div class=\"col-md-6\"><div class=\"card text-center\"><div class=\"card-header\"><h5 class=\"card-title\">"+v.title+"</h5></div><div class=\"card-body\"><div style=\"background-image: url("+v.cover+");\" class=\"rounded mx-auto d-block img-test\"></div><a href=\"javascript: goToTest('"+v.title+"','"+value+"')\" class=\"btn btn-primary mt-2\">Пройти тест</a></div><div class=\"card-footer text-muted fst-italic\">"+v.questions.length+" Запитань</div></div></div>")
              })
            }
          });
        })
      }
  });
}
function loadUser(){
  if($.cookie('user_image')){
    $("#login-img").attr('src', $.cookie('user_image'));
  }
}
function goToTest(name, theme){
  $.cookie('test_name', name);
  $.cookie('test_theme', theme);
  window.location.href = "test";
}
function Search() {
    $("#search-content").empty();
    var searchText = $("#search-text").val();
    if(searchText !== "") {
        $.each($(".card").clone(), function (i, v) {
            if($.isSubstring(v.innerHTML,searchText)){
                $("#search-content").append(v);
            }
        });
    }
}