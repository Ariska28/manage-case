(() => {
  // TODO
  // make possible to use several masonry elements on the page
  const $masonry = $('.js-c-masonry');
  const $masonrySource = $masonry.find('.js-c-masonry-inner');
  if ($masonrySource.length) {
    const nodes = {
      originalNodes: [],
      clones: [],
    };
    $masonrySource.find('.js-c-masonry-inner__item').each((ind, el) => {
      nodes.originalNodes.push(el);
      nodes.clones.push($(el).clone());
    });

    const activatedMasonry = $('<div></div>').addClass('c-masonry-inner c-masonry-inner_activated');
    $masonry.append(activatedMasonry);

    $masonrySource.css({
      position: 'absolute',
      width: '100%',
      height: 0,
      opacity: 0,
      zIndex: '-1',
      overflow: 'hidden',
    });

    colsCreate($masonrySource, nodes, activatedMasonry);

    $(window).on('resize', {
      nodes,
      activatedMasonry,
    }, colsUpdate);
  }

  function colsUpdate(event) {
    const { nodes, activatedMasonry } = event.data;
    if (isColsCountCorrect($masonrySource, nodes.originalNodes, activatedMasonry)) {
      return;
    }
    colsCreate($masonrySource, nodes, activatedMasonry);
  }

  function colsCreate(parent, nodes, masonry) {
    const { originalNodes, clones } = nodes;
    const needCount = colsCount(parent, originalNodes);
    masonry.remove('.c-masonry-inner__col');
    masonry.html('');
    for (let i = 0; i < needCount; i += 1) {
      const newCol = $('<div class="c-masonry-inner__col"></div>');
      for (let j = i; j < originalNodes.length; j += needCount) {
        newCol.append(clones[j]);
      }
      masonry.append(newCol);
    }
  }

  function isColsCountCorrect(parent, originalNodes, masonry) {
    const currentColCount = masonry.find('.c-masonry-inner__col').length;
    const needCount = colsCount(parent, originalNodes);
    return currentColCount === needCount;
  }

  function colsCount(parent, list) {
    let count = 1;

    for (;count < list.length; count += 1) {
      const elTop = $(list[count]).position().top;
      // if (parentTop - elTop > diff) {
      if (elTop > 0) {
        break;
      }
    }
    return count;
  }
})();
