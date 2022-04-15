$(function() {
    
    var $pets = $('.row')

    $.ajax({
        type: 'Get',
        url: 'http://localhost:3000/Pet/find-all',
        success: function(data){
            $.each(data, function(i, pet) {
                $pets.append('<div class="card-body col-lg-4">'+
                '<img src='+pet.img_src+' class="p-5" alt="animal" style="width: 250px; height: 250px; object-fit: cover;">'+
                '<h5 class="card-title">' + pet.name + '</h5>' +
                "<p class='card-body'> Pet's id: " + pet.id + '<br>Age: '+ pet.age + '<br>' + pet.description + '</p>' +
                '<a type="button" class="btn btn-primary btn-lg rounded-pill" href="adopt.html">Adopt</a>' +
                '</div>')
            });
        },
    });
});

// $(function(){
//     $('a').on('click', function(){
//         console.log('alo');
//         let petIdModal = $(this).attr('rel');
        
//         alert(petIdModal);
//     });
// });



