(() => {
  /**
  * max tablet width. Depends on css media
  * @var integer
  */
  const tabletUpLim = 960;
  const model = {
    signupFormLink: 'js-trial-features-signup-form-link',
    signupFormWrapper: 'js-trial-features-form-wrapper',
    signupFormBox: 'js-trial-features-signup-form-box',
  };

  // hide fixed banner button while form is inview
  const $signupFormLink = $(`.${model.signupFormLink}`);
  if ($signupFormLink.length) {
    const signupFormInview = new Waypoint.Inview({
      element: $(`.${model.signupFormWrapper}`)[0],
      enter(dir) {
        if (dir === 'down') {
          $signupFormLink.fadeOut();
        }
      },
      exited(dir) {
        if (dir === 'up') {
          $signupFormLink.fadeIn();
        }
      },
    });
  }

  /**
  * Hnadle signup form inview behavior.
  * Presents on free trial pages.
  */
  if ($(`.${model.signupFormWrapper}`).length && $(`.${model.signupFormBox}`).length) {
    $(window).resize(() => {
      const $signupFormBox = $(`.${model.signupFormBox}`);
      const formOffsetTop = $signupFormBox.offset().top;
      if ($(window).innerWidth() > tabletUpLim) { // desktop width
        $signupFormBox.css('marginBottom', 20);
        $signupFormBox.stick_in_parent({
          offset_top: formOffsetTop,
        });
      } else { // mobile & tablet width
        $signupFormBox.trigger('sticky_kit:detach');
      }
    });
    $(window).resize();
  }
})();
