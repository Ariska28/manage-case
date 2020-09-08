//modal wind
const modalForInput = (function() {
    const model = {
        input: null,
        modal: null,
        close: null
    };

    const cssClass = {
        modalActive: 'visible',
        bodyActive: 'modal-video-open',
    };

    const closeModal = (evt) => {
        evt.preventDefault();
        model.modal.removeClass(cssClass.modalActive);
        $('body').removeClass(cssClass.bodyActive);
    };

    const openModal = () => {
        model.modal.addClass(cssClass.modalActive);
        $('body').addClass(cssClass.bodyActive);
    };


    const init = (input, modal) => {
        model.input = input;
        model.modal = modal;
        model.close = modal.find('[data-modal=close]');

        model.close.on('click', closeModal);


        $(document).keydown(function(evt) {
            if (evt.keyCode === 27) {
                evt.stopPropagation();
                closeModal(evt);
            }
        });

        model.modal.on('click', (evt) => {
            if (model.modal.is(evt.target)) {
                closeModal(evt);
            }
        });

        model.input.on('blur', function() {
            let value = this.value;
            let check = /^\d+$/.test(value);
            if (check && +value < 50) {
                openModal();
            }
        });
    };

    return {
        init: init
    }
})();


$(document).ready(function($) {
    let input = $('.js-myinput');
    let modal = $('.js-fade');
    let close = $('.js-close');
    if (input && modal) {
        modalForInput.init(input, modal);
    }
});