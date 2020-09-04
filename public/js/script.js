'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

document.addEventListener('DOMContentLoaded', function () {
  // concat "modules" injection
  function throttle(func, ms) {
    var isThrottled = false,
        savedArgs = void 0,
        savedThis = void 0;

    function wrapper() {
      if (isThrottled) {
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      func.apply(this, arguments);
      isThrottled = true;
      setTimeout(function () {
        isThrottled = false;
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }

    return wrapper;
  }
  (function () {
    var body = $('body')[0];
    var fwHeader = document.querySelector('.js-header');
    var mainMenuBox = document.querySelector('.js-menu');
    var menuToggle = document.querySelector('.js-menu-toggle');

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
  // TODO
  // replace toggle id with data-attribute smth like "data-dropdown-toggle"
  // state: waiting for header's changes

  function closeDropdown(menu) {
    var toggleId = $(menu).attr('data-dropdown');
    var $toggle = $('#' + toggleId);
    $toggle.removeClass('dropdown_open');
    $(menu).removeClass('open');
    $(menu).find('.js-big-menu').slideUp(200);
    return false;
  }

  function openDropdown(menu) {
    var $openedMenu = $('.js-dropdown-menu.open');
    if ($openedMenu[0] !== menu) {
      if ($openedMenu.length) closeDropdown($openedMenu[0]);

      var toggleId = $(menu).attr('data-dropdown');
      var $toggle = $('#' + toggleId);
      $toggle.addClass('dropdown_open');
      $(menu).addClass('open');
      $(menu).find('.js-big-menu').slideDown(200);
    }
    return false;
  }

  (function () {
    var isTouchDevise = 'ontouchstart' in document.documentElement;
    var dropdownCloseTimer = {
      timer: null,
      menu: null
    };

    function closeDropdownDelay(menu) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

      dropdownCloseTimer.timer = setTimeout(closeDropdown, delay, menu);
      dropdownCloseTimer.menu = menu;
    }

    $('body').on('click', function (e) {
      var openedMenu = $('.js-dropdown-menu.open')[0];
      if (openedMenu) {
        var isOutsideMenu = !$(e.target).closest('.js-dropdown-menu').length;
        if (isOutsideMenu) closeDropdown(openedMenu);
      }
    });

    $('[data-toggle="dropdown"], .js-dropdown-toggle').on('click mouseenter', function (e) {
      e.preventDefault();

      if (isTouchDevise && e.type === 'mouseenter') {
        return false;
      }
      var toggle = e.currentTarget;
      var toggleId = $(toggle).attr('id');
      var menu = $('[data-dropdown="' + toggleId + '"]')[0];

      var isActive = $(menu).is('.open');

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
    }).on('mouseleave', function (e) {
      var toggle = e.currentTarget;
      var toggleId = $(toggle).attr('id');
      var menu = $('[data-dropdown="' + toggleId + '"]')[0];

      closeDropdownDelay(menu);
    });

    $('[data-dropdown]').on('mouseenter', function (e) {
      var menu = e.currentTarget;

      if (dropdownCloseTimer.menu === menu) {
        clearTimeout(dropdownCloseTimer.timer);
      }
    }).on('mouseleave', function (e) {
      var menu = e.currentTarget;

      closeDropdownDelay(menu);
    });
  })();
  (function () {
    $('.js-iam-dropdown').on('click', '.js-dropdown-link', function (e) {
      e.preventDefault();
      var $buttonForm = $('.js-iam-form');
      var $visibleValue = $('.js-iam-value');

      var menu = $(e.target).closest('.js-dropdown-menu')[0];
      var value = $(e.target).attr('data-value');
      var innerHTML = $(e.target).html();

      $buttonForm.attr('action', value);
      $visibleValue.html(innerHTML);

      if (menu) {
        closeDropdown(menu);
      }

      return false;
    });
  })();
  (function () {
    var $body = $('body');
    var ua = window.navigator.userAgent;
    var isIe = /MSIE|Trident|Edge/.test(ua);

    if (isIe) {
      $body.addClass('ie-browser');
    }
  })();
  (function () {
    var $body = $('body');

    function getWistiaVideoId($wrapper) {
      var classNamePart = 'wistia_async_';
      var classList = $wrapper[0].className.split(/\s+/);
      var id = '';

      if ($wrapper.attr('id') !== '') {
        id = $wrapper.attr('id');
        return id;
      }

      for (var i = 0; i < classList.length; i += 1) {
        if (classList[i].indexOf(classNamePart) !== -1) {
          id = String.slice(classNamePart.length);
          break;
        }
      }
      return id;
    }

    $('.js-base-media').on('click', '[data-video-thumbnail]', function () {
      return showPopupVideoBox();
    });

    $('.js-video-box__overlay, .js-video-box__btn-close').on('click', function () {
      return closePopupVideoBox();
    });

    $('.js-wistia').on('click', function () {
      return showPopupVideoBox();
    });

    function showPopupVideoBox() {
      var $videoBox = $('.js-video-box');
      var $videoWrapper = $videoBox.find('.wistia_embed');
      var videoId = getWistiaVideoId($videoWrapper);

      if (!$videoBox.length) return;

      $videoBox.addClass('el-videoBox_opened');
      $body.addClass('modal-video-open');

      if (typeof Wistia !== 'undefined') {
        Wistia.api(videoId).play();
      }

      // ios control
      var windowCurrScroll = $(window).scrollTop();
      $body.attr('data-win-y', windowCurrScroll);
      $('html').addClass('modal-video-open').css('top', -windowCurrScroll);
    }

    function closePopupVideoBox() {
      var $videoBox = $('.js-video-box');
      var $videoWrapper = $videoBox.find('.wistia_embed');
      var videoId = getWistiaVideoId($videoWrapper);

      if (typeof Wistia !== 'undefined') {
        Wistia.api(videoId).pause();
        Wistia.api(videoId).time(0);
      }

      $videoBox.removeClass('el-videoBox_opened');
      $body.removeClass('modal-video-open');

      // ios control
      $('html').removeClass('modal-video-open').css('top', '');
      var windowCurrScroll = $body.attr('data-win-y') || 0;
      $(window).scrollTop(windowCurrScroll);
    }
  })();
  (function () {
    var $circle = $('.js-circle');

    $('.js-circle-link').on({
      mouseenter: function mouseenter() {
        var hoverData = $(this).closest('.js-circle-item').attr('data-hover');
        $circle.addClass('s-sync__circle-item--' + hoverData + '-hover');
      },
      mouseleave: function mouseleave() {
        var hoverData = $(this).closest('.js-circle-item').attr('data-hover');
        $circle.removeClass('s-sync__circle-item--' + hoverData + '-hover');
      }
    });

    $('.js-circle path').on({
      mouseenter: function mouseenter() {
        var hoverData = $(this).attr('data-hover');
        $circle.addClass('s-sync__circle-item--' + hoverData + '-hover');
      },
      mouseleave: function mouseleave() {
        var hoverData = $(this).attr('data-hover');
        $circle.removeClass('s-sync__circle-item--' + hoverData + '-hover');
      }
    });
    $('.js-circle path').on({
      click: function click() {
        var hoverData = $(this).attr('data-hover');
        $('[data-hover="' + hoverData + '"] a')[0].click();
      }
    });
  })();
  (function () {
    // contact form select
    $('#cPosition').select2({
      placeholder: 'Choose',
      // allowClear: true
      minimumResultsForSearch: Infinity,
      width: 'resolve'
    });

    $('#cPhoneCode').select2({
      minimumResultsForSearch: Infinity,
      width: 'resolve'
    });

    // select2 global
    $('.js-select2').select2({
      minimumResultsForSearch: Infinity,
      width: 'resolve'
    });
  })();
  (function () {
    var $contactForm = $('.js-contact-block-form');

    $contactForm.on('click', '.js-show-form-box', function (e) {
      e.preventDefault();
      // const currHeight = $('.contact-form').height();
      // $('.contact-form').height(0).animate({ height: currHeight });
      $contactForm.addClass('form-active');
    });

    if ($contactForm.length) {
      $('.wpcf7-form').addClass('contact-form');

      $('.wpcf7').on('wpcf7mailsent', function () {
        $contactForm.removeClass('form-active').addClass('form-sent');
        $('.msg-status-box').addClass('msg-status-box_success');
      });
    }
  })();
  (function () {
    var $agreementForm = $('.js-request-a-demo-form');

    if ($agreementForm.length) {
      var $checkboxHidden = $agreementForm.find('.js-agreement');
      $checkboxHidden.hide();

      $agreementForm.find('.js-agreement-visible').on('change', function () {
        if ($agreementForm.find('.js-agreement-visible').is(':checked')) {
          $checkboxHidden.find('input').prop('checked', true);
        } else {
          $checkboxHidden.find('input').prop('checked', false);
        }
      });
    }
  })();
  (function () {
    // stick feature page sidemenu and testimonials
    var $featuresSidebar = $('[data-features-sidebar-inner]');
    if ($featuresSidebar[0]) {
      $featuresSidebar.stick_in_parent({
        offset_top: 76
      });
    }

    // inview sections for testimonials
    var $testimonialsBox = $('[data-features-testimonials-box]');
    var $middleSectionControl = $('[data-testimonial="f-testimonial2"]');

    var inviewMiddleSection = void 0;
    var endTestimonialsControl = void 0;

    if ($middleSectionControl[0]) {
      inviewMiddleSection = new Waypoint.Inview({
        element: $middleSectionControl[0],
        enter: function enter(dir) {
          if (dir === 'down' && $testimonialsBox[0]) {
            $testimonialsBox.removeClass('testimonial1_show');
            $testimonialsBox.addClass('testimonial2_show');
          }
        },
        entered: function entered(dir) {
          if (dir === 'down' && $testimonialsBox[0]) {
            $testimonialsBox.removeClass('testimonial2_show');
            $testimonialsBox.addClass('testimonial3_show');
          }
        },
        exit: function exit(dir) {
          if (dir === 'up' && $testimonialsBox[0]) {
            $testimonialsBox.removeClass('testimonial3_show');
            $testimonialsBox.addClass('testimonial2_show');
          }
        },
        exited: function exited(dir) {
          if (dir === 'up' && $testimonialsBox[0]) {
            $testimonialsBox.removeClass('testimonial2_show');
            $testimonialsBox.addClass('testimonial1_show');
          }
        }
      });
    }

    /* redundant code due to featuresSidebar sticks in parent
    const $featuresContent = $('[data-features-content]');
    if ($featuresContent[0]) {
      endTestimonialsControl = new Waypoint({
        element: $featuresContent[0],
        handler(dir) {
          if (dir === 'down' && $testimonialsBox[0]) {
            $testimonialsBox.addClass('features-testimonials-box_hide');
          }
          if (dir === 'up' && $testimonialsBox[0]) {
            $testimonialsBox.removeClass('features-testimonials-box_hide');
          }
        },
        offset() {
          return -this.element.clientHeight + document.body.clientHeight * 0.8;
        },
      });
    }
    */
  })();
  (function () {
    var options = {
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
  (function () {
    var model = {
      unitsCountForm: 'js-units-count-input-box',
      unitsCount: 'js-units-count',
      plan: 'js-av-plan',
      planValueAttr: 'plan-value',
      currencyAttr: 'currency',
      planUnitsNumAttr: 'plan-units-num',
      unitsCountSlider: 'js-units-count-slider'
    };

    var $unitsCountForm = $('.' + model.unitsCountForm);
    var unitsCount = $('.' + model.unitsCount)[0];
    // const $freePlan = $(`.${model.plan}`).eq(0);
    var $proPlan = $('.' + model.plan).eq(0);

    var updatePlanPrice = function updatePlanPrice(price) {
      var format = function format(count) {
        return count.toFixed(0);
      };
      var newPrice = '0';

      if (price > 50) {
        newPrice = format(price);
      } else if (price > 20) {
        newPrice = format(50);
      } else if (price > 10) {
        newPrice = format(20);
      } else if (price > 3) {
        newPrice = format(10);
      }
      var $proPlanValue = $proPlan.find('[data-' + model.planValueAttr + ']');
      var currencySymbol = $proPlanValue.data(model.currencyAttr);
      $proPlanValue.html(currencySymbol + newPrice);
      $proPlan.find('[data-' + model.planUnitsNumAttr + ']').html(parseInt(newPrice, 10));
    };

    var updatePlanActivity = function updatePlanActivity(price) {
      var activeClass = 'c-planCard--active';
      if (price > 3) {
        // $freePlan.removeClass(activeClass);
        $proPlan.addClass(activeClass);
      } else {
        $proPlan.removeClass(activeClass);
        // $freePlan.addClass(activeClass);
      }
    };

    $(unitsCount).keypress(function (e) {
      var getChar = function getChar(ev) {
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

      var char = getChar(e);
      if (char !== null) {
        if (!/^[0-9]$/.test(char)) return false;
      }

      var self = e.currentTarget;
      setTimeout(function () {
        $(self).change();
      }, 0);

      return true;
    });

    $('.' + model.unitsCountSlider).ionRangeSlider({
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
      onStart: function onStart(data) {
        if (unitsCount) {
          unitsCount.value = data.from;
          updatePlanPrice(data.from);
          // updatePlanActivity(data.from);
        }
      },
      onChange: function onChange(data) {
        if (unitsCount) {
          unitsCount.value = data.from;
        }
        updatePlanPrice(data.from);
        // updatePlanActivity(data.from);
      },
      onUpdate: function onUpdate(data) {
        // console.log(data);
        if (unitsCount) {
          unitsCount.value = data.from;
        }
        updatePlanPrice(data.from);
        // updatePlanActivity(data.from);
      }
    });

    var unitsCountSlider = $('.' + model.unitsCountSlider).data('ionRangeSlider');

    $(window).resize(function () {
      if (!unitsCountSlider) return;

      var currGridNum = unitsCountSlider.options.grid_num;
      var winWidth = $(window).innerWidth();

      if (winWidth < 768 && currGridNum !== 5) {
        unitsCountSlider.update({
          grid_num: 5
        });
      }
      if (winWidth >= 768 && currGridNum !== 10) {
        unitsCountSlider.update({
          grid_num: 10
        });
      }
    });

    $(unitsCount).on('change input propertychange', function (e) {
      var val = e.target.value !== '' ? parseInt(e.target.value, 10) : 0;
      var currVal = unitsCountSlider.options.from;
      var min = unitsCountSlider.options.from_min;
      var max = unitsCountSlider.options.max;

      // if (val !== 0 && !val) return;

      if (isNaN(val)) {
        unitsCountSlider.update({
          from: currVal
        });
      }

      if (val === currVal) {
        unitsCountSlider.update({
          from: val
        });

        return false;
      }

      if (val >= min && val <= max) {
        unitsCountSlider.update({
          from: val
        });
      } else if (val > max) {
        unitsCountSlider.update({
          from: max
        });
        e.target.value = max;
      }
    });

    $unitsCountForm.on('submit', function (e) {
      e.preventDefault();

      var inpVal = +$(unitsCount).val();
      var rangeSliderVal = unitsCountSlider.options.from;

      if (!isNaN(inpVal) && inpVal !== rangeSliderVal) {
        unitsCountSlider.update({
          from: inpVal
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
  (function () {
    /** Example
      <div
        class="className_shrink"
            data-expand="className"
      >...</div>
      <a
        href="#"
        class="see-more js-expand-toggle"
        data-expand-target="className"
        data-toggle-text="some_text"
      >...</a>
    */

    var model = {
      toggle: {
        className: 'js-expand-toggle', // required
        textAttr: 'toggle-text', // required
        targetAttr: 'expand-target' // required
      },
      target: {
        name: 'expand', // required
        maxHeight: 'max-height', // optional
        shrinkClass: 'shrink-class' // optional,  used target name if not specified
      }
    };

    var options = {
      maxHeight: 636
    };

    var Expand = function () {
      function Expand(el) {
        _classCallCheck(this, Expand);

        var targetName = $(el).data(model.toggle.targetAttr);
        var $target = $('[data-' + model.target.name + '=' + targetName + ']');

        this.toggle = {
          $el: $(el),
          toggleText: $(el).data(model.toggle.textAttr),
          currentText: $(el).text().trim()
        };

        if ($target.length) {
          this.target = {
            $el: $target,
            maxHeight: $target.data(model.target.maxHeight) || options.maxHeight,
            shrinkClass: $target.data(model.target.shrinkClass) || targetName + '_shrink'
          };
        }
      }

      _createClass(Expand, [{
        key: 'init',
        value: function init() {
          var _this = this;

          this.toggle.$el.on('click', function (e) {
            e.preventDefault();
            if (!_this.target) {
              return;
            }

            _this.toggleText();
            _this.toggle.$el.toggleClass('see-more');

            if (_this.target.$el.css('maxHeight') === 'none') {
              _this.target.$el.addClass(_this.target.shrinkClass);
              _this.target.$el.css('maxHeight', _this.target.$el[0].scrollHeight).animate({ maxHeight: _this.target.maxHeight });
            } else {
              _this.target.$el.animate({ maxHeight: _this.target.$el[0].scrollHeight }, function () {
                _this.target.$el.removeClass(_this.target.shrinkClass);
                _this.target.$el.css('maxHeight', 'none');
              });
            }
          });
        }
      }, {
        key: 'toggleText',
        value: function toggleText() {
          var _toggle = this.toggle,
              currentText = _toggle.currentText,
              toggleText = _toggle.toggleText;

          this.toggle.$el.text(toggleText);
          this.toggle.currentText = toggleText;
          this.toggle.toggleText = currentText;
        }
      }]);

      return Expand;
    }();

    $('.' + model.toggle.className).each(function (i, el) {
      var expand = new Expand(el);
      expand.init();
    });
  })();
  /** Example
  <ul class="..." data-accordion>
    <li class="faqs__item" data-accordion-item="faqs__item"> <!-- add faqs__item_open class -->
        <div class="faqs__q">
          ...title
        </div>
        <div class="faqs__a" data-accordion-content>
            ...expanded content
        </div>
    </li>
  </ul>
  */

  (function () {
    var model = {
      accordion: {
        name: 'accordion'
      },
      item: {
        name: 'accordion-item',
        contentName: 'accordion-content'
      }
    };

    $('[data-' + model.accordion.name + ']').each(function (i, el) {
      $(el).on('click', '[data-' + model.item.name + ']', function (e) {
        // eslint-disable-line
        var $item = $(this);
        var itemClass = $item.attr('data-' + model.item.name);
        var $contentItem = $item.find('[data-' + model.item.contentName + ']');

        if (parseInt($contentItem.css('maxHeight'), 10) === 0) {
          $contentItem.animate({ maxHeight: $contentItem[0].scrollHeight }, 150, function () {
            $item.addClass(itemClass + '--open');
          });
        } else {
          $contentItem.animate({ maxHeight: 0 }, 150, function () {
            $item.removeClass(itemClass + '--open');
          });
        }
      });
    });
  })();
  (function () {
    var model = {
      tabs: 'js-tabs',
      tab: 'js-tab',
      tabPanel: 'js-tab-panel',
      tabContent: 'js-tab-content'
    };

    var activePanelUpdate = function activePanelUpdate() {
      var $activeTab = $('.' + model.tab + '.active');
      if ($activeTab.length) {
        $activeTab.click();
      }
    };

    // rivals-comparison
    $('.' + model.tabs).on('click', '.' + model.tab, function (e) {
      // eslint-disable-line
      var $wrapper = $(this).closest('.' + model.tabs);
      var index = $('.' + model.tab).index(this);

      $('.' + model.tab + '.active').removeClass('active');
      $(this).addClass('active');

      var $tabPanel = $wrapper.find('.' + model.tabPanel);
      var nextActiveContent = $wrapper.find('.' + model.tabContent).eq(index);
      var minHeight = nextActiveContent.outerHeight();

      $tabPanel.animate({ minHeight: minHeight }, 150);
      $wrapper.find('.' + model.tabContent + '.active').removeClass('active');
      nextActiveContent.addClass('active');
    });

    activePanelUpdate();

    $(window).on('resize', throttle(activePanelUpdate, 500));
  })();
  (function () {
    $('.js-scroll-to').on('click', function () {
      // eslint-disable-line
      var destination = $($(this).data('scroll-to'));

      // TODO
      // replace .header with js-header
      // state waiting for finished changes in header
      if (destination.is(':visible')) {
        $('html, body').animate({
          scrollTop: destination.position().top - ($('.header').height() || 0)
        }, $(this).data('scroll-to-speed'));
        return false;
      }
    });
  })();
  (function () {
    // TODO
    // make possible to use several masonry elements on the page
    var $masonry = $('.js-c-masonry');
    var $masonrySource = $masonry.find('.js-c-masonry-inner');
    if ($masonrySource.length) {
      var nodes = {
        originalNodes: [],
        clones: []
      };
      $masonrySource.find('.js-c-masonry-inner__item').each(function (ind, el) {
        nodes.originalNodes.push(el);
        nodes.clones.push($(el).clone());
      });

      var activatedMasonry = $('<div></div>').addClass('c-masonry-inner c-masonry-inner_activated');
      $masonry.append(activatedMasonry);

      $masonrySource.css({
        position: 'absolute',
        width: '100%',
        height: 0,
        opacity: 0,
        zIndex: '-1',
        overflow: 'hidden'
      });

      colsCreate($masonrySource, nodes, activatedMasonry);

      $(window).on('resize', {
        nodes: nodes,
        activatedMasonry: activatedMasonry
      }, colsUpdate);
    }

    function colsUpdate(event) {
      var _event$data = event.data,
          nodes = _event$data.nodes,
          activatedMasonry = _event$data.activatedMasonry;

      if (isColsCountCorrect($masonrySource, nodes.originalNodes, activatedMasonry)) {
        return;
      }
      colsCreate($masonrySource, nodes, activatedMasonry);
    }

    function colsCreate(parent, nodes, masonry) {
      var originalNodes = nodes.originalNodes,
          clones = nodes.clones;

      var needCount = colsCount(parent, originalNodes);
      masonry.remove('.c-masonry-inner__col');
      masonry.html('');
      for (var i = 0; i < needCount; i += 1) {
        var newCol = $('<div class="c-masonry-inner__col"></div>');
        for (var j = i; j < originalNodes.length; j += needCount) {
          newCol.append(clones[j]);
        }
        masonry.append(newCol);
      }
    }

    function isColsCountCorrect(parent, originalNodes, masonry) {
      var currentColCount = masonry.find('.c-masonry-inner__col').length;
      var needCount = colsCount(parent, originalNodes);
      return currentColCount === needCount;
    }

    function colsCount(parent, list) {
      var count = 1;

      for (; count < list.length; count += 1) {
        var elTop = $(list[count]).position().top;
        // if (parentTop - elTop > diff) {
        if (elTop > 0) {
          break;
        }
      }
      return count;
    }
  })();
  (function () {
    /**
    * max tablet width. Depends on css media
    * @var integer
    */
    var tabletUpLim = 960;
    var model = {
      signupFormLink: 'js-trial-features-signup-form-link',
      signupFormWrapper: 'js-trial-features-form-wrapper',
      signupFormBox: 'js-trial-features-signup-form-box'
    };

    // hide fixed banner button while form is inview
    var $signupFormLink = $('.' + model.signupFormLink);
    if ($signupFormLink.length) {
      var signupFormInview = new Waypoint.Inview({
        element: $('.' + model.signupFormWrapper)[0],
        enter: function enter(dir) {
          if (dir === 'down') {
            $signupFormLink.fadeOut();
          }
        },
        exited: function exited(dir) {
          if (dir === 'up') {
            $signupFormLink.fadeIn();
          }
        }
      });
    }

    /**
    * Hnadle signup form inview behavior.
    * Presents on free trial pages.
    */
    if ($('.' + model.signupFormWrapper).length && $('.' + model.signupFormBox).length) {
      $(window).resize(function () {
        var $signupFormBox = $('.' + model.signupFormBox);
        var formOffsetTop = $signupFormBox.offset().top;
        if ($(window).innerWidth() > tabletUpLim) {
          // desktop width
          $signupFormBox.css('marginBottom', 20);
          $signupFormBox.stick_in_parent({
            offset_top: formOffsetTop
          });
        } else {
          // mobile & tablet width
          $signupFormBox.trigger('sticky_kit:detach');
        }
      });
      $(window).resize();
    }
  })();
  (function () {
    //   const body = $('body')[0];
    //   const fwHeader = document.querySelector('.js-header');
    //   const mainMenuBox = document.querySelector('.js-menu');
    //   const menuToggle = document.querySelector('.js-menu-toggle');

    //     const showMoreManager = function() {
    //         const $container = $(this);
    //         const $list = $container.find('[data-show-list]');
    //         const $btn = $container.find('[data-show-btn]');
    //         const listCollapsedClass = 'isShort';
    //         alert(1);
    //         let isExpanded = false;
    //         let fullHeight;
    //         let shortHeight;

    //         $list.addClass(listCollapsedClass);

    //         const detectFullAndShorHeight = function(){
    //             $list.removeClass(listCollapsedClass);
    //             fullHeight = $list.height();
    //             $list.addClass(listCollapsedClass);
    //             shortHeight = $list.height();
    //           //  $list.css('height', shortHeight);
    //             // isExpanded = false;
    //             console.log(fullHeight);
    //             console.log(shortHeight);
    //         };


    //         if (window.innerWidth < 768) {
    //             setTimeout(detectFullAndShorHeight, 1000);
    //         }

    //         $(window).resize(() => {
    //             if(isExpanded && window.innerWidth < 768 ){
    //                 detectFullAndShorHeight();
    //             }
    //         });

    //         $btn.on('click', function(){
    //             $list.toggleClass(listCollapsedClass);
    //             alert(1);
    //             detectFullAndShorHeight();
    //             if(isExpanded){
    //                 $list.addClass(listCollapsedClass);
    //                 $list.height(fullHeight).animate({ height: shortHeight }, 1000);
    //             } else {
    //                 $list.removeClass(listCollapsedClass);
    //                 $list.height(shortHeight).animate({ height: fullHeight }, 1000);
    //             }
    //             isExpanded = !isExpanded;
    //         });

    //     };

    //     $(document).ready(function () {
    //         $('js-show-more-container').each(showMoreManager);
    //     });

    function featuresToggler() {
      var list = this.querySelector('[data-show-list]');
      var btn = this.querySelector('[data-show-btn]');
      var showClass = 'isShort';
      var btnClassPositive = 'showText';

      btn.addEventListener('click', function () {
        list.classList.toggle(showClass);
        btn.classList.toggle(btnClassPositive);
        if (btn.classList.contains(btnClassPositive)) {

          $('html, body').animate({
            scrollTop: $(btn).offset().top - window.innerHeight + $(btn).height() + 60
          }, 500);
        }
      });
    }

    $(document).ready(function () {

      $('.js-show-more-container').each(featuresToggler);
    });
  })();
  function setUnitsHeaderHeight() {
    var units = document.querySelectorAll('.js-units-header');

    if (units.length) {
      var unitHeaders = Array.prototype.slice.call(units);
      var firstHeaderHeight = Math.ceil(unitHeaders[0].offsetHeight);
      var secondHeaderHeight = Math.ceil(unitHeaders[1].offsetHeight);

      if (firstHeaderHeight !== secondHeaderHeight) {
        if (firstHeaderHeight > secondHeaderHeight) {
          unitHeaders[1].style.minHeight = firstHeaderHeight + 'px';
        } else {
          unitHeaders[0].style.minHeight = secondHeaderHeight + 'px';
        }
      }
    }
  }

  setUnitsHeaderHeight();
  //modal window
  $(document).ready(function ($) {
    var input = document.getElementById('myInput');
    input.addEventListener('blur', function () {
      var value = this.value;
      var check = /^\d+$/.test(value);
      if (check && +value < 50) {
        $('.js-fade').addClass('visible');
        $('body').addClass('modal-video-open');
        return false;
      }
    });
    //Click on the button.
    $('.js-close').click(function () {
      $(this).parents('.js-fade').removeClass('visible');
      $('body').removeClass('modal-video-open');
      return false;
    });
    //Click on the Esc.
    $(document).keydown(function (e) {
      if (e.keyCode === 27) {
        e.stopPropagation();
        $('.js-fade').removeClass('visible');
        $('body').removeClass('modal-video-open');
      }
    });
    // Click on the body.
    $('.js-fade').click(function (e) {
      if ($(e.target).closest('.js-modal').length == 0) {
        $(this).removeClass('visible');
        $('body').removeClass('modal-video-open');
      }
    });
  });

  // TODO
  // possible need to change/add .js-header classNmae
  // when new header will come from app api
  if ($('.js-header')[0]) {
    var stickyHeader = new Waypoint.Sticky({
      element: $('.js-header')[0],
      offset: -1,
      stuckClass: 'is_stuck'
    });
  }

  // smooth scroll
  $(document).on('click', 'a[href^="#"]', function (e) {
    // eslint-disable-line
    if ($.attr(this, 'href') === '#') return;
    e.preventDefault();

    var offset = $($.attr(this, 'href')).offset() || $('[name="' + $.attr(this, 'href').slice(1) + '"]').offset();

    if (!offset) return;

    var offsetTop = offset.top;

    // on detailed article view consider current height of the header and gap
    if ($('.article__content').length) offsetTop -= $('header.header').height() + 10;
    $('html, body').animate({
      scrollTop: offsetTop
    }, 500);
  });
});