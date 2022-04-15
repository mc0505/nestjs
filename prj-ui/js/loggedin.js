// $(function() {
//     const token = localStorage.getItem('token');
//     console.log(token);
//     $.ajax({
//         type: 'Get',
//         url: 'http://localhost:3000/Auth/protected',
//         headers: {'Authorization': 'Bearer ' + token},
//         success: function(data){
//             console.log(data)
//         },
//     });
// });

$(function() {
    
    var $contactInfo = $('#contact-info')
    const token = localStorage.getItem('token');
    console.log(token);

    $.ajax({
        type: 'Get',
        url: 'http://localhost:3000/User/check-user-profile',
        headers: {'Authorization': 'Bearer ' + token},
        success: function(data){
            $contactInfo.append('<p> ID: ' + data.userId
            + '<br> Phone number 1: ' + data.phoneNumber
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