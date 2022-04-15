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
                '<a type="button" class="btn btn-primary btn-lg rounded-pill" onClick="reply_click(this.id)" id="'+ pet.id +'">Adopt</a>' +
                '</div>')
            });
        },
    });
});


function reply_click(clicked_id){
    const id = clicked_id;
    const token = localStorage.getItem('token');
    let contactStatus = false;

    $.ajax({
        type:'Get',
        url: 'http://localhost:3000/User/check-user-profile',
        headers: {"Authorization": ' Bearer ' + token},
        success: function(){
            console.log('yo');
            contactStatus = true;
        },
        error: function(){
            alert("Please update your contact first!");
        }
    })
    console.log(contactStatus);
    if(contactStatus == false){
        $.ajax({
            type: 'Patch',
            url: 'http://localhost:3000/User/adopt',
            data: id,
            headers: {"Authorization": ' Bearer ' + token},
            success: function(){
                console.log(id);
                alert("Adopt successfully");
            }
        });
    }
}







