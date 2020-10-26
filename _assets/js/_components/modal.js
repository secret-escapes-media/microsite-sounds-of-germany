var modal          = $('.js-modal'),
    modalLaunchBtn = $('.js-open-modal'),
    modalCloseBtn  = $('.js-close-modal');

// init wirewax when player is present
if ($('#se-wirewax').length != 0) {
  window.wirewax.playerId = "se-wirewax";
}

function modalSplashFade(){
  $('.js-modal-splashscreen').fadeOut();
  window.wirewax.triggerEvent(window.wirewax.events.triggers.PLAY);
  window.wirewax.triggerEvent(window.wirewax.events.triggers.UNMUTE_VOLUME);
};
$('.js-modal-splashscreen').click(function(){
  modalSplashFade();
});

// opens modal
function modalOpen(event, modalId){

  // is there a click event?
  if (event) {
    event.preventDefault();
    // find the modal id from clicked element
    var activeModalId = $(event.currentTarget).data('open-modal');
  } else {
    // find the modal id from passed string
    var activeModalId = modalId;
  }

  // find the active modal dom element
  var activeModal = $('*[data-modal-id="' + activeModalId + '"]');

  // disable scrolling on background content (doesn't work iOS)
  $('body').addClass('disable-scroll');

  // builds youtube video if needed
  if (activeModal.data('youtube-id')) {
    // get youtube id and target div
    var video     = activeModal.find('.js-modal-video'),
        youtubeId = activeModal.data('youtube-id');
    // insert the code into the target with the id and autoplay
    video.html('<div class="video__wrap"><iframe class="video" src="https://www.youtube.com/embed/' + youtubeId + '?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div>');
  }

  // reveal the specific modal content
  activeModal.removeClass('is-closed').addClass('is-open');

  // open modal
  modal.fadeIn('250', function(){
    $(this).removeClass('is-closed').addClass('is-open');
    setTimeout(function(){
      modalSplashFade();
    },3000);
    // shows end screen on video end
    window.wirewax.addEventListener(window.wirewax.events.listeners.VIDEO_END, function(){
      $('.js-video-endscreen').fadeIn();
    });
  });

}

// closes modal
function modalClose(event){
  event.preventDefault();
  // enable scrolling
  $('body').removeClass('disable-scroll');
  // close modal with fade
  $('.modal__bg.is-open').fadeOut('250', function(){
    // close modal and active modal content
    $(this).removeClass('is-open').addClass('is-closed');
    $('.modal.is-open').removeClass('is-open').addClass('is-closed');
    // kill everything inside of video if its there
    $('.js-modal-video').empty();
    // wirewax
    window.wirewax.triggerEvent(window.wirewax.events.triggers.PAUSE);
  });
}


// launches modal when offer is clicked
modalLaunchBtn.on('click', function(event) {
  modalOpen(event);
});

// launches modal from url queryString
var modalQueryString = 'open-modal';
if (getQueryStringByName(modalQueryString)) {
  // find modal id & dom element
  var modalId = getQueryStringByName(modalQueryString);
  var modalElement = $('*[data-modal-id="' + modalId + '"]');
  // is there is a modal to open?
  if ( $(modalElement).length > 0 ) {
    // open without passing event
    modalOpen(null, modalId);
  }
}

// closes modal on close icon click
modalCloseBtn.on('click', function(event) {
  modalClose(event);
});

// closes modal on background click
modal.on('click', function(event) {
  if ($(event.target).hasClass('modal__wrap')){
    modalClose(event);
  }
});

// closes modal on escape key press
$(document).keyup(function(event) {
   if (event.keyCode == 27) {
     modalClose(event);
    }
});