
console.log("yo")
$(function() {
    
    var $data = $('')

    $.ajax({
        type: 'Get',
        url: 'http://localhost:3000/Pet/find-all',
        success: function(data){
            $.each(data, function(i, pet) {
                
            });
        }
    });
});