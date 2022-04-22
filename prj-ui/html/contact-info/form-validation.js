$(function() {

    var $email = $('#email');
    var $phoneNumber1 = $('#phone-number1');
    var $phoneNumber2 = $('#phone-number2');
    

    $('#submit-contact').on('click', function() {
        if($email.val() == null){
            $email.val() == '';
        }
        if($phoneNumber2.val() == null){
            $email.val() == '';
        }

        var userContact = {
            phoneNumber1: $phoneNumber1.val(),
            phoneNumber2: $phoneNumber2.val(),
            email: $email.val(),
        };
        console.log($phoneNumber1.val())
        console.log(userContact);

        const token = localStorage.getItem('token');

        $.ajax({
            type: 'POST',
            url: 'http://35.164.243.187:3000/User/add-contact-info',
            headers: {'Authorization': 'Bearer ' + token},
            data: userContact,
            success: function() {
                console.log(userContact);
                window.location = "../loggedin.html"
            },
            error: function(){
                alert('Error')
            }
        });
    });
});