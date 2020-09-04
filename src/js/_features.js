(() => {
  // stick feature page sidemenu and testimonials
  const $featuresSidebar = $('[data-features-sidebar-inner]');
  if ($featuresSidebar[0]) {
    $featuresSidebar.stick_in_parent({
      offset_top: 76,
    });
  }

  // inview sections for testimonials
  const $testimonialsBox = $('[data-features-testimonials-box]');
  const $middleSectionControl = $('[data-testimonial="f-testimonial2"]');

  let inviewMiddleSection;
  let endTestimonialsControl;

  if ($middleSectionControl[0]) {
    inviewMiddleSection = new Waypoint.Inview({
      element: $middleSectionControl[0],
      enter(dir) {
        if (dir === 'down' && $testimonialsBox[0]) {
          $testimonialsBox.removeClass('testimonial1_show');
          $testimonialsBox.addClass('testimonial2_show');
        }
      },
      entered(dir) {
        if (dir === 'down' && $testimonialsBox[0]) {
          $testimonialsBox.removeClass('testimonial2_show');
          $testimonialsBox.addClass('testimonial3_show');
        }
      },
      exit(dir) {
        if (dir === 'up' && $testimonialsBox[0]) {
          $testimonialsBox.removeClass('testimonial3_show');
          $testimonialsBox.addClass('testimonial2_show');
        }
      },
      exited(dir) {
        if (dir === 'up' && $testimonialsBox[0]) {
          $testimonialsBox.removeClass('testimonial2_show');
          $testimonialsBox.addClass('testimonial1_show');
        }
      },
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
