/* Globals */

let gallerylightbox = null;
let contentlightbox = null;

let active_section = 1;
let active_section_id = '';
let active_slide = 0;
let active_slide_id = '';
let after_render = 0;
let fpresizing = false;

/* Helper Functions */

// Return viewport-dimensions
function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width: e[a + 'Width'], height: e[a + 'Height'] };
}

// Return scrollbar-width
function fpScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}

// Return responsive mode
function fpIsResponsive() {
    return $('body').hasClass('fp-responsive');
}

// Set Titles for horiontal Navi-Dots
function fpSetHorizontalDotTitles() {
    if (fps_shownavigationtooltip == '1') {
        object = JSON.parse(fp_horizontal_slide_titles);
        for (const [key, value] of Object.entries(object)) {
            for (const [key2, value2] of Object.entries(value)) {
                worktext = `${key2},${value2}`;
                dotinfo = worktext.split(',');
                $('.section-' + dotinfo[1]).find('div.fp-slidesNav')
                    .find("li:nth-of-type(" + (++dotinfo[0]) + ")")
                    .find('a').attr('uk-tooltip', '').attr('alt', dotinfo[2]).attr('title', dotinfo[2]);
            }
        }
    }
}

// Navigation-Dots in der Main-Navi ausblenden (class=hide-mainnav)
function fpHideNaviDots() {
    $('.hide-mainnav').each(function (index) {
        $('#fp-nav').find('a[href$="#' + $(this).data('menuanchor') + '"]').parent().css('display', 'none');
    });
}

// Srcoll to top of section
function fpScrollToTopOfSection(sel, index) {
    if (!fpIsResponsive()) return;
    var scrolledTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolledTop != $(sel).offset().top) {
        $('html,body').animate({ scrollTop: $(sel).offset().top }, 200);
        $.fn.fullpage.moveTo(index);
    }
}

// Load Background-Images, set Background-Images, set Background-Videos
function fpSetBackgrounds() {
    $('.section').addClass('loaded');
    $('section[data-bgvideo]').each(function () {
        $(this).prepend('<video class="fullpage-bgvideo" autoplay data-autoplay muted loop><source data-src="' + $(this).data('bgvideo') + '" type="' + $(this).data('videotype') + '"></video>');
    });
    $('.slide[data-bgvideo]').each(function () {
        $(this).prepend('<video class="fullpage-bgvideo" autoplay data-autoplay muted loop><source data-src="' + $(this).data('bgvideo') + '" type="' + $(this).data('videotype') + '"></video>');
    });
    $('section[data-bgstyle]').each(function () {
        $(this).prepend('<div class="fullpage-slidebackground" style="' + $(this).data('bgstyle') + '"></div>');
    });
    $('.slide[data-bgstyle]').each(function () {
        $(this).prepend('<div class="fullpage-slidebackground" style="' + $(this).data('bgstyle') + '"></div>');
    });
    $('.fullpage-slidebackground').css('width', 'calc(100vw - ' + fpScrollbarWidth() + 'px)');
}

// Preload Images with data-src
function fpPreloadImages() {
    $('div.fullpage').find('img[data-src]').each(function () {
        $(this).attr('src', $(this).data('src')).removeAttr('data-src');
    });
}

// use plyr for videos
function fpUsePlyr() {
    $.getScript('assets/addons/demo_fullpage/js/plyr.js', function () {
        localStorage.removeItem('plyr');
        const player = new Plyr('.video');
    });
}

// Fix Background-Images + Background-Video
function fpFixBackgrounds() {
    $('.fullpage-bgvideo').css('width', 'calc(100vw - ' + fpScrollbarWidth() + 'px)');
    $('.fullpage-slidebackground').css('width', 'calc(100vw - ' + fpScrollbarWidth() + 'px)');
}

// Fix Navigation - Main/Hamburger
function fpFixNavigation() {
    if (fpIsResponsive()) {
        $('.mainnav').hide();
        $('.hamburger').removeClass('is-active');
    } else {
        $('.mainnav').fadeIn(300);
    }
}

/* Options and Callbacks for fullPage.js */

var fps_settings = {
    //navigation
    menu: '.mainnav',
    navigation: false,
    navigationPosition: 'right',
    showActiveTooltip: false,
    slidesNavigation: false,
    slidesNavPosition: 'bottom',

    //scrolling
    scrollBar: false,
    css3: true, // bei "fixed" Hintergrundbildern muss dieser Parameter auf false stehen!
    easing: 'easeInOutCubic', // für weitere Effekte jquery.easings.min.js im Template Footer aktivieren
    scrollingSpeed: 800,
    autoScrolling: false,
    fitToSection: true,
    fitToSectionDelay: 1000,
    loopBottom: false,
    loopTop: false,
    loopHorizontal: true,
    continuousVertical: false,
    touchSensitivity: 15,
    normalScrollElementTouchThreshold: 5,
    bigSectionsDestination: 'top',

    //Accessibility
    keyboardScrolling: true,
    animateAnchor: true,
    recordHistory: true,

    //design
    controlArrows: false,
    controlArrowColor: '#333',
    verticalCentered: true,
    paddingTop: 0,
    paddingBottom: 0,
    responsive: 0,
    responsiveWidth: 1200,
    responsiveHeight: 750,

    lazyLoading: true,

    // After rebuild of fullPage
    afterReBuild: function () {
    },

    // Init, hide loader fadein pagewrapper ...
    afterRender: function () {
        after_render = 1;

        $('.loader').fadeOut(600); // Loading-Animation ausblenden

        // ausgeblendete Sections auch bei den Navi-Dots ausblenden
        //fpHideNaviDots();

        // pagewrapper einblenden
        $('.pagewrapper').animate({ opacity: 1 }, 400, function () { // Animation complete.
            // Animation Styleswitch
            $('.styleswitch').addClass('uk-animation-slide-bottom').show();
            // Animation TRex
            $('div.for').animate({ opacity: .5 }, 1000, function () { });
        });

        fpSetHorizontalDotTitles();
    },

    // Switch responsive mode
    afterResponsive: function (isResponsive) {
        fpFixNavigation();
        fpFixBackgrounds();
        $.fn.fullpage.moveTo(active_section, active_slide);
    },

    // After resize page
    afterResize: function () {
        fpresizing = false;
        fpFixNavigation();
        fpFixBackgrounds();
        $.fn.fullpage.moveTo(active_section, active_slide);
    },

    // After loading slide
    afterLoad: function (anchorLink, index) {
        if (!fpresizing) {
            active_section = index;
            active_section_id = anchorLink;
            fpFixBackgrounds();
        }
    },

    // Leaving slide
    onLeave: function (index, nextIndex, direction) {
    },

    // After loading horizontal slide
    afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
        if (!fpresizing) {
            active_section = index;
            active_section_id = anchorLink;
            active_slide = slideIndex;
            active_slide_id = slideAnchor;
        }
    },

    // leaving horizontal slide
    onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {
    }

};

// Extend options mit Addon-Einstellungen
jQuery.extend(fps_settings, fps_options);

// Window Resize
$(window).on('resize', function () {
    fpresizing = true;
});

$(document).ready(function () {

    // Initiate fullpage.js - https://alvarotrigo.com/fullPage/
    $('.fullpage').fullpage(fps_settings);

    // Logo click zum 1. Slide
    $('.pagelogo img').click(function (e) {
        e.preventDefault();
        document.activeElement.blur();
        $.fn.fullpage.moveTo(1);
        $('html, body').animate({ scrollTop: 0 }, 400);
    });

    // Klick auf Navigation, bei mobiler Navigation ausblenden
    $('.mainnav').find('a').click(function () {
        if ($('.hamburger').hasClass('is-active') === true) {
            $('.hamburger').trigger('click');
        }
        if ($(this).parent().hasClass('active')) {
            fpScrollToTopOfSection('.section-' + $(this).data('sectionid'), $(this).data('sectionid'));
        }
    });

    // Hambuger Menu
    $('.hamburger').addClass('hamburger--squeeze');
    $('.hamburger').on('click', function (e) {
        e.preventDefault();
        document.activeElement.blur();
        if ($(this).hasClass('is-active') === true) {
            $('.mainnav').slideUp(300);
        } else {
            $('.mainnav').slideDown(300);
        }
        $(this).toggleClass('is-active');
    });

    // ScrollDown/ScrollUp arrow click
    $('a.arrowdown').click(function (e) {
        e.preventDefault();
        if ($('.hamburger').hasClass('is-active') === true) {
            $('.hamburger').trigger('click');
        }
        $.fn.fullpage.moveSectionDown();
    });
    $('a.arrowup').click(function (e) {
        e.preventDefault();
        if ($('.hamburger').hasClass('is-active') === true) {
            $('.hamburger').trigger('click');
        }
        $.fn.fullpage.moveSectionUp();
    });

    // externe links in neuem Fenster öffnen
    $(".uk-container a[href^='http://']:not(.lightboxcontent)").addClass('extern');
    $(".uk-container a[href^='https://']:not(.lightboxcontent)").addClass('extern');
    $('a.extern, a.newwindow').click(function (e) {
        e.preventDefault();
        window.open($(this).attr('href'));
    });

    // externe Links um Icon erweitern
    $('a.extern').each(function (e) {
        $(this).html('<i class="fas fa-external-link-alt"></i>' + $(this).html());
    });

});

// Load Background-Images, set Background, set Background-Video
// Preload Images
// Use plyr + glightbox
window.addEventListener('DOMContentLoaded', function (event) {
    setTimeout(function () {
        fpSetBackgrounds();
    }, 200);
    setTimeout(function () {
        fpUsePlyr();
    }, 200);
    setTimeout(function () {
        fpPreloadImages();
    }, 700);
});
