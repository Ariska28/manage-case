(() => {
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

  const model = {
    toggle: {
      className: 'js-expand-toggle', // required
      textAttr: 'toggle-text', // required
      targetAttr: 'expand-target', // required
    },
    target: {
      name: 'expand', // required
      maxHeight: 'max-height', // optional
      shrinkClass: 'shrink-class', // optional,  used target name if not specified
    },
  };

  const options = {
    maxHeight: 636,
  };

  class Expand {
    constructor(el) {
      const targetName = $(el).data(model.toggle.targetAttr);
      const $target = $(`[data-${model.target.name}=${targetName}]`);

      this.toggle = {
        $el: $(el),
        toggleText: $(el).data(model.toggle.textAttr),
        currentText: $(el).text().trim(),
      };

      if ($target.length) {
        this.target = {
          $el: $target,
          maxHeight: $target.data(model.target.maxHeight) || options.maxHeight,
          shrinkClass: $target.data(model.target.shrinkClass) || `${targetName}_shrink`,
        };
      }
    }

    init() {
      this.toggle.$el.on('click', (e) => {
        e.preventDefault();
        if (!this.target) {
          return;
        }

        this.toggleText();
        this.toggle.$el.toggleClass('see-more');

        if (this.target.$el.css('maxHeight') === 'none') {
          this.target.$el.addClass(this.target.shrinkClass);
          this.target.$el.css('maxHeight', this.target.$el[0].scrollHeight).animate({ maxHeight: this.target.maxHeight });
        } else {
          this.target.$el.animate({ maxHeight: this.target.$el[0].scrollHeight }, () => {
            this.target.$el.removeClass(this.target.shrinkClass);
            this.target.$el.css('maxHeight', 'none');
          });
        }
      });
    }

    toggleText() {
      const { currentText, toggleText } = this.toggle;
      this.toggle.$el.text(toggleText);
      this.toggle.currentText = toggleText;
      this.toggle.toggleText = currentText;
    }
  }

  $(`.${model.toggle.className}`).each((i, el) => {
    const expand = new Expand(el);
    expand.init();
  });
})();
