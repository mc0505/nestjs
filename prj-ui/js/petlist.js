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
                '<p class="card-body"> Age: '+ pet.age + '<br>' + pet.description + '</p>' +
                '<a type="button" class="btn btn-primary btn-lg rounded-pill" onClick="reply_click(this.id)" id="'+ pet.id +'">Adopt</a>' +
                '</div>')
            });
        },
    });
});


async function reply_click(clicked_id){
    const id = await clicked_id;
    const token = localStorage.getItem('token');
    var petId = {
        id
    }

    $.ajax({
        type: 'Patch',
        url: 'http://localhost:3000/User/adopt',
        data: petId,
        headers: {"Authorization": ' Bearer ' + token},
        success: function(){
            alert("Adopt successfully");
        }
    });
}







