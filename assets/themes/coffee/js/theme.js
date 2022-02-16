/* Helper Functions */

// Debug-Ausgabe in der console
function fpDebuglog(msg) {
    console.log(msg + ' fpIsResponsive=' + fpIsResponsive() + ' active_section=' + active_section + ' active_slide=' + active_slide + ' viewportheight=' + viewport().height);
}

// Return responsive mode
function fpIsResponsive() {
    return $('body').hasClass('fp-responsive');
}

// Return viewport-dimensions
function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width: e[a + 'Width'], height: e[a + 'Height'] };
}

// Hide navigation-dots
function hideNavDots() {
    $('.hide-mainnav').each(function (index) {
        $('#fp-nav').find('a[href$="#' + $(this).data('menuanchor') + '"]').parent().css('display', 'none');
    });
}

// Return maximum height of Section with horizontal slides
function getSectionMaxHeight(index) {
    $('.section-idx-' + index).find('img[data-src]').each(function () {
        $(this).attr('src', $(this).data('src')).removeAttr('data-src');
    });
    smaxh = $('.section-idx-' + index).height();
    $('.section-idx-' + index).find('.slide').each(function (index) {
        //fpDebuglog('getSectionMaxHeight ' + $(this).height());
        if ($(this).height() > smaxh) {
            smaxh = $(this).height();
        }
    });
    return smaxh;
}

// Set min-height horizontal slides
function setSlidesMinHeight() {
    $('.hasslides').each(function (index) {
        $(this).css('min-height', 'initial');
        $(this).css('max-height', 'initial');
        $(this).css('height', 'auto');
        $(this).css('overflow', 'auto');
        sindex = $(this).data('idx');
        newheight = getSectionMaxHeight(sindex);
        //fpDebuglog('setSlidesMinHeight ' + newheight);
        $(this).find('.slide').each(function (index) {
            $(this).css('min-height', 'initial');
            $(this).css('max-height', 'initial');
            //$(this).css('height', 'auto');
            $(this).css('overflow', 'auto');
        });
    });
    //$.fn.fullpage.reBuild();
    $('.hasslides').each(function (index) {
        sindex = $(this).data('idx');
        newheight = getSectionMaxHeight(sindex);
        //fpDebuglog('setSlidesMinHeight ' + newheight + ' ' + $(this).height());
        $(this).find('.slide').each(function (index) {
            //$(this).css('min-height', 'initial');
            //$(this).css('max-height', 'initial');
            //$(this).css('overflow', 'initial');
            $(this).css('min-height', newheight + 'px').css('height', newheight + 'px').addClass('slidefixed');
        });
        $(this).css('min-height', newheight + 'px');
    });
}

// Reset min-height horizontal slides
function resetSlidesMinHeight() {
    $('.hasslides').each(function (index) {
        $(this).find('.slide').each(function (index) {
            $(this).css('min-height', '100vh')
            $(this).css('max-height', '100vh')
            $(this).removeClass('slidefixed');
        });
        //$(this).css('min-height', 'initial');
        $(this).css('min-height', '100vh')
        $(this).css('max-height', '100vh')
        $(this).css('overflow', 'hidden');
    });
}

// Srcoll to top of section
function scrollToTopOfSection(sel, index) {
    //fpDebuglog('scrollToTopOfSection section=' + index);
    if (!fpIsResponsive()) return;
    var scrolledTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolledTop != $(sel).offset().top) {
        $('html,body').animate({ scrollTop: $(sel).offset().top }, 300);
        $.fn.fullpage.moveTo(index);
    }
}

// Insert background-videos
function setBackgroundVideos() {
    //fpDebuglog('setBackgroundVideos');
    $('section[data-bgvideo]').each(function () {
        //fpDebuglog('SECTION VIDEO video=' + $(this).data('bgvideo') + ' type=' + $(this).data('videotype'));
        $(this).prepend('<video class="fullpage-bgvideo" autoplay data-autoplay muted loop><source src="' + $(this).data('bgvideo') + '" type="' + $(this).data('videotype') + '"></video>');
    });
    $('.slide[data-bgvideo]').each(function () {
        //fpDebuglog('SLIDE VIDEO video=' + $(this).data('bgvideo') + ' type=' + $(this).data('videotype'));
        $(this).prepend('<video class="fullpage-bgvideo" data-autoplay muted loop><source src="' + $(this).data('bgvideo') + '" type="' + $(this).data('videotype') + '"></video>');
    });
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
    scrollBar: false,

    //scrolling
    css3: false, // bei "fixed" Hintergrundbildern muss dieser Parameter auf false stehen!
    scrollingSpeed: 600,
    autoScrolling: false,
    fitToSection: true,
    fitToSectionDelay: 1000,
    loopBottom: false,
    loopTop: false,
    loopHorizontal: true,
    continuousVertical: false,
    touchSensitivity: 5,
    normalScrollElementTouchThreshold: 5,
    bigSectionsDestination: 'top',

    //Accessibility
    keyboardScrolling: true,
    animateAnchor: true,
    recordHistory: true,

    //design
    controlArrows: false,
    controlArrowColor: '#fff',
    verticalCentered: true,
    paddingTop: 0,
    paddingBottom: 0,
    responsive: 0,
    responsiveWidth: 1200,
    responsiveHeight: 750,

    lazyLoading: true,

    // After rebuild of fullPage
    afterReBuild: function () {
        //fpDebuglog('afterReBuild');
    },

    // Init, hide loader, fadeIn pagewrapper ...
    afterRender: function () {
        //fpDebuglog('afterRender');
        after_render = 1;

        $('.fp-controlArrow').hide(); // horizontele Slide-Arrows ausblenden, werden bei afterLoad eingeblendet

        $('.loader').fadeOut(800); // Loading-Animation ausblenden

        // Für Animation beim 1. Slide ausblenden
        $('.section-idx-1').find('h1').hide();
        $('.section-idx-1').find('.full').hide();

        // pagewrapper einblenden
        $('.pagewrapper').animate({ opacity: 1 }, 600, function () { // Animation complete.
            if (!fpIsResponsive()) {
                $('.mainnav').fadeIn(200); // Show Main Navigation
                $('#fp-nav').fadeIn(200); // Show Navigation-Dots
            }
        });

        // Animation der Bilder in voller Größe
        $('.section').find('.full').addClass('uk-animation-slide-bottom').show();

        // Animation der Headline beim 1. Slide
        $('.section-idx-1').find('h1:nth-child(2)').html($('.section-idx-1').find('h1:nth-child(2)').html() + '<i class="fas fa-registered"></i>');
        $('.section-idx-1').find('h1').addClass('uk-animation-slide-top').show();

        // ausgeblendete Sections auch bei den Navi-Dots ausblenden
        hideNavDots();
    },

    // Switch responsive mode
    afterResponsive: function (isResponsive) {
        //fpDebuglog('afterResponsive');
        if (isResponsive) { // Responsive-Mode
            $('.mainnav').hide();
            $('.hamburger').show();
            setSlidesMinHeight();
        } else { // fullpage-Mode
            $('.hamburger').hide();
            $('.mainnav').show();
            resetSlidesMinHeight();
        }
    },

    // After resize page
    afterResize: function () {
        //fpDebuglog('afterResize');
        //$.fn.fullpage.reBuild();
        if (fpIsResponsive()) {
            setSlidesMinHeight();
        } else {
            resetSlidesMinHeight();
        }
    },

    // After loading slide
    afterLoad: function (anchorLink, index) {
        //fpDebuglog('afterLoad index=' + index);

        // Horizontale Slide-Arrows einblenden
        $('.section-idx-' + active_section).find('.fp-controlArrow').hide();
        $('.section-idx-' + index).find('.fp-controlArrow').show();
        $('.section-idx-' + index).find('.fp-prev').show().addClass('uk-animation-slide-bottom');
        $('.section-idx-' + index).find('.fp-next').show().addClass('uk-animation-slide-bottom');

        // Up/Down Arrows einblenden
        $('.section-idx-' + active_section).find('.arrowcontainer').addClass('uk-disabled').animate({ opacity: 0 }, 100, function () { });
        $('.section-idx-' + index).find('.arrowcontainer').removeClass('uk-disabled').animate({ opacity: 1 }, 200, function () { });

        active_section = index;
        active_section_id = anchorLink;
        link_clicked = 0;
        after_render = 0;

        if (fpIsResponsive()) {
            setSlidesMinHeight();
        } else {
            resetSlidesMinHeight();
        }
    },

    // Leaving slide
    onLeave: function (index, nextIndex, direction) {
        //fpDebuglog('onLeave index=' + index);

        // Horizontale Slide-Arrows ausblenden
        $('.section-idx-' + index).find('.fp-controlArrow').hide();
        // Up/Down Arrows ausblenden
        $('.section-idx-' + index).find('.arrowcontainer').addClass('uk-disabled').animate({ opacity: 0 }, 100, function () { });
    },

    // After loading horizontal slide
    afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
        //fpDebuglog('afterSlideLoad index=' + index + ' slideIndex=' + slideIndex);

        active_section = index;
        active_section_id = anchorLink;
        active_slide = slideIndex;
        active_slide_id = slideAnchor;
    },

    // leaving horizontal slide
    onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {
        //fpDebuglog('onSlideLeave index=' + index + ' slideIndex=' + slideIndex);
    }

};

// Extend options mit Addon-Einstellungen
jQuery.extend(fps_settings, fps_options);

var active_section = 1;
var active_section_id = '';
var active_slide = 0;
var active_slide_id = '';
var link_clicked = 0;
var after_render = 0;

$(document).ready(function () {

    // Hintergrundvideos einfügen
    setBackgroundVideos();

    // Initiate fullpage.js - https://alvarotrigo.com/fullPage/
    $('.fullpage').fullpage(fps_settings);

    // Window Resize - Navigation aus/einblenden
    $(window).on('resize', function () {
        if ($('.hamburger').is(':visible')) {
            $('.mainnav').hide();
            $('.hamburger').removeClass('is-active');
        } else {
            $('.mainnav').fadeIn(300);
        }
    });

    // Logo-Click zum 1. Slide
    $('.pagelogo img').click(function (e) {
        link_clicked = 1;
        e.preventDefault();
        document.activeElement.blur();
        if ($('.hamburger').hasClass('is-active') === true) {
            $('.hamburger').trigger('click');
        }
        $.fn.fullpage.moveTo(1);
        $('html, body').animate({ scrollTop: 0 }, 400);
    });

    // Klick auf Navigation, bei mobiler Navigation ausblenden
    $('.mainnav').find('a').click(function () {
        link_clicked = 1;
        if ($('.hamburger').hasClass('is-active') === true) {
            $('.hamburger').trigger('click');
        }
        if ($(this).parent().hasClass('active')) {
            scrollToTopOfSection('.section-' + $(this).data('sectionid'), $(this).data('sectionid'));
        }
    });
    // bei Klick auf Navi-Balken Navi ausblenden
    $('.pagelogo').click(function () {
        if (fpIsResponsive()) {
            $('.main-navigation').removeClass('scroll-up').addClass('scroll-down');
            if ($('.hamburger').hasClass('is-active') === true) {
                $('.hamburger').trigger('click');
            }
        }
    });

    // Im responsive-Modus bei Klick am oberen Rand (50px) Navi-einblenden
    $('body, div.fp-tableCell').click(function (e) {
        if (fpIsResponsive() && $(e.target).hasClass('fp-tableCell')) {
            e.preventDefault();
            if (e.clientY <= 50) {
                $('.main-navigation').removeClass('scroll-down').addClass('scroll-up');
            }
        }
    });

    // Navigation-Dot Click
    $('#fp-nav a').click(function (e) {
        link_clicked = 1;
        if ($(this).hasClass('active')) {
            scrollToTopOfSection('.section-idx-' + active_section, active_section);
        }
    });

    // Scroll Indicator Click
    $('a.arrowdown').click(function (e) {
        link_clicked = 1;
        e.preventDefault();
        if ($('.hamburger').hasClass('is-active') === true) {
            $('.hamburger').trigger('click');
        }
        $.fn.fullpage.moveSectionDown();
    });
    $('a.arrowup').click(function (e) {
        link_clicked = 1;
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

    // back to top arrow
    var backToTopOffset = 250;
    var backToTopDuration = 300;
    $('.pagewrapper').append('<a href="#" class="back-to-top"><i class="fa fa-arrow-circle-up"></i><span>Top</span></a>');
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

    // Initiate glightbox - https://biati-digital.github.io/glightbox/
    $.getScript('./assets/addons/demo_fullpage/themes/coffee/js/glightbox.min.js', function () {
        // Bildergalerie
        const gallerylightbox = GLightbox({
            selector: '.gallery',
            openEffect: 'zoom',
            closeEffect: 'zoom',
            loop: false
        });
        gallerylightbox.on('open', function () {
            $.fn.fullpage.setAllowScrolling(false);
            $.fn.fullpage.setKeyboardScrolling(false);
            if ($('.hamburger').hasClass('is-active') === true) {
                $('.hamburger').trigger('click');
            }
        });
        gallerylightbox.on('close', function () {
            $.fn.fullpage.setAllowScrolling(true);
            $.fn.fullpage.setKeyboardScrolling(true);
        });
        // Externer Content
        const contentlightbox = GLightbox({
            selector: '.lightboxcontent',
            openEffect: 'zoom',
            width: 'calc(100vw - 60px)',
            height: 'calc(100vh - 60px)',
            closeEffect: 'zoom',
            loop: false
        });
        contentlightbox.on('open', function () {
            $.fn.fullpage.setAllowScrolling(false);
            $.fn.fullpage.setKeyboardScrolling(false);
            if ($('.hamburger').hasClass('is-active') === true) {
                $('.hamburger').trigger('click');
            }
        });
        contentlightbox.on('close', function () {
            $.fn.fullpage.setAllowScrolling(true);
            $.fn.fullpage.setKeyboardScrolling(true);
        });
    });

});

/* Show/Hide Navigation-Bar on scrolling */

const nav = document.querySelector('nav');
const supportPageOffset = window.pageXOffset !== undefined;
const isCSS1Compat = (document.compatMode || '') === 'CSS1Compat';

let previousScrollPosition = 0;

const isScrollingDown = function () {
    let scrolledPosition = supportPageOffset
        ? window.pageYOffset
        : isCSS1Compat
            ? document.documentElement.scrollTop
            : document.body.scrollTop;
    let isScrollDown;

    if (scrolledPosition > previousScrollPosition) {
        isScrollDown = true;
    } else {
        isScrollDown = false;
    }
    previousScrollPosition = scrolledPosition;
    return isScrollDown;
};

const handleNavScroll = function () {
    if (isScrollingDown() && !nav.contains(document.activeElement)) {
        nav.classList.add('scroll-down');
        nav.classList.remove('scroll-up');
        if ($('.hamburger').hasClass('is-active') === true) {
            $('.mainnav').hide();
            $('.hamburger').trigger('click');
        }
    } else {
        nav.classList.add('scroll-up');
        nav.classList.remove('scroll-down');
    }
};

var throttleTimer;

const throttle = function (callback, time) {
    if (throttleTimer) return;

    throttleTimer = true;
    setTimeout(function () {
        callback();
        throttleTimer = false;
    }, time);
};

const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

window.addEventListener('scroll', function () {
    if (mediaQuery && !mediaQuery.matches) {
        throttle(handleNavScroll, 100);
    }
});
