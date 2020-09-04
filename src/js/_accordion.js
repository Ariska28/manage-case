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

(() => {
  const model = {
    accordion: {
      name: 'accordion',
    },
    item: {
      name: 'accordion-item',
      contentName: 'accordion-content',
    },
  };

  $(`[data-${model.accordion.name}]`).each((i, el) => {
    $(el).on('click', `[data-${model.item.name}]`, function (e) { // eslint-disable-line
      const $item = $(this);
      const itemClass = $item.attr(`data-${model.item.name}`);
      const $contentItem = $item.find(`[data-${model.item.contentName}]`);

      if (parseInt($contentItem.css('maxHeight'), 10) === 0) {
        $contentItem.animate({ maxHeight: $contentItem[0].scrollHeight }, 150, () => {
          $item.addClass(`${itemClass}--open`);
        });
      } else {
        $contentItem.animate({ maxHeight: 0 }, 150, () => {
          $item.removeClass(`${itemClass}--open`);
        });
      }
    });
  });
})();
