

$(document).ready(function () {
    //move the slide faster, change after 2seconds
    $('#mycarousel').carousel({ interval: 1500 });

    $('#carouselbutton').click(function () {
        //if the carouselbutton is currently a pause button then now change it to play and vice versa
        if ($('#carouselbutton').children('span').hasClass('fa-pause')) {
            //mycarousel is currently cycling
            //user can pause
            $('#mycarousel').carousel('pause');
            $('#carouselbutton').children('span').removeClass('fa-pause');
            $('#carouselbutton').children('span').addClass('fa-play');
        } else {
            //mycarousel is currently paused
            //user can play
            $('#mycarousel').carousel('cycle');
            $('#carouselbutton').children('span').removeClass('fa-play');
            $('#carouselbutton').children('span').addClass('fa-pause');
        }
    });

    //show the reservationmodal when reservationbutton is clicked
    $('#reservationbutton').click(function () {
        $('#reservationmodal').modal('show');
    });

    //show the loginmodal when loginbutton is clicked
    $('#loginbutton').click(function () {
        $('#loginmodal').modal('show');
    });


});

