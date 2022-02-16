/* Options and Callbacks for fullpage.js */
var fps_settings = {
    scrollBar: false,
    scrollingSpeed: 600,
    css3: true, // bei "fixed" Hintergrundbildern muss dieser Parameter auf false stehen!
    menu: '.mainnav',
    verticalCentered: true,
    recordHistory: false,
    autoScrolling: false,
    fitToSection: true,
    responsiveWidth: 1100,
    responsiveHeight: 600,
    resize: true,
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
    easingcss3: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',

    // Init, hide loader fadein pagewrapper ...
    afterRender: function () {
        $('.fp-controlArrow').hide(); // horizontele Slide-Arrows ausblenden, werden bei afterLoad eingeblendet
        $('.loader').fadeOut(800); // Loading-Animation ausblenden
        $('.pagewrapper').animate({ opacity: 1 }, 600, function () {
            $('body').addClass('bodybgimage');
        });
        if ($('.hamburger').is(':visible')) {
            $('.mainnav').hide();
        } else {
            $('.mainnav').fadeIn(600);
        }
        $('#fp-nav').fadeIn(800); // Show Navigation-Dots
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
        $('a.arrowdown-' + index).animate({ opacity: 0 }, 400);
        $('a.arrowdown-' + nextIndex).animate({ opacity: 1 }, 400);
        $('.section-idx-' + index).find('.fp-controlArrow').hide();

        if (index == 1 && direction == 'down') {
            $('.pagelogo').addClass('logosmall');
            $('.mainnav').addClass('navsmall');
        }
        if (index > 1 && nextIndex == 1 && direction == 'up') {
            if (!$('.hamburger').is(':visible')) {
                $('.mainnav').removeClass('navsmall');
                $('.pagelogo').removeClass('logosmall');
            }
        }
    },
    // Switch responsive mode
    afterResponsive: function (isResponsive) {
        $('section').css('min-height', viewportheight);
        if (isResponsive) {
            $('.mainnav').hide();
            $('.hamburger').show();
            $('.pagelogo').addClass('logosmall');
            $('.mainnav').addClass('navsmall');
            //$('section:not(.fp-auto-height)').addClass('rem-fp-auto-height').addClass('fp-auto-height');
        } else {
            $('.mainnav').show();
            $('.hamburger').hide();
            if (active_slide == 1) {
                $('.mainnav').removeClass('navsmall');
                $('.pagelogo').removeClass('logosmall');
            }
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

    // Window Resize - Navigation aus/einblenden
    $(window).on('resize', function () {
        if ($('.hamburger').is(':visible')) {
            $('.mainnav').hide();
            $('.hamburger').removeClass('is-active');
        }
    });

    // Logo click zum 1. Slide
    $('.pagelogo img').click(function () {
        if ($('.hamburger').hasClass('is-active') === true) {
            $('.hamburger').trigger('click');
        }
        $.fn.fullpage.moveTo(1);
        $('html, body').animate({ scrollTop: 0 }, 400);
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
    $(".uk-container a[href^='http://']").addClass('extern');
    $(".uk-container a[href^='https://']").addClass('extern');
    $('a.extern, a.newwindow').click(function (e) {
        e.preventDefault();
        window.open($(this).attr('href'));
    });

    // Initiate glightbox - https://biati-digital.github.io/glightbox/
    $.getScript('./assets/addons/demo_fullpage/themes/bike/js/glightbox.min.js', function () {
        const lightbox = GLightbox({
            selector: '.gallery',
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
        $('html, body').animate({ scrollTop: 0 }, 400);
    });

    // Hambuger Menu
    $('.hamburger').addClass('hamburger--spin');
    $(".hamburger").on("click", function (e) {
        e.preventDefault();
        if ($(this).hasClass('is-active') === true) {
            $('.mainnav').slideUp(300);
        } else {
            $('.mainnav').slideDown(300);
        }
        $(this).toggleClass("is-active");
    });

});
