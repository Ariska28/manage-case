(() => {
  const $body = $('body');
  const ua = window.navigator.userAgent;
  const isIe = /MSIE|Trident|Edge/.test(ua);

  if (isIe) {
    $body.addClass('ie-browser');
  }
})();
