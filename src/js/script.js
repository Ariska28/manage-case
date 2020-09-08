document.addEventListener('DOMContentLoaded', () => {
    // concat "modules" injection
    //= ./_helpers.js
    //= ./_toggle-menu.js
    //= ./_dropdown.js
    //= ./_iam-dropdown.js
    //= ./_ie-specific.js
    //= ./player/_wistia.js
    //= ./_circle-diagram.js
    //= ./_select2-items.js
    //= ./form/_contact.js
    //= ./form/_agreement.js
    //= ./_features.js
    //= ./_slider.js
    //= ./_range-slider.js
    //= ./_expand.js
    //= ./_accordion.js
    //= ./_tabs.js
    //= ./_scroll-to.js
    //= ./_masonry.js
    //= ./_signup-inview.js
    //= ./_show-more-btn.js
    //= ./_units-height.js
    //= ./_modal-window.js
    //= ./_tabs.js

    // TODO
    // possible need to change/add .js-header classNmae
    // when new header will come from app api
    if ($('.js-header')[0]) {
        const stickyHeader = new Waypoint.Sticky({
            element: $('.js-header')[0],
            offset: -1,
            stuckClass: 'is_stuck',
        });
    }

    // smooth scroll
    $(document).on('click', 'a[href^="#"]', function(e) { // eslint-disable-line
        if ($.attr(this, 'href') === '#') return;
        e.preventDefault();

        const offset = $($.attr(this, 'href')).offset() || $(`[name="${$.attr(this, 'href').slice(1)}"]`).offset();

        if (!offset) return;

        let offsetTop = offset.top;

        // on detailed article view consider current height of the header and gap
        if ($('.article__content').length) offsetTop -= ($('header.header').height() + 10);
        $('html, body').animate({
            scrollTop: offsetTop,
        }, 500);
    });
});