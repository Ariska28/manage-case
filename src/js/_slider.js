(() => {
  const options = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 5000,
    rows: 0
  };

  // support page sliders
  $('.js-slider').slick(options);
})();
