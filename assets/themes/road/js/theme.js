$.fn.extend({
	animateCss: function (animationName) {
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		this.addClass('animated ' + animationName).one(animationEnd, function() {
			$(this).removeClass('animated ' + animationName);
		});
		return this;
	}
});

/* Options and Callbacks for fullpage.js */
var fps_settings = {
	scrollBar: false,
	scrollingSpeed: 600,
	css3: true,
	menu: '.mainnav',
	verticalCentered: false,
	recordHistory: false,
	autoScrolling: false,
	fitToSection: false,
	responsiveWidth: 1000,
	paddingTop: '0px',
	navigation: false,
	navigationPosition: 'right',
	showActiveTooltip: false,

	controlArrows: false,
	slidesNavigation: false,
	slidesNavPosition: 'bottom',
	loopHorizontal: false,
	bigSectionsDestination: 'top',

	lazyLoading: true,

	// Init, hide loader fadein pagewrapper ...
	afterRender: function(){
		$('.loader').fadeOut(700);
		$('.pagewrapper').animate({opacity: 1}, 600);
		if ($('.hamburger').is(':visible')) {
			$('.mainnav').hide();
		} else {
			$('.mainnav').fadeIn(600);
		}
		$('#fp-nav').fadeIn(600);
		viewportheight = window.innerHeight;
		$('section').css('min-height', viewportheight);
		$('.section-1 h1:not(.noanim)').animateCss('zoomIn');
		$('.section-1 img.full').animateCss('slideInUp');
	},
	// After loading slide
	afterLoad: function(anchorLink, index){
		active_slide = index;
	},
	// leaving slide
	onLeave: function(index, nextIndex, direction){
		$('a.arrowdown-' + index).hide();
		$('a.arrowdown-' + nextIndex).show();
		// Animations
		$('.section-'+nextIndex+' h1:not(.noanim)').animateCss('zoomIn');
		$('.section-'+nextIndex+' .gallery-item:not(.noanim)').animateCss('slideInUp').addClass('noanim');
		$('.section-'+nextIndex+' .col-sm-4:not(.noanim)').animateCss('slideInUp').addClass('noanim');
		$('.section-'+nextIndex+' .col-sm-6:not(.noanim)').animateCss('slideInUp').addClass('noanim');
	},
	// Switch responsive mode
	afterResponsive: function(isResponsive){
		if (isResponsive) {
			$('.mainnav').hide();
			$('.mainnav').show().animate({'left':'-240px'}, 200);
			$('.hamburger').show();
			$('section:not(.fp-auto-height)').addClass('rem-fp-auto-height').addClass('fp-auto-height');
		} else {
			$('.mainnav').show();
			$('.mainnav').show().animate({'left':'0px'}, 200);
			$('.hamburger').hide();
			$('section.rem-fp-auto-height').removeClass('fp-auto-height').removeClass('rem-fp-auto-height');
		}
	},
	// After resize page
	afterResize: function(){
		viewportheight = window.innerHeight;
		$('section').css('min-height', viewportheight);
	}
};

// Extend options mit Addon-Einstellungen
jQuery.extend(fps_settings, fps_options);

var active_slide = 1;

$(document).ready(function(){
	
	// Initiate fullpage.js - https://alvarotrigo.com/fullPage/
	$('.fullpage').fullpage(fps_settings);

	// Window Resize - Navigation aus/einblenden
	$(window).on('resize', function(){
		if ($('.hamburger').is(':visible')) {
			$('.mainnav').hide();
			$('.hamburger').removeClass('is-active');
		} else {
			$('.mainnav').fadeIn(300);
		}
	});

	// Logo click zum 1. Slide
	$('.pagelogo').click(function(){
		if ($('.hamburger').hasClass('is-active') === true) {
			$('.hamburger').trigger('click');
		}		
		$.fn.fullpage.moveTo(1);
	});

	// Klick auf Navigation, bei mobiler Navi Navigation ausblenden
	$('.mainnav').find('a').click(function(){
		if ($('.hamburger').hasClass('is-active') === true) {
			$('.hamburger').trigger('click');
		}
	});
	
	// Scroll Indicator Click
	$('a.arrowdown').click(function(e){
		e.preventDefault();
		$.fn.fullpage.moveSectionDown();
		if ($('.hamburger').hasClass('is-active') === true) {
			$('.hamburger').trigger('click');
		}
	});

	// externe links in neuem Fenster öffnen
	$(".container a[href^='http://']").addClass('extern');
	$(".container a[href^='https://']").addClass('extern');
	$('a.extern, a.newwindow').click(function(e){
		window.open($(this).attr('href'));
		e.preventDefault();
	});

	// Initiate lightcase - http://cornel.bopp-art.com/lightcase/
	$.getScript('./assets/addons/demo_fullpage/themes/road/js/jquery.events.touch.js', function() {
		$.getScript('./assets/addons/demo_fullpage/themes/road/js/lightcase.js', function() {
			$('.gallery').lightcase({
				fullscreenModeForMobile: true,
				slideshow: true,
				swipe: true,
				maxWidth: 1600,
				maxHeight: 1600,
				navigateEndless: false,
				onStart: {
					bar: function() {
						if ($('.hamburger').hasClass('is-active') === true) {
							$('.hamburger').trigger('click');
						}
					}
				}
			});
		});
	});

	// back to top arrow
	var backToTopOffset = 250;
	var backToTopDuration = 300;
	$('.pagewrapper').append('<a href="#" class="back-to-top"><i class="fa fa-arrow-circle-up"></i></a>');
		$(window).scroll(function(){
			if ($(this).scrollTop() > backToTopOffset) {
				$('.back-to-top').fadeIn(backToTopDuration);
		} else {
			$('.back-to-top').fadeOut(backToTopDuration);
		}
	});
	$('.back-to-top').click(function(e){
		e.preventDefault();
		if ($('.hamburger').hasClass('is-active') === true) {
			$('.hamburger').trigger('click');
		}		
		$.fn.fullpage.moveTo(1);
	});

	// Hambuger Menu
	$('.hamburger').addClass('hamburger--3dxy');
	$('.hamburger').on('click', function(e) {
		e.preventDefault();
		if ($(this).hasClass('is-active') === true) {
			$('.mainnav').animate({'left':'-240px'}, 200);
		} else {
			$('.mainnav').show().animate({'left':'0px'}, 200);
		}	
		$(this).toggleClass('is-active');
	});

});
