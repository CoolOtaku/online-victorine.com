if($.cookie('user_id')){
    document.location.href = "profile";
}
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    if(!profile.getId()){
        Swal.fire({
            icon: 'error',
            title: data.title ,
            text: data.res
        })
    }else{
        $.cookie('user_id', profile.getId());
        $.cookie('user_full_name', profile.getName());
        $.cookie('user_image', profile.getImageUrl());
        $.cookie('user_email', profile.getEmail());
        document.location.href = "/";
    }
}