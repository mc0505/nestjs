


$(function() {
    
    var $username= $('#username-field');
    var $password = $('#password-field')

    $('#signin-form-submit').on('click', function() {
        var signinUser = {
            username: $username.val(),
            password: $password.val(),
        }

        $.ajax({
            type: 'POST',
            url: 'http://35.164.243.187:3000/Auth/login',
            data: signinUser,
            success: function(data){
                localStorage.setItem('token', data);
                window.location = "../loggedin.html"
            },
            error: function(){
                $('#err-msg').addClass('show')
            }
        });
    });
});