(() => {
  $('.js-iam-dropdown').on('click', '.js-dropdown-link', (e) => {
    e.preventDefault();
    const $buttonForm = $('.js-iam-form');
    const $visibleValue = $('.js-iam-value');

    const menu = $(e.target).closest('.js-dropdown-menu')[0];
    const value = $(e.target).attr('data-value');
    const innerHTML = $(e.target).html();

    $buttonForm.attr('action', value);
    $visibleValue.html(innerHTML);

    if (menu) {
      closeDropdown(menu);
    }

    return false;
  });
})();
