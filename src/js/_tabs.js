(() => {
  const model = {
    tabs: 'js-tabs',
    tab: 'js-tab',
    tabPanel: 'js-tab-panel',
    tabContent: 'js-tab-content',
  };

  const activePanelUpdate = () => {
    const $activeTab = $(`.${model.tab}.active`);
    if ($activeTab.length) {
      $activeTab.click();
    }
  };

  // rivals-comparison
  $(`.${model.tabs}`).on('click', `.${model.tab}`, function (e) { // eslint-disable-line
    const $wrapper = $(this).closest(`.${model.tabs}`);
    const index = $(`.${model.tab}`).index(this);

    $(`.${model.tab}.active`).removeClass('active');
    $(this).addClass('active');

    const $tabPanel = $wrapper.find(`.${model.tabPanel}`);
    const nextActiveContent = $wrapper.find(`.${model.tabContent}`).eq(index);
    const minHeight = nextActiveContent.outerHeight();

    $tabPanel.animate({ minHeight }, 150);
    $wrapper.find(`.${model.tabContent}.active`).removeClass('active');
    nextActiveContent.addClass('active');
  });

  activePanelUpdate();

  $(window).on('resize', throttle(activePanelUpdate, 500));
})();
