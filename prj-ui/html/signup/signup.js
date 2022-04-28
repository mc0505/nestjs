$(function() {

    var $name = $('#name');
    var $username = $('#username');
    var $password = $('#password');
    var $repassword = $('#repassword')
    

    $('#add-user').on('click', function() {
        if($password.val() != $repassword.val()){
            alert("Password does not match! Try again.");
        }
        else {
            var signupUser = {
                username: $username.val(),
                password: $password.val(),
                name: $name.val(),
            };

            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/Auth/sign-up',
                data: signupUser,
                success: function(newUser) {
                    console.log(signupUser)
                    window.location = "../signin/signin.html"
                },
                error: function(){
                    alert('Error signing up')
                }
            });
        }
    });
});