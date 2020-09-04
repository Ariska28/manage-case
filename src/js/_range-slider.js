(() => {
  const model = {
    unitsCountForm: 'js-units-count-input-box',
    unitsCount: 'js-units-count',
    plan: 'js-av-plan',
    planValueAttr: 'plan-value',
    currencyAttr: 'currency',
    planUnitsNumAttr: 'plan-units-num',
    unitsCountSlider: 'js-units-count-slider',
  };

  const $unitsCountForm = $(`.${model.unitsCountForm}`);
  const unitsCount = $(`.${model.unitsCount}`)[0];
  // const $freePlan = $(`.${model.plan}`).eq(0);
  const $proPlan = $(`.${model.plan}`).eq(0);

  const updatePlanPrice = (price) => {
    const format = count => count.toFixed(0);
    let newPrice = '0';

    if (price > 50) {
      newPrice = format(price);
    } else if (price > 20) {
      newPrice = format(50);
    } else if (price > 10) {
      newPrice = format(20);
    } else if (price > 3) {
      newPrice = format(10);
    }
    const $proPlanValue = $proPlan.find(`[data-${model.planValueAttr}]`);
    const currencySymbol = $proPlanValue.data(model.currencyAttr);
    $proPlanValue.html(currencySymbol + newPrice);
    $proPlan.find(`[data-${model.planUnitsNumAttr}]`).html(parseInt(newPrice, 10));
  };

  const updatePlanActivity = (price) => {
    const activeClass = 'c-planCard--active';
    if (price > 3) {
      // $freePlan.removeClass(activeClass);
      $proPlan.addClass(activeClass);
    } else {
      $proPlan.removeClass(activeClass);
      // $freePlan.addClass(activeClass);
    }
  };

  $(unitsCount).keypress((e) => {
    const getChar = (ev) => {
      if (ev.which == null) {
        if (ev.keyCode < 32) return null;
        return String.fromCharCode(ev.keyCode);
      }

      if (ev.which != 0 && ev.charCode != 0) {
        if (ev.which < 32) return null;
        return String.fromCharCode(ev.which);
      }

      return null;
    };

    const char = getChar(e);
    if (char !== null) {
      if (!/^[0-9]$/.test(char)) return false;
    }

    const self = e.currentTarget;
    setTimeout(() => {
      $(self).change();
    }, 0);

    return true;
  });

  $(`.${model.unitsCountSlider}`).ionRangeSlider({
    grid: true,
    grid_num: $(window).innerWidth() < 768 ? 5 : 10,
    // step: 100,
    // grid_snap: true,
    grid_margin: false,
    min: 0,
    max: 5000,
    // from: 75,
    from_min: 1,
    hide_min_max: true,
    force_edges: true,
    onStart(data) {
      if (unitsCount) {
        unitsCount.value = data.from;
        updatePlanPrice(data.from);
        // updatePlanActivity(data.from);
      }
    },
    onChange(data) {
      if (unitsCount) {
        unitsCount.value = data.from;
      }
      updatePlanPrice(data.from);
      // updatePlanActivity(data.from);
    },
    onUpdate(data) {
      // console.log(data);
      if (unitsCount) {
        unitsCount.value = data.from;
      }
      updatePlanPrice(data.from);
      // updatePlanActivity(data.from);
    },
  });

  const unitsCountSlider = $(`.${model.unitsCountSlider}`).data('ionRangeSlider');

  $(window).resize(() => {
    if (!unitsCountSlider) return;

    const currGridNum = unitsCountSlider.options.grid_num;
    const winWidth = $(window).innerWidth();

    if (winWidth < 768 && currGridNum !== 5) {
      unitsCountSlider.update({
        grid_num: 5,
      });
    }
    if (winWidth >= 768 && currGridNum !== 10) {
      unitsCountSlider.update({
        grid_num: 10,
      });
    }
  });

  $(unitsCount).on('change input propertychange', (e) => {
    const val = e.target.value !== '' ? parseInt(e.target.value, 10) : 0;
    const currVal = unitsCountSlider.options.from;
    const min = unitsCountSlider.options.from_min;
    const { max } = unitsCountSlider.options;

    // if (val !== 0 && !val) return;
    if (isNaN(val)) {
      unitsCountSlider.update({
        from: currVal,
      });
    }

    if (val === currVal) {
      unitsCountSlider.update({
        from: val,
      });

      return false;
    }

    if (val >= min && val <= max) {
      unitsCountSlider.update({
        from: val,
      });

    } else if (val > max) {
      unitsCountSlider.update({
        from: max,
      });
      e.target.value = max;
    }
  });

  $unitsCountForm.on('submit', (e) => {
    e.preventDefault();

    const inpVal = +$(unitsCount).val();
    const rangeSliderVal = unitsCountSlider.options.from;

    if (!isNaN(inpVal) && inpVal !== rangeSliderVal) {
      unitsCountSlider.update({
        from: inpVal,
      });
    }
  });

  $('.irs-line').on('focusin', function () {
    var $irs = $('.irs-slider');
    $irs.addClass('irs-focused');
  });

  $('.irs-line').on('focusout', function () {
    var $irs = $('.irs-slider');
    $irs.removeClass('irs-focused');
  });
})();