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

// Fix horizontal Slides
function fpFixSlides() {
    $('.fullpage-slidebackground').css('width', 'calc(100vw - ' + fpScrollbarWidth() + 'px)');
    $('section.hasslides').each(function () {
        $(this).find('.slidefixed').removeClass('slidefixed');
        if (fpIsResponsive()) {
            if ($(this).height() > viewport().height) {
                // Fix für Hintergrundvideos und Hintergrundbilder
                $(this).find('.fullpage-bgvideo').css('width', 'calc(100vw - ' + fpScrollbarWidth() + 'px)');
                $(this).find('.fullpage-slidebackground').css('width', 'calc(100vw - ' + fpScrollbarWidth() + 'px)');
                // Fix vertical align top
                $(this).find('.slide').each(function () {
                    $(this).find('.fp-tableCell').addClass('slidefixed');
                });
                // Fix für Navi-Dots top
                $(this).find('.fp-slidesNav').addClass('slidefixed');
            } else {
                // Fix für Hintergrundvideos und Hintergrundbilder
                $(this).find('.fullpage-bgvideo').css('width', 'calc(100vw - ' + fpScrollbarWidth() + 'px)');
                $(this).find('.fullpage-slidebackground').css('width', 'calc(100vw - ' + fpScrollbarWidth() + 'px)');
            }
        } else {
            // Fix für Hintergrundvideos und Hintergrundbilder
            if (fps_options.scrollBar || !fps_options.autoScrolling) {
                $('.fullpage-bgvideo').css('width', 'calc(100vw - ' + fpScrollbarWidth() + 'px)');
                $('.fullpage-slidebackground').css('width', 'calc(100vw - ' + fpScrollbarWidth() + 'px)');
            } else {
                $('.fullpage-bgvideo').css('width', '100vw');
                $('.fullpage-slidebackground').css('width', '100vw');
            }
        }
    });
}

// Show horizontal Arrows
function fpShowArrows(index) {
    $('.fp-controlArrow-' + index).show().addClass('uk-animation-scale-up');
}

// Hide horizontal Arrows
function fpHideArrows() {
    $('.fp-controlArrow').hide();
}

// Fix Navigation - Main/Hamburger
function fpFixNavigation() {
    if (fpIsResponsive()) {
        $('.mainnav').hide().removeClass('uk-animation-slide-left').css({ top: "-600px", left: "0px", width: "100%", display: "block" });
        $('.hamburger').removeClass('is-active');
        $('.hamburger').fadeIn(300);
    } else {
        $('.hamburger').hide();
        $('.mainnav').css({ top: "115px", left: "0px", width: "200px" }).fadeIn(300);
        $('section').removeClass('blurry');
    }
}

// Initiate glightbox - https://biati-digital.github.io/glightbox/
function fpUseGlightbox() {
    $.getScript('assets/addons/demo_fullpage/js/glightbox.min.js', function () {
        if (gallerylightbox) gallerylightbox.destroy();
        if (contentlightbox) contentlightbox.destroy();

        // Bildergalerie
        gallerylightbox = GLightbox({
            selector: '.gallery',
            openEffect: 'zoom',
            closeEffect: 'zoom',
            plyr: {
                css: 'assets/addons/demo_fullpage/css/plyr.css',
                js: 'assets/addons/demo_fullpage/js/plyr.js',
                config: {
                    ratio: '16:9',
                    fullscreen: {
                        enabled: true,
                        iosNative: true
                    },
                    youtube: {
                        noCookie: true,
                        rel: 0,
                        showinfo: 0,
                        iv_load_policy: 3
                    },
                    vimeo: {
                        byline: false,
                        portrait: false,
                        title: false,
                        speed: true,
                        transparent: false
                    }
                }
            },
            videosWidth: '1200px',
            loop: false
        });
        gallerylightbox.on('open', function () {
            $.fn.fullpage.setAllowScrolling(false, 'up, down');
            $.fn.fullpage.setKeyboardScrolling(false, 'up, down, left, right');
            if ($('.hamburger').hasClass('is-active') === true) {
                $('.hamburger').trigger('click');
            }
        });
        gallerylightbox.on('close', function () {
            $.fn.fullpage.setAllowScrolling(true);
            $.fn.fullpage.setKeyboardScrolling(true);
        });

        // Interner/Externer Content
        contentlightbox = GLightbox({
            selector: '.lightboxcontent',
            openEffect: 'zoom',
            closeEffect: 'zoom',
            plyr: {
                css: 'assets/addons/demo_fullpage/css/plyr.css',
                js: 'assets/addons/demo_fullpage/js/plyr.js',
                config: {
                    ratio: '16:9',
                    fullscreen: {
                        enabled: true,
                        iosNative: true
                    },
                    youtube: {
                        noCookie: true,
                        rel: 0,
                        showinfo: 0,
                        iv_load_policy: 3
                    },
                    vimeo: {
                        byline: false,
                        portrait: false,
                        title: false,
                        speed: true,
                        transparent: false
                    }
                }
            },
            videosWidth: '1200px',
            loop: false
        });
        contentlightbox.on('open', function () {
            $.fn.fullpage.setAllowScrolling(false, 'up, down');
            $.fn.fullpage.setKeyboardScrolling(false, 'up, down, left, right');
            if ($('.hamburger').hasClass('is-active') === true) {
                $('.hamburger').trigger('click');
            }
        });
        contentlightbox.on('close', function () {
            $.fn.fullpage.setAllowScrolling(true);
            $.fn.fullpage.setKeyboardScrolling(true);
        });

    });
}

// Fix horizontal Slide-ControlArrows - appendTo 'body' wg. css3 Transform
function fpFixControlArrows() {
    $('section.hasslides').each(function () {
        index = $(this).data('idx');
        slidemode = index % 2;
        if (slidemode == 1) {
            arrowclass = 'dark';
        } else {
            arrowclass = '';
        }
        $(this).find('.fp-controlArrow').css('position', 'fixed').addClass('fp-controlArrow-' + index).addClass(arrowclass).appendTo('body');
        $('.fp-controlArrow.fp-prev').click(function (e) {
            $.fn.fullpage.moveSlideLeft();
        });
        $('.fp-controlArrow.fp-next').click(function (e) {
            $.fn.fullpage.moveSlideRight();
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
    continuousVertical: true,
    touchSensitivity: 15,
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
    responsiveWidth: 1050,
    responsiveHeight: 600,

    lazyLoading: true,

    // After rebuild of fullPage
    afterReBuild: function () {
    },

    // Init, hide loader, fadeIn pagewrapper ...
    afterRender: function () {
        after_render = 1;

        fpHideArrows(); // horizontele Slide-Arrows ausblenden, werden bei afterLoad eingeblendet
        fpFixControlArrows(); // Fix horizontal Slide-ControlArrows

        $('.loader').fadeOut(600); // Loading-Animation ausblenden

        // ausgeblendete Sections auch bei den Navi-Dots ausblenden
        fpHideNaviDots();

        // Logo, Navi, Headline und Image für Animation beim 1. Slide ausblenden
        $('.pagelogo').hide();
        $('.mainnav').hide();
        $('.section-idx-1').find('h1').hide();
        $('.section-idx-1').find('.uk-container').hide();

        // pagewrapper einblenden
        $('.pagewrapper').animate({ opacity: 1 }, 400, function () { // Animation complete.
            if (!fpIsResponsive()) {
                $('.mainnav').addClass('uk-animation-slide-left').fadeIn(300);
                $('#fp-nav').addClass('uk-animation-slide-right').fadeIn(300); // Navigation-Dots einblenden
            } else {
                $('.hamburger').fadeIn(300);
            }
            // Logo einblenden
            $('.pagelogo').addClass('uk-animation-slide-top').show(222);
            // Animation der Headline beim 1. Slide
            $('.section-idx-1').find('h1:nth-child(2)').html($('.section-idx-1').find('h1:nth-child(2)').html() + '<i class="fas fa-registered"></i>');
            $('.section-idx-1').find('h1').addClass('uk-animation-slide-bottom').show();
            // Animation Image beim 1. Slide
            $('.section-idx-1').find('.uk-container').addClass('uk-animation-slide-bottom').show();
            // Animation Styleswitch + Imprint-Links
            $('ul.styleswitch').addClass('uk-animation-slide-bottom').show();
            $('ul.imprint').addClass('uk-animation-slide-bottom').show();
            // Animation TRex
            $('div.for').animate({ opacity: .5 }, 1000, function () { });
        });

        fpSetHorizontalDotTitles();
    },

    // Switch responsive mode
    afterResponsive: function (isResponsive) {
        fpFixNavigation();
        fpFixSlides();
        $.fn.fullpage.moveTo(active_section, active_slide);
    },

    // After resize page
    afterResize: function () {
        fpresizing = false;
        fpFixNavigation();
        fpFixSlides();
        $.fn.fullpage.moveTo(active_section, active_slide);
    },

    // After loading slide
    afterLoad: function (anchorLink, index) {
        if (!fpresizing) {
            active_section = index;
            active_section_id = anchorLink;
            fpFixSlides();
        }

        // remove animation-class
        $('.uk-container').removeClass('uk-animation-slide-bottom');

        // Horizontale Slide-Arrows einblenden
        fpShowArrows(index);
    },

    // Leaving slide
    onLeave: function (index, nextIndex, direction) {
        fpHideArrows(); // horizontele Slide-Arrows ausblenden, werden bei afterLoad eingeblendet

        // Container animieren
        if (!fpIsResponsive()) {
            setTimeout(function () {
                $('.section-idx-' + nextIndex).find('.uk-container').addClass('uk-animation-slide-bottom');
            }, 50);
        }
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

    // Logo-Click zum 1. Slide
    $('.pagelogo').click(function (e) {
        e.preventDefault();
        document.activeElement.blur();
        $.fn.fullpage.moveTo(1);
        $('section').removeClass('blurry');
        $('html, body').animate({ scrollTop: 0 }, 400);
        if ($('.hamburger').hasClass('is-active') === true) {
            $('.hamburger').trigger('click');
        }
    });

    // Klick auf Navigation, bei mobiler Navi Navigation ausblenden
    $('.mainnav').find('a').click(function () {
        if ($('.hamburger').hasClass('is-active') === true) {
            $('.hamburger').trigger('click');
        }
        if ($(this).parent().hasClass('active')) {
            fpScrollToTopOfSection('.section-' + $(this).data('sectionid'), $(this).data('sectionid'));
        }
    });

    // Hambuger Menu
    $('.hamburger').addClass('hamburger--3dxy');
    $('.hamburger').on('click', function (e) {
        e.preventDefault();
        document.activeElement.blur();
        if ($(this).hasClass('is-active') === true) {
            $('.mainnav').animate({ 'top': '-600px' }, 300);
            $('section').removeClass('blurry');
        } else {
            $('.mainnav').show().animate({ 'top': '0px' }, 300);
            $('section').addClass('blurry');
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
        document.activeElement.blur();
        if ($('.hamburger').hasClass('is-active') === true) {
            $('.hamburger').trigger('click');
        }
        $.fn.fullpage.moveTo(1);
        $('html, body').animate({ scrollTop: 0 }, 400);
    });

});

// Load Background-Images, set Background, set Background-Video
// Preload Images
// Use plyr + glightbox
window.addEventListener('DOMContentLoaded', function (event) {
    setTimeout(function () {
        fpSetBackgrounds();
        fpUseGlightbox();
    }, 200);
    setTimeout(function () {
        fpUsePlyr();
    }, 200);
    setTimeout(function () {
        fpPreloadImages();
        fpUseGlightbox();
    }, 700);
});
