(() => {
  const $agreementForm = $('.js-request-a-demo-form');

  if ($agreementForm.length) {
    const $checkboxHidden = $agreementForm.find('.js-agreement');
    $checkboxHidden.hide();

    $agreementForm.find('.js-agreement-visible').on('change', () => {
      if ($agreementForm.find('.js-agreement-visible').is(':checked')) {
        $checkboxHidden.find('input').prop('checked', true);
      } else {
        $checkboxHidden.find('input').prop('checked', false);
      }
    });
  }
})();
