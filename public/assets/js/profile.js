let api_key = $("#api_key").val();
loadUser();
function loadUser(){
    $("#user-avatar").attr('src', $.cookie('user_image'));
    $("#user-name").text($.cookie('user_full_name'));
    $("#user-email").text($.cookie('user_email'));
    $("#user-email").attr('href', "mailto:"+$.cookie('user_email'));

    let formData = new FormData();
    formData.append("api_key", api_key);
    formData.append("user_login", $.cookie('user_email'));
    
    $.ajax({
        type: "POST",
        url: 'api/getUserStatistics',
        contentType: false,processData: false,dataType: "json",
        data:formData,
        success: function(response) {
            var percentage = parseInt((response.question_true * 100 / response.question_count));
            $("#user-statistic").html("Загальна кількість пройдених запитань: "+response.question_count
            +";<br>Загальна кількість правельних відповідей на запитання: "+response.question_true
            +";<br>Загальна кількість не правельних відповідей: "+(response.question_count - response.question_true)
            +";<br>Загальна кількість пройдених тестів: "+response.test_count
            +";<br>Загальний відсоток правельності: "+percentage+"%.");

            $("#user-percentage").text(percentage+"%");
            $("#user-progress").attr('aria-valuenow', percentage);
            $("#user-progress").attr('style', "width: "+percentage+"%");

            $("#user-res-1").text("Кількість відмінних результатів: "+response.perfectly_res);
            $("#user-res-2").text("Кількість хороших результатів: "+response.not_bad_res);
            $("#user-res-3").text("Кількість нормальних результатів: "+response.normal_res);
            $("#user-res-4").text("Кількість поганих результатів: "+response.badly_res);
        }
    });
    
    formData = new FormData();
    formData.append("api_key", api_key);
    formData.append("email", $.cookie('user_email'));
    $.ajax({
        type: "POST",
        url: 'api/verifyAdmin',
        contentType: false,processData: false,dataType: "json",
        data:formData,
        success: function(response) {
            if(response.res){
                $("#header-buttons").append(response.button)
            }
        }
    });
}
function signOut() {
    Swal.fire({
        title: 'Вихід з профілю',
        text: "Ви дійсно хочете вийти з профілю?",
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Ні',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Так'
      }).then((result) => {
        if (result.isConfirmed) {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function() {
                $.cookie('user_id', "");
                $.cookie('user_full_name', "");
                $.cookie('user_image', "");
                $.cookie('user_email', "");
                document.location.href = "/";
            });
        }
      })
}