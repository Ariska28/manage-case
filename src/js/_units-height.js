function setUnitsHeaderHeight() {
    var units = document.querySelectorAll('.js-units-header');

    if(units.length){
        var unitHeaders = Array.prototype.slice.call(units);
        var firstHeaderHeight = Math.ceil(unitHeaders[0].offsetHeight); 
        var secondHeaderHeight = Math.ceil(unitHeaders[1].offsetHeight);

        if (firstHeaderHeight !== secondHeaderHeight) {
            if (firstHeaderHeight > secondHeaderHeight) {
                unitHeaders[1].style.minHeight = firstHeaderHeight + 'px';
            } else {
                unitHeaders[0].style.minHeight = secondHeaderHeight + 'px';
            }
        }
    }
    

}

setUnitsHeaderHeight();