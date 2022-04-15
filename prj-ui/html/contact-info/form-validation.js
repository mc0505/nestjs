$(function() {

  var $email = $('#email');
  var $phoneNumber1 = $('#phone-number');
  var $phoneNumber2 = $('#phone-number2');
  

  $('#add-user').on('click', function() {
      var userContact = {
          email: $email.val(),
          phoneNumber1: $phoneNumber1.val(),
          phoneNumber2: $phoneNumber2.val(),
      };

      $.ajax({
          type: 'POST',
          url: 'http://localhost:3000/User/add-contact-info',
          data: userContact,
          success: function(newUser) {
              console.log(userContact)
          },
          error: function(){
              alert('Error')
          }
      });
  });
});