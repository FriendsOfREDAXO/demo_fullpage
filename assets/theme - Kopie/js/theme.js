var fps_settings = {
	scrollBar: false,
	scrollingSpeed: 700,
	css3: true,
	menu: '.mainnav',
	'verticalCentered': true,
	recordHistory: true,
	autoScrolling: false,
	fitToSection: false,
	responsiveWidth: 960,

	navigation: false,
	navigationPosition: 'right',
	showActiveTooltip: false,

	controlArrows: false,
	slidesNavigation: false,
	slidesNavPosition: 'bottom',
	
	scrollOverflow: true,
	lazyLoading: true,
	
	afterRender: function(){
		$('.loader').fadeOut(600);
		$('.pagewrapper').fadeIn(600);
		$('.mainnav').fadeIn(600);
		$('#fp-nav').fadeIn(600);
	},
	afterLoad: function(anchorLink, index){
		//$('#fp-nav').find('ul').addClass('dotstyle').addClass('dotstyle-scaleup');
		//alert('afterLoad'+anchorLink+index);
			//$('.spinner').fadeOut(600);
			//$('#fullpage').fadeIn(300);
	},
	onLeave: function(index, nextIndex, direction){
		if (index == 1) {
			$('a.arrowdown').hide();
		}
	}
};

// Extend options
jQuery.extend(fps_settings, fps_options);

$(document).ready(function() {

	// Move Scroll Indicator to Slide
	$('a.arrowdown').parent().parent().append($('a.arrowdown'));
	$('a.arrowdown').click(function() {
		$.fn.fullpage.moveSectionDown();
	});
	
	// Move Scroll Indicator to Slide
	//$('img.full').hide();
	//$('img.full').parent().parent().parent().append($('img.full'));

	// Logo click
	$('.pagelogo').click(function(){
		$.fn.fullpage.moveTo(1);
	});
	
	// Initiate fullpage.js
	$('.fullpage').fullpage(fps_settings);
	
});
