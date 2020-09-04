(() => {
  // contact form select
  $('#cPosition').select2({
    placeholder: 'Choose',
    // allowClear: true
    minimumResultsForSearch: Infinity,
    width: 'resolve',
  });

  $('#cPhoneCode').select2({
    minimumResultsForSearch: Infinity,
    width: 'resolve',
  });

  // select2 global
  $('.js-select2').select2({
    minimumResultsForSearch: Infinity,
    width: 'resolve',
  });
})();
