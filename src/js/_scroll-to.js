(() => {
  $('.js-scroll-to').on('click', function() { // eslint-disable-line
    const destination = $($(this).data('scroll-to'));

    // TODO
    // replace .header with js-header
    // state waiting for finished changes in header
    if (destination.is(':visible')) {
      $('html, body').animate({
        scrollTop: destination.position().top - ($('.header').height() || 0),
      }, $(this).data('scroll-to-speed'));
      return false;
    }
  });
})();
