/* Options and Callbacks for fullpage.js */
var fps_settings = {
	scrollBar: false,
	scrollingSpeed: 500,
	css3: true,
	menu: '.mainnav',
	verticalCentered: true,
	recordHistory: true,
	autoScrolling: false,
	fitToSection: false,
	responsiveWidth: 1100,
	paddingTop: '50px',
	navigation: false,
	navigationPosition: 'right',
	showActiveTooltip: false,

	controlArrows: false,
	slidesNavigation: false,
	slidesNavPosition: 'bottom',

	lazyLoading: true,

	afterRender: function(){
		$('.loader').fadeOut(700);
		$('.pagewrapper').fadeIn(600);
		if ($('.c-hamburger').is(':visible')) {
			$('.mainnav').hide();
		} else {
			$('.mainnav').fadeIn(600);
		}
		$('#fp-nav').fadeIn(600);
	},
	afterLoad: function(anchorLink, index){
		if (index == 1) {
			$('a.arrowdown').show();
		}
	},
	onLeave: function(index, nextIndex, direction){
		if (index == 1) {
			//$('a.arrowdown').hide();
		}
	},
	afterResize: function(){
	}
};

// Extend options
jQuery.extend(fps_settings, fps_options);

$(document).ready(function(){

	// Move Scroll Indicator to Slide
	//$('a.arrowdown').parent().parent().append($('a.arrowdown'));
	$('a.arrowdown').click(function(){
		$.fn.fullpage.moveSectionDown();
	});

	// Logo click zum 1. Slide
	$('.pagelogo').click(function(){
		if ($('.c-hamburger').is(':visible') && $('.mainnav').is(':visible')) {
			$( ".c-hamburger" ).trigger('click');
		}		
		$.fn.fullpage.moveTo(1);
	});
	
	// Window Resize - Navigation aus/einblenden
	$(window).on('resize', function(){
		if ($('.c-hamburger').is(':visible')) {
			$('.mainnav').hide();
		} else {
			$('.mainnav').fadeIn(600);
		}
	});
	
	// Klick auf Navigation, bei mobiler Navi Navigation ausblenden
	$('.mainnav').find('a').click(function(){
		if ($('.c-hamburger').is(':visible')) {
			$( ".c-hamburger" ).trigger('click');
		}
	});

	// externe links in neuem Fenster öffnen
	$(".container a[href^='http://']").addClass('extern');
	$(".container a[href^='https://']").addClass('extern');
	$('a.extern, a.newwindow').click(function(){
		window.open($(this).attr('href'));
		return false;
	});
	
	// Initiate fullpage.js - https://alvarotrigo.com/fullPage/
	$('.fullpage').fullpage(fps_settings);
	
	// Initiate swipebox - http://brutaldesign.github.io/swipebox/
	$('.gallery').swipebox();

});

/* Hamburger menu */
/* http://callmenick.com/post/animating-css-only-hamburger-menu-icons */
(function(){
	'use strict';
	var toggles = document.querySelectorAll('.c-hamburger');

	for (var i = toggles.length - 1; i >= 0; i--) {
		var toggle = toggles[i];
		toggleHandler(toggle);
	};

	function toggleHandler(toggle) {
		toggle.addEventListener('click', function(e){
			e.preventDefault();
			if (this.classList.contains('is-active') === true) {
				this.classList.remove('is-active');
				$('.mainnav').slideUp(200);
			} else {
				this.classList.add('is-active');
				$('.mainnav').slideDown(200);
			}
		});
	}

})();
