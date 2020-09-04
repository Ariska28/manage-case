(() => {
  const $contactForm = $('.js-contact-block-form');

  $contactForm.on('click', '.js-show-form-box', (e) => {
    e.preventDefault();
    // const currHeight = $('.contact-form').height();
    // $('.contact-form').height(0).animate({ height: currHeight });
    $contactForm.addClass('form-active');
  });

  if ($contactForm.length) {
    $('.wpcf7-form').addClass('contact-form');

    $('.wpcf7').on('wpcf7mailsent', () => {
      $contactForm.removeClass('form-active').addClass('form-sent');
      $('.msg-status-box').addClass('msg-status-box_success');
    });
  }
})();
