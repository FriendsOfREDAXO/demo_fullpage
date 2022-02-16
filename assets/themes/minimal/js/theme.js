/* Options and Callbacks for fullpage.js */
var fps_settings = {
    scrollBar: false,
    scrollingSpeed: 600,
    css3: true,
    menu: '.mainnav',
    verticalCentered: true,
    recordHistory: false,
    autoScrolling: false,
    fitToSection: false,
    responsiveWidth: 1050,
    responsiveHeight: 600,
    paddingTop: '0px',
    navigation: false,
    navigationPosition: 'right',
    showActiveTooltip: false,
    controlArrows: false,
    slidesNavigation: false,
    slidesNavPosition: 'bottom',
    loopHorizontal: true,
    bigSectionsDestination: 'top',
    lazyLoading: true,
    continuousVertical: false,

    // Init, hide loader fadein pagewrapper ...
    afterRender: function () {
        $('.loader').fadeOut(700);
        $('.pagewrapper').animate({ opacity: 1 }, 600);
        if ($('.hamburger').is(':visible')) {
            $('.mainnav').hide();
        } else {
            $('.mainnav').fadeIn(600);
        }
        $('#fp-nav').fadeIn(600);
        viewportheight = window.innerHeight;
        //$('section').css('min-height', viewportheight);
    },
    // After loading slide
    afterLoad: function (anchorLink, index) {
        active_slide = index;
    },
    // leaving slide
    onLeave: function (index, nextIndex, direction) {
        $('a.arrowdown-' + index).hide();
        $('a.arrowdown-' + nextIndex).show();
    },
    // Switch responsive mode
    afterResponsive: function (isResponsive) {
        if (isResponsive) {
            $('.mainnav').hide();
            $('.hamburger').show();
            //$('section:not(.fp-auto-height)').addClass('rem-fp-auto-height').addClass('fp-auto-height');
        } else {
            $('.mainnav').show();
            $('.hamburger').hide();
            //$('section.rem-fp-auto-height').removeClass('fp-auto-height').removeClass('rem-fp-auto-height');
        }
    },
    // After resize page
    afterResize: function () {
    }
};

// Extend options mit Addon-Einstellungen
jQuery.extend(fps_settings, fps_options);

var active_slide = 1;

$(document).ready(function () {

    // Initiate fullpage.js - https://alvarotrigo.com/fullPage/
    $('.fullpage').fullpage(fps_settings);

    // Window Resize - Navigation aus/einblenden
    $(window).on('resize', function () {
        if ($('.hamburger').is(':visible')) {
            $('.mainnav').hide();
            $('.hamburger').removeClass('is-active');
        } else {
            $('.mainnav').show();
        }
    });

    // Logo click zum 1. Slide
    $('.pagelogo').click(function () {
        if ($('.hamburger').hasClass('is-active') === true) {
            $('.hamburger').trigger('click');
        }
        $.fn.fullpage.moveTo(1);
    });

    // Klick auf Navigation, bei mobiler Navi Navigation ausblenden
    $('.mainnav').find('a').click(function () {
        if ($('.hamburger').hasClass('is-active') === true) {
            $('.hamburger').trigger('click');
        }
    });

    // Scroll Indicator Click
    $('a.arrowdown').click(function (e) {
        e.preventDefault();
        if ($('.hamburger').hasClass('is-active') === true) {
            $('.hamburger').trigger('click');
        }
        $.fn.fullpage.moveSectionDown();
    });

    // externe links in neuem Fenster öffnen
    $(".container a[href^='http://']").addClass('extern');
    $(".container a[href^='https://']").addClass('extern');
    $('a.extern, a.newwindow').click(function (e) {
        e.preventDefault();
        window.open($(this).attr('href'));
    });

    // back to top arrow
    var backToTopOffset = 250;
    var backToTopDuration = 300;
    $('.pagewrapper').append('<a href="#" class="back-to-top"><i class="fa fa-arrow-circle-up"></i></a>');
    $(window).scroll(function () {
        if ($(this).scrollTop() > backToTopOffset) {
            $('.back-to-top').fadeIn(backToTopDuration);
        } else {
            $('.back-to-top').fadeOut(backToTopDuration);
        }
    });
    $('.back-to-top').click(function (e) {
        e.preventDefault();
        if ($('.hamburger').hasClass('is-active') === true) {
            $('.hamburger').trigger('click');
        }
        $.fn.fullpage.moveTo(1);
    });

    // Hambuger Menu
    $('.hamburger').addClass('hamburger--elastic');
    $('.hamburger').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('is-active') === true) {
            $('.mainnav').slideUp(300);
        } else {
            $('.mainnav').slideDown(300);
        }
        $(this).toggleClass('is-active');
    });

});
