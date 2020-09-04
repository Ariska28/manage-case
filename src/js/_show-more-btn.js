(() => {
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
    const list = this.querySelector('[data-show-list]');
    const btn = this.querySelector('[data-show-btn]');
    const showClass = 'isShort';
    const btnClassPositive = 'showText';

    btn.addEventListener('click', function() {
        list.classList.toggle(showClass);
        btn.classList.toggle(btnClassPositive);
        if(btn.classList.contains(btnClassPositive)){          
           
              $('html, body').animate({
                scrollTop: $(btn).offset().top - window.innerHeight + $(btn).height() + 60,
              }, 500);
        }
    });
}

$(document).ready(function () {
   
    $('.js-show-more-container').each(featuresToggler);
        
});

})();
