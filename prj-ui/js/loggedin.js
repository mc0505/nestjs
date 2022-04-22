$(function() {
    
    var $contactInfo = $('#contact-info')
    const token = localStorage.getItem('token');

    $.ajax({
        type: 'Get',
        url: 'http://35.164.243.187:3000/User/check-user-profile',
        headers: {'Authorization': 'Bearer ' + token},
        success: function(data){
            $contactInfo.append('<p> ID: ' + data.userId
            + '<br> Phone number 1: ' + data.phoneNumber1
            + '<br> Phone number 2: ' + data.phoneNumber2
            + '<br> Email address: ' + data.email + '</p>'
            )
        },
        error: function(){
            $contactInfo.append("Please update your contact.")
        }
    });
});


$(function(){

    $('#sign-out').on('click', function() {
        localStorage.clear();
    });

});