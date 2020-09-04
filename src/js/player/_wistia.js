(() => {
  const $body = $('body');

  function getWistiaVideoId($wrapper) {
    const classNamePart = 'wistia_async_';
    const classList = $wrapper[0].className.split(/\s+/);
    let id = '';

    if ($wrapper.attr('id') !== '') {
      id = $wrapper.attr('id');
      return id;
    }

    for (let i = 0; i < classList.length; i += 1) {
      if (classList[i].indexOf(classNamePart) !== -1) {
        id = String.slice(classNamePart.length);
        break;
      }
    }
    return id;
  }

  $('.js-base-media').on('click', '[data-video-thumbnail]', () => showPopupVideoBox());

  $('.js-video-box__overlay, .js-video-box__btn-close').on('click', () => closePopupVideoBox());

  $('.js-wistia').on('click', () => showPopupVideoBox());

  function showPopupVideoBox() {
    const $videoBox = $('.js-video-box');
    const $videoWrapper = $videoBox.find('.wistia_embed');
    const videoId = getWistiaVideoId($videoWrapper);

    if (!$videoBox.length) return;

    $videoBox.addClass('el-videoBox_opened');
    $body.addClass('modal-video-open');

    if (typeof Wistia !== 'undefined') {
      Wistia.api(videoId).play();
    }

    // ios control
    const windowCurrScroll = $(window).scrollTop();
    $body.attr('data-win-y', windowCurrScroll);
    $('html').addClass('modal-video-open').css('top', -windowCurrScroll);
  }

  function closePopupVideoBox() {
    const $videoBox = $('.js-video-box');
    const $videoWrapper = $videoBox.find('.wistia_embed');
    const videoId = getWistiaVideoId($videoWrapper);

    if (typeof Wistia !== 'undefined') {
      Wistia.api(videoId).pause();
      Wistia.api(videoId).time(0);
    }

    $videoBox.removeClass('el-videoBox_opened');
    $body.removeClass('modal-video-open');

    // ios control
    $('html').removeClass('modal-video-open').css('top', '');
    const windowCurrScroll = $body.attr('data-win-y') || 0;
    $(window).scrollTop(windowCurrScroll);
  }
})();
