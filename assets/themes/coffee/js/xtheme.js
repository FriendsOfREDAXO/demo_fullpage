/* Options and Callbacks for fullPage.js */
var fps_settings = {
    scrollBar: false,
    scrollingSpeed: 600,
    css3: false, // bei "fixed" Hintergrundbildern muss dieser Parameter auf false stehen!
    menu: '.mainnav',
    verticalCentered: true,
    recordHistory: false,
    autoScrolling: false,
    fitToSection: true,
    responsiveWidth: 1100,
    responsiveHeight: 600,
    resize: true,
    paddingTop: '50px',
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
        $('.fp-controlArrow').hide();
        $('.loader').fadeOut(600);
        $('.pagewrapper').animate({ opacity: 1 }, 600);
        if ($('.hamburger').is(':visible')) {
            $('.mainnav').hide();
        } else {
            $('.mainnav').fadeIn(600);
        }
        $('#fp-nav').fadeIn(600);
        viewportheight = window.innerHeight;
        $('section').css('min-height', viewportheight);
    },
    // After loading slide
    afterLoad: function (anchorLink, index) {
        active_slide = index;
        $('div.uk-tooltip').show();
        $('.section-idx-' + index).find('.fp-controlArrow').show();
    },
    // leaving slide
    onLeave: function (index, nextIndex, direction) {
        $('div.uk-tooltip').hide();
        $('a.arrowdown-' + index).hide();
        $('a.arrowdown-' + nextIndex).show();
        $('.section-idx-' + index).find('.fp-controlArrow').hide();
    },
    // Switch responsive mode
    afterResponsive: function (isResponsive) {
        $('section').css('min-height', viewportheight);
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
        $('section').css('min-height', viewportheight);
    }
};

// Extend options mit Addon-Einstellungen
jQuery.extend(fps_settings, fps_options);

var active_slide = 1;

$(document).ready(function () {

    // Initiate fullpage.js - https://alvarotrigo.com/fullPage/
    $('.fullpage').fullpage(fps_settings);

    // Tooltips
    //$('[data-toggle="tooltip"]').tooltip();

    // Window Resize - Navigation aus/einblenden
    $(window).on('resize', function () {
        if ($('.hamburger').is(':visible')) {
            $('.mainnav').hide();
            $('.hamburger').removeClass('is-active');
        } else {
            $('.mainnav').fadeIn(300);
        }
    });

    // Logo - click zum 1. Slide
    $('.pagelogo img').click(function () {
        if ($('.hamburger').hasClass('is-active') === true) {
            $('.hamburger').trigger('click');
        }
        $.fn.fullpage.moveTo(1);
        $('html, body').animate({ scrollTop: 0 }, 200);
    });

    // Klick auf Navigation, bei mobiler Navigation ausblenden
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
    $(".uk-container a[href^='http://']").addClass('extern');
    $(".uk-container a[href^='https://']").addClass('extern');
    $('a.extern, a.newwindow').click(function (e) {
        e.preventDefault();
        window.open($(this).attr('href'));
    });

    // Initiate glightbox - https://biati-digital.github.io/glightbox/
    $.getScript('./assets/addons/demo_fullpage/themes/coffee/js/glightbox.min.js', function () {
        const lightbox = GLightbox({
            selector: '.gallery',
            openEffect: 'fade',
            closeEffect: 'fade',
            loop: false
        });
        lightbox.on('open', function () {
            if ($('.hamburger').hasClass('is-active') === true) {
                $('.hamburger').trigger('click');
            }
        });
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
    $('.hamburger').addClass('hamburger--squeeze');
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
