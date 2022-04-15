$(function() {

    var $name = $('#name');
    var $username = $('#username');
    var $password = $('#password');
    

    $('#add-user').on('click', function() {
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
            },
            error: function(){
                alert('Error signing up')
            }
        });
    });
});


// // Look at console
// $(document).ready(function() {
// 	var loginUsername;
// 	var loginPassword;
//     var loginName;
// 	var account = [loginUsername, loginPassword, loginName];

// 	$('#create-button').on('click', function() {
// 		var createUsernameEntry = $("#create-username").val();
// 		var createPasswordEntry = $("#create-password").val();
// 		var createNameEntry = $("#create-name").val();
//     var createUsernameValid = false;
//     var createPasswordValid = false;
//     var createNameValid = false;
//     var createUsernameObject = $("#create-username");
//     var createPasswordObject = $("#create-password");
//     var createNameObject = $("#create-name");
//     var validate = /^\s*[a-zA-Z0-9,\s]+\s*$/;

//     if(!validate.test(createUsernameEntry) || (createUsernameEntry).length == 0) {
//         $(createUsernameObject).addClass("error")
//         $(createUsernameObject).val("No special characters or spaces.")
//     } else {
//         createUsernameValid = true;
//         var createUsername = $(createUsernameObject).val();
//     }
    
//     if(!validate.test(createPasswordEntry) || (createPasswordEntry).length == 0) {
//         $(createPasswordObject).addClass("error");
//         $(createPasswordObject).val("No special characters or spaces.");
//     } else {
//         createPasswordValid = true;
//         var createPassword = $(createPasswordObject).val();
//     }
    
//     if(!validate.test(createNameEntry) || (createNameEntry).length == 0) {
//         $(createNameObject).addClass("error");
//         $(createNameObject).val("No special characters or spaces.");
//     } else {
//         createNameValid = true;
//         var createName = $(createNameObject).val();
//     }
    
//     $(createUsernameObject).on('click', function () {
//         $(this).val("");  
//         $(this).removeClass("error");
//     });
    
//     $(createPasswordObject).on('click', function () {
//         $(this).val("");  
//         $(this).removeClass("error");
//     });
    
//     $(createNameObject).on('click', function () {
//         $(this).val("");
//         $(this).removeClass("error");
//     });
    
// 		account = [createUsername, createPassword, createName];
// 		console.log("Account Username " + account[0]);
// 		console.log("Account Password " + account[1]);
//         console.log("Account Name " + account[2]);
    
// 		if(createUsernameValid == true && createPasswordValid == true && createNameValid == true) {
//             $('form').animate({
// 			height: "toggle",
// 			opacity: "toggle"
// 		}, "fast");
//     }
// 	});

// 	$('.message a').on('click', function() {
// 		$('form').animate({
// 			height: "toggle",
// 			opacity: "toggle"
// 		}, "fast");
// 	});
// });