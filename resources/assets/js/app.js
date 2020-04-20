$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

// Get the modals
let deletemodal = document.getElementById("deleteModal");
let addmodal = document.getElementById("addModal");

// When the user clicks on the delete icon, open the modal and set user ID for delete post
let deleteID;
$('.deleteBtn').click(function() {
    deleteID = this.id;
    deletemodal.style.display = "block";
});

// When the user clicks on cancel or the close button, close the modal
$('.close').click(function() {
    $('.success').empty();
    $('.errors').html('<ul></ul>');
    $('.confirmBtn').show();
    $('.saveBtn').show();
    $('#addUserForm').show();
    deletemodal.style.display = "none";
    addmodal.style.display = "none";
    window.location.reload(true);
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == addmodal || event.target == deletemodal) {
        $('.success').empty();
        $('.errors').html('<ul></ul>');
        $('.confirmBtn').show();
        $('.saveBtn').show();
        $('#addUserForm').show();
        deletemodal.style.display = "none";
        addmodal.style.display = "none";
    }
}

// When the user click delete confirm, do the ajax post and handle JSON response
$('.confirmBtn').click(function() {
    $('.confirmBtn').hide();
    $('.loader').show();
    $.ajax({
        type: "POST",
        dataType: 'json',
        url: "/destroy",
        data: {
            "id": deleteID
        },
        success:function(data){
            $('.loader').hide();
            $('.success').html(data.message);
        }
    })
});

// When the user clicks the New User button, open the modal
$('.addBtn').click(function() {
    addmodal.style.display = "block";
});

// When the user clicks save to Add User, do the ajax post and handle JSON response
$( "#addUserForm" ).submit(function( event ) {
    event.preventDefault();
    $('.errors').html('<ul></ul>');
    $('.saveBtn').hide();
    $('.loader').show();
    var data = $(this).serialize();
    $.ajax({
        type: "POST",
        dataType: 'json',
        url: "/store",
        data: data,
        success:function(data){
            if(data.success == 'true'){
                $('.loader').hide();
                $('#addUserForm').hide();
                $('.success').html(data.message);
            }else{
                $('.saveBtn').show();
                $('.loader').hide();
                $.each( data.errors, function( key, value ) {
                    $(".errors").find("ul").append('<li>'+key+': '+value+'</li>');
                });
            }
        }
    })
});

