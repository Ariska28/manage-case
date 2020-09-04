// TODO
// replace toggle id with data-attribute smth like "data-dropdown-toggle"
// state: waiting for header's changes

function closeDropdown(menu) {
  const toggleId = $(menu).attr('data-dropdown');
  const $toggle = $(`#${toggleId}`);
  $toggle.removeClass('dropdown_open');
  $(menu).removeClass('open');
  $(menu).find('.js-big-menu').slideUp(200);
  return false;
}

function openDropdown(menu) {
  const $openedMenu = $('.js-dropdown-menu.open');
  if ($openedMenu[0] !== menu) {
    if ($openedMenu.length) closeDropdown($openedMenu[0]);

    const toggleId = $(menu).attr('data-dropdown');
    const $toggle = $(`#${toggleId}`);
    $toggle.addClass('dropdown_open');
    $(menu).addClass('open');
    $(menu).find('.js-big-menu').slideDown(200);
  }
  return false;
}

(() => {
  const isTouchDevise = 'ontouchstart' in document.documentElement;
  const dropdownCloseTimer = {
    timer: null,
    menu: null,
  };

  function closeDropdownDelay(menu, delay = 200) {
    dropdownCloseTimer.timer = setTimeout(closeDropdown, delay, menu);
    dropdownCloseTimer.menu = menu;
  }

  $('body').on('click', (e) => {
    const openedMenu = $('.js-dropdown-menu.open')[0];
    if (openedMenu) {
      const isOutsideMenu = !$(e.target).closest('.js-dropdown-menu').length;
      if (isOutsideMenu) closeDropdown(openedMenu);
    }
  });

  $('[data-toggle="dropdown"], .js-dropdown-toggle')
    .on('click mouseenter', (e) => {
      e.preventDefault();

      if (isTouchDevise && e.type === 'mouseenter') {
        return false;
      }
      const toggle = e.currentTarget;
      const toggleId = $(toggle).attr('id');
      const menu = $(`[data-dropdown="${toggleId}"]`)[0];

      const isActive = $(menu).is('.open');

      if (!isActive) {
        // closeDropdown(openedMenu);
        openDropdown(menu);
      } else {
        if (isTouchDevise) {
          closeDropdown(menu);
        }

        if (!isTouchDevise && dropdownCloseTimer.menu === menu) {
          clearTimeout(dropdownCloseTimer.timer);
        }
      }

      return false;
    })
    .on('mouseleave', (e) => {
      const toggle = e.currentTarget;
      const toggleId = $(toggle).attr('id');
      const menu = $(`[data-dropdown="${toggleId}"]`)[0];

      closeDropdownDelay(menu);
    });

  $('[data-dropdown]')
    .on('mouseenter', (e) => {
      const menu = e.currentTarget;

      if (dropdownCloseTimer.menu === menu) {
        clearTimeout(dropdownCloseTimer.timer);
      }
    })
    .on('mouseleave', (e) => {
      const menu = e.currentTarget;

      closeDropdownDelay(menu);
    });
})();
