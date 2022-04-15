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
            url: 'http://localhost:3000/Auth/login',
            data: signinUser,
            headers: {"Authorization": localStorage.getItem('token')},
            success: function(data){
                console.log(signinUser)
                window.location = "../loggedin.html"
            },
            error: function(){

                $('#err-msg').addClass('show')
            }
        });

        $.ajax({
            type: 'Get',
            url: 'http://localhost:3000/Auth/login',
            headers: {"Authorization": localStorage.getItem('token')},
            success: function(data){
                console.log(signinUser)
                window.location = "../loggedin.html"
            },
            error: function(){

                $('#err-msg').addClass('show')
            }
        });
    });
});