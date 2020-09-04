(() => {
  const $circle = $('.js-circle');

  $('.js-circle-link').on({
    mouseenter() {
      const hoverData = $(this).closest('.js-circle-item').attr('data-hover');
      $circle.addClass(`s-sync__circle-item--${hoverData}-hover`);
    },
    mouseleave() {
      const hoverData = $(this).closest('.js-circle-item').attr('data-hover');
      $circle.removeClass(`s-sync__circle-item--${hoverData}-hover`);
    },
  });

  $('.js-circle path').on({
    mouseenter() {
      const hoverData = $(this).attr('data-hover');
      $circle.addClass(`s-sync__circle-item--${hoverData}-hover`);
    },
    mouseleave() {
      const hoverData = $(this).attr('data-hover');
      $circle.removeClass(`s-sync__circle-item--${hoverData}-hover`);
    },
  });
  $('.js-circle path').on({
    click() {
      const hoverData = $(this).attr('data-hover');
      $(`[data-hover="${hoverData}"] a`)[0].click();
    },
  });
})();
