(() => {
  const body = $('body')[0];
  const fwHeader = document.querySelector('.js-header');
  const mainMenuBox = document.querySelector('.js-menu');
  const menuToggle = document.querySelector('.js-menu-toggle');

  if (menuToggle) {
    menuToggle.addEventListener('click', menuToggleFunc);
  }

  function menuToggleFunc(e) {
    e.preventDefault();
    if (mainMenuBox.classList.contains('open')) {
      $(body).removeClass('menu-open');
      fwHeader.classList.remove('menu-open');
      mainMenuBox.classList.remove('open');
      menuToggle.classList.remove('open');
    } else {
      $(body).addClass('menu-open');
      fwHeader.classList.add('menu-open');
      mainMenuBox.classList.add('open');
      menuToggle.classList.add('open');
    }
  }
})();
