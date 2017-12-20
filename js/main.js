var audio;

//hide the pause button
$('#pause').hide();

//initialize
initAudio($('#playlist li:first-child'));

//initializer
function initAudio(element) {
    var song = element.attr('song');
    var title = element.text();
    var cover = element.attr('cover');
    var artist = element.attr('artist');

    //create Audio object
    audio = new Audio('media/' + song);

    if (!audio.currentTime) {
        $('#duration').html('0.00');
    }

    $('#audio-player .title').text(title);
    $('#audio-player .artist').text(artist);

    //insert Cover
    $('img.cover').attr('src', 'img/covers/' + cover);

    $('#playlist li').removeClass('active');
    element.addClass('active');
}

//play button
$('#play').click(function () {
    audio.play();
    $('#play').hide();
    $('#pause').show();
    $('#duration').fadeIn(400);
    showDuration();
});

//pause button
$('#pause').click(function () {
    audio.pause();
    $('#pause').hide();
    $('#play').show();
});

//stop button
$('#stop').click(function () {
    audio.pause();
    audio.currentTime = 0;
    $('#pause').hide();
    $('#play').show();
    $('#duration').fadeOut(400);
});

//next button
$('#next').click(function () {
    audio.pause();
    var next = $('#playlist li.active').next();
    if (next.length == 0) {
        next = $('#playlist li:first-child');
    }
    initAudio(next);
    $('#pause').show();
    $('#play').hide();
    audio.play();
    showDuration();
});

//prev button
$('#prev').click(function () {
    audio.pause();
    var prev = $('#playlist li.active').prev();
    if (prev.length == 0) {
        prev = $('#playlist li:last-child');
    }
    initAudio(prev);
    $('#pause').show();
    $('#play').hide();
    audio.play();
    showDuration();
});

//Playlist Song Click
$('#playlist li').click(function () {
    audio.pause();
    initAudio($(this));
    $('#pause').show();
    $('#play').hide();
    $('#duration').fadeIn(400);
    showDuration();
    audio.play();
});

//seek on a progress bar (click)
$('#progressBar').click(function (e) { 
    var percent = e.offsetX / this.offsetWidth;
    audio.currentTime = percent * audio.duration;
    this.value = percent / 100; 
});

//Volume
$('#volume').change(function () {
    audio.volume = parseFloat(this.value / 10);
});

//Time duration
function showDuration() {
    $(audio).bind('timeupdate', function () {
        // Get hours and minutes
        var s = parseInt(audio.currentTime % 60);
        var m = parseInt((audio.currentTime) / 60) % 60;
              
        //Add 0 if less then 10
        if (s < 10) {
            s = '0' + s;
        }
        $('#duration').html(m + ':' + s);
        var progress = 0;
        if (audio.currentTime > 0) {
            progress = Math.floor((100 / audio.duration) * audio.currentTime)-0.5; //to be less then full width
        }
        $('#progress').css('width', progress + '%');
    });
    }

    function calculateTotalDuration(length) {
        var minutes = Math.floor(length / 60),
        seconds_int = length - minutes * 60,
        seconds_str = seconds_int.toString(),
        seconds = seconds_str.substr(0, 2),
        time = minutes + ':' + seconds;
}