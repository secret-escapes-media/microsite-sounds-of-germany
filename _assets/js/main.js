// general js for the project that wouldn't be a reuseable component

$(document).ready(function(){
  setTimeout(function() {
    var node = $('.soundwave__node');
    $(node).each(function(){
      var height = Math.floor(Math.random() * (85 - 20 + 1)) + 20;
      $(this).css('height',height+'%');
    });
  }, 500);
});


$('.js-toggle-bg-video').click(function(){
  $('#banner-video').trigger('pause');
});
$('.page--overview .js-close-modal').click(function(){
  $('#banner-video').trigger('play');
});
