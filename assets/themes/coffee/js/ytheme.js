/* Helper Functions */
function fpDebuglog(msg) {
    console.log(msg + ' fpIsResponsive=' + fpIsResponsive() + ' active_section=' + active_section + ' viewportheight=' + viewport().height);
}

function fpIsResponsive() {
    return $('body').hasClass('fp-responsive');
}

function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width: e[a + 'Width'], height: e[a + 'Height'] };
}
function setSlideSectionsMinHeight() {
    $('.hasslides').each(function (index) {
        $(this).css('min-height', viewport().height + 'px');
    });
}

function setSectioHeight() {
    return;
    $('section').css('min-height', 'auto');
    $('section').css('height', viewport().height + 'px');
    $('section.hasslides').find('.slide').css('height', viewport().height + 'px')
}

function setSectionMinHeight() {
    return;
    $('section').css('min-height', viewport().height + 'px');
    //$('.section').css('max-height', 'auto');
    $('section').css('height', 'auto');
}

function setSlidesMinHeight() {

    //if ($('.fullpage').hasClass('autoscroll')) return;
    $('.hasslides').each(function (index) {
        newheight = getSectionMaxHeight($(this).data('idx'));
        fpDebuglog('setSlidesMinHeight ' + newheight);
        //$(this).css('min-height', newheight + 'px').css('height', newheight + 'px');
        if (newheight > $(this).height()) {
            $(this).addClass('alignslidestop');
        } else {
            $(this).removeClass('alignslidestop');
        }
        $(this).css('min-height', 'auto');
        $(this).css('height', 'auto');
        $(this).css('min-height', newheight + 'px');
        $(this).find('.slide').each(function (index) {
            //$(this).css('min-height', newheight + 'px').css('height', newheight + 'px').addClass('slidefixed');
            $(this).css('min-height', 'auto');
            $(this).css('height', 'auto').addClass('slidefixed');
            $(this).css('min-height', newheight + 'px');
        });
    });
}

function getSectionMaxHeight(index) {
    smaxh = $('.section-idx-' + index).height();
    $('.section-idx-' + index).find('.slide').each(function (index) {
        if ($(this).height() > smaxh) {
            smaxh = $(this).height();
        }
    });
    return smaxh;
}

function scrollToTopOfSection(sel, index) {
    return;
    //if (!fpIsResponsive()) return;
    fpDebuglog('scrollToTopOfSection active_section=' + active_section);
    var scrolledTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolledTop != $(sel).offset().top) {
        $('html,body').animate({ scrollTop: $(sel).offset().top }, 300);
        $.fn.fullpage.moveTo(index);
    }
}

function setBackgroundVideos() {
    fpDebuglog('setBackgroundVideos active_section=' + active_section);

    $('section[data-bgvideo]').each(function () {
        fpDebuglog('SECTION VIDEO ' + $(this).data('bgvideo') + ' ' + $(this).data('videotype'));
        $(this).prepend('<video class="fullpage-bgvideo" autoplay data-autoplay muted loop><source src="' + $(this).data('bgvideo') + '" type="' + $(this).data('videotype') + '"></video>');
        //.find('.fp-tableCell')
    });
    $('.slide[data-bgvideo]').each(function () {
        fpDebuglog('SLIDE VIDEO ' + $(this).data('bgvideo') + ' ' + $(this).data('videotype'));
        $(this).prepend('<video class="fullpage-bgvideo" data-autoplay muted loop><source src="' + $(this).data('bgvideo') + '" type="' + $(this).data('videotype') + '"></video>');
    });
}

function playBackgroundVideo(index) {
    return;
    fpDebuglog('playBackgroundVideo');
    $('section.active').each(function () {
        $(this).find('.fullpage-bgvideo').each(function () {
            newheight = getSectionMaxHeight($(this).data('idx'));
            $(this).css('height', newheight + 'px');
            var element = $(this).get(0);
            if (element.hasAttribute('data-autoplay') && typeof element.play === 'function') {
                element.play();
            }
        });
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
        fpDebuglog('afterReBuild');
        //$.fn.fullpage.moveTo(active_section);

    },

    // Init, hide loader, fadeIn pagewrapper ...
    afterRender: function () {
        fpDebuglog('afterRender');
        after_render = 1;

        $('.fp-controlArrow').hide(); // horizontele Slide-Arrows ausblenden, werden bei afterLoad eingeblendet

        $('.loader').fadeOut(800); // Loading-Animation ausblenden

        // pagewrapper einblenden
        $('.pagewrapper').animate({ opacity: 1 }, 600, function () { // Animation complete.
            if (!fpIsResponsive()) {
                $('.mainnav').fadeIn(200); // Show Main Navigation
                $('#fp-nav').fadeIn(200); // Show Navigation-Dots
            }
        });
        setSlideSectionsMinHeight();
        setSlidesMinHeight();
        // Hintergrundvideos einfügen
        setBackgroundVideos();
    },

    // Switch responsive mode
    afterResponsive: function (isResponsive) {
        fpDebuglog('afterResponsive');

        if (isResponsive) { // Responsive-Mode
            $('.mainnav').hide();
            $('.hamburger').show();
            //setSectionMinHeight();
            //setSlidesMinHeight();
        } else { // fullpage-Mode
            $('.hamburger').hide();
            $('.mainnav').show();
        }

    },

    // After resize page
    afterResize: function () {
        fpDebuglog('afterResize');
        //$.fn.fullpage.reBuild();
        //$('.uk-container').trigger("resize");
        if (fpIsResponsive()) {
            //setSectionMinHeight();
            //setSlidesMinHeight();
        } else {
            //setSectionHeight(viewport().height);
        }
        //$.fn.fullpage.silentMoveTo(active_section_id, active_slide);
        //$('.fullpage-bgvideo').remove();
        //setBackgroundVideos();
        //playBackgroundVideo();
    },

    // After loading slide
    afterLoad: function (anchorLink, index) {
        fpDebuglog('afterLoad index=' + index);
        active_section = index;
        active_section_id = anchorLink;

        link_clicked = 0;
        after_render = 0;

        // Horizontale Slide-Arrows einblenden
        $('.section-idx-' + index).find('.fp-controlArrow').show();

        // Up/Down Arrows einblenden
        $('.section-idx-' + index).find('.arrowcontainer').removeClass('uk-disabled').animate({ opacity: 1 }, 100, function () { });

        // Fix für Scrolling bei nicht fullPage-Sections, hier wird evtl. nicht zum korrekten Start gescrolled
        if ($('.section-idx-' + index).hasClass('fp-auto-height')) {
            scrollToTopOfSection('.section-idx-' + index, index);
        }

        $('.section-idx-' + index).find('.full').addClass('uk-animation-fade').addClass('uk-animation-scale-up');

        // horizontale Slides alle auf gleiche Höhe
        //setSlidesMinHeight(active_section, getSectionMaxHeight(active_section));
        //setSlidesMinHeight();

        //setSectionMinHeight();
        //setSlidesMinHeight();
        //playBackgroundVideo();
    },

    // Leaving slide
    onLeave: function (index, nextIndex, direction) {
        fpDebuglog('onLeave index=' + index);
        // Horizontale Slide-Arrows ausblenden
        $('.section-idx-' + index).find('.fp-controlArrow').hide();
        // Up/Down Arrows ausblenden
        $('.section-idx-' + index).find('.arrowcontainer').addClass('uk-disabled').animate({ opacity: 0 }, 100, function () { });
    },

    // After loading horizontal slide
    afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
        fpDebuglog('afterSlideLoad index=' + index + ' slideIndex=' + slideIndex);
        active_section = index;
        active_section_id = anchorLink;
        active_slide = slideIndex;
        active_slide_id = slideAnchor;
        //setSlidesMinHeight(active_section, getSectionMaxHeight(active_section));
        //setSlidesMinHeight();
        //playBackgroundVideo();
    },
    // leaving horizontal slide
    onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {
        fpDebuglog('onSlideLeave index=' + index + ' slideIndex=' + slideIndex);
        //setSlidesMinHeight(active_section, getSectionMaxHeight(active_section));
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

    // Logo - click zum 1. Slide
    $('.pagelogo img').click(function (e) {
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
        if ($('.hamburger').hasClass('is-active') === true) {
            $('.hamburger').trigger('click');
        }
        link_clicked = 1;
        if ($(this).parent().hasClass('active')) {
            scrollToTopOfSection('.section-' + $(this).data('sectionid'), $(this).data('sectionid'));
        }
    });
    // bei Klick auf Navi-Balken Bavi ausblenden
    $('.pagelogo').click(function () {
        if (fpIsResponsive()) {
            $('.main-navigation').removeClass('scroll-up').addClass('scroll-down');
            if ($('.hamburger').hasClass('is-active') === true) {
                $('.hamburger').trigger('click');
            }
        }
    });
    // Im responsive-Modus bei Klick am oberen Rand (50px) Navi-einblenden
    $('div.fp-tableCell').click(function (e) {
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
        e.preventDefault();
        if ($('.hamburger').hasClass('is-active') === true) {
            $('.hamburger').trigger('click');
        }
        link_clicked = 1;
        $.fn.fullpage.moveSectionDown();
    });
    $('a.arrowup').click(function (e) {
        e.preventDefault();
        if ($('.hamburger').hasClass('is-active') === true) {
            $('.hamburger').trigger('click');
        }
        link_clicked = 1;
        $.fn.fullpage.moveSectionUp();
    });

    // externe links in neuem Fenster öffnen
    $(".uk-container a[href^='http://']").addClass('extern');
    $(".uk-container a[href^='https://']").addClass('extern');
    $('a.extern, a.newwindow').click(function (e) {
        e.preventDefault();
        window.open($(this).attr('href'));
    });
    $('a.extern').each(function (e) {
        $(this).html('<i class="fas fa-external-link-alt"></i>' + $(this).html());
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
