//modal window
$(document).ready(function($) {
    var input = document.getElementById('myInput');
    input.addEventListener('blur', function() {
    let value = this.value;
    let check =  /^\d+$/.test(value);
    if (check && +value < 50) {
        $('.js-fade').addClass('visible');
        $('body').addClass('modal-video-open');
        return false;
    }
    })     
    //Click on the button.
    $('.js-close').click(function() {
        $(this).parents('.js-fade').removeClass('visible');
        $('body').removeClass('modal-video-open');
        return false;
    });        
    //Click on the Esc.
    $(document).keydown(function(e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            $('.js-fade').removeClass('visible');
            $('body').removeClass('modal-video-open');
        }
        
    });
    // Click on the body.
    $('.js-fade').click(function(e) {
        if ($(e.target).closest('.js-modal').length == 0) {
            $(this).removeClass('visible');	
            $('body').removeClass('modal-video-open');				
        }
    });	
});

