// general js for the project that wouldn't be a reuseable component

$(document).ready(function(){
  setTimeout(function() {
    var node = $('.soundwave__node');
    $(node).each(function(){
      var height = Math.floor(Math.random() * (85 - 20 + 1)) + 20;
      console.log(height);
      $(this).css('height',height+'%');
    });
  }, 500);
});




///////////////////////////////////////
//    Cursor tracking icon
///////////////////////////////////////

// $(document).bind('mousemove', function(e){
//   var height = $('#cursor.active').height();
//   $('#cursor.active').css({
//      left:  e.pageX+15,
//      top:   e.pageY
//   });
// });
//
// $('.soundwave__node').hover(
//   function() {
//     var type = $(this).data('cursor-content');
//     $('#cursor').addClass('active');
//     $('#cursor').html(type);
//   }, function() {
//     $('#cursor').removeClass().empty();
//   }
// );