$(document).ready(function() {

    // =====
    // mobile nav & header
    // =====

    function toggleMobileNav(btn, nav, event) {
        event.preventDefault();
        btn.toggleClass('open');
        nav.toggleClass('top-nav--js-open');
    }

    // header nav
    $header = $('#header');
    $header_nav_btn = $('#header__nav-btn');
    $header_nav = $('.top-nav');

    $header_nav_btn.click(function(event){
        toggleMobileNav($header_nav_btn, $header_nav, event);
    });

    // check if on mobile
    function checkIfMobile() {
        if ($header_nav_btn.css('display') == 'block') {
            return true;
        } else {
            return false;
        }
    }

});