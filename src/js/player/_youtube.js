(() => {
  // unsupported version
  // need to update to current css/html state for using
  const $body = $('body');

  $('#how-it-works-video-box').on('click', '.yt-video-box__overlay', (e) => {
    const videoBox = $('.yt-video-box');

    if (typeof player_hiw !== 'undefined' && player_hiw.pauseVideo) player_hiw.pauseVideo();
    videoBox.removeClass('yt-video-box_opened');
    $body.removeClass('modal-video-open');

    // ios control
    $('html').removeClass('modal-video-open').css('top', '');
    const windowCurrScroll = $body.attr('data-win-y') || 0;
    $(window).scrollTop(windowCurrScroll);
  });
  $('#how-it-works-video-box').on('click', '.yt-video-thumbnail', (e) => {
    // case when video behind thumbnail
    // $(e.currentTarget).find('.yt-video-thumbnail').animate({ opacity: 0 }, function() {
    //   $(this).addClass('yt-video-thumbnail_hide');
    // });

    const videoBox = $('.yt-video-box');

    if (!videoBox.length) return;
    videoBox.addClass('yt-video-box_opened');
    $body.addClass('modal-video-open');
    if (typeof player_hiw !== 'undefined' && player_hiw.playVideo) player_hiw.playVideo();

    // ios control
    const windowCurrScroll = $(window).scrollTop();
    $body.attr('data-win-y', windowCurrScroll);
    $('html').addClass('modal-video-open').css('top', -windowCurrScroll);
  });
})();
