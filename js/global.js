var _functions = {};

$(function() {

	"use strict";

	/*================*/
	/* VARIABLES */
	/*================*/
	var swipers = [], winW, winH, winScr, _isphone, _istablet, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i), _isFF = !!navigator.userAgent.match(/firefox/i);

	/*========================*/
	/* page calculations */
	/*========================*/
	_functions.pageCalculations = function(){
		winW = $(window).width();
		winH = $(window).height();
		_isphone = $('.phone-marker').is(':visible') ? true : false;
		_istablet = $('.tablet-marker').is(':visible') ? true : false;
		$('nav').css({'height':winH});
		var fullpageHeight = winH - $('header').not('.type-1').outerHeight() - $('footer').outerHeight();
		$('.full-screen-height').css({'height':(fullpageHeight<500)?500:fullpageHeight});
		$('html').css({'font-size':winW/70});
		$('.rotate').each(function(){
			$(this).width($(this).parent().height());
		});
	};

	_functions.initSelect = function(){
		if(!$('.SlectBox').length) return false;
		$('.SlectBox').SumoSelect({ csvDispCount: 3, search: true, searchText:'Search', noMatch:'No matches for "{0}"', floatWidth: 0 });
	};

	/*=================================*/
	/* function on document ready */
	/*=================================*/
	if(_ismobile) $('body').addClass('mobile');
	_functions.pageCalculations();
	_functions.initSelect();

	/*============================*/
	/* function on page load */
	/*============================*/
	$(window).on('load', function(){
		_functions.initSwiper();
		$('body').addClass('loaded');
		$('#loader-wrapper').fadeOut();
	});

	/*==============================*/
	/* function on page resize */
	/*==============================*/
	_functions.resizeCall = function(){
		_functions.pageCalculations();
	};
	if(!_ismobile){
		$(window).on('resize', function(){
			_functions.resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			_functions.resizeCall();
		}, false);
	}

	/*==============================*/
	/* function on page scroll */
	/*==============================*/
	$(window).on('scroll', function(){
		_functions.scrollCall();
	});

	_functions.scrollCall = function(){
		winScr = $(window).scrollTop();
		if(winScr>70) $('header').addClass('scrolled');
		else $('header').removeClass('scrolled');
	};

	/*=====================*/
	/* swiper sliders */
	/*=====================*/
	var initIterator = 0;
	function setParams(swiper, dataValue, returnValue){
		return (swiper.is('[data-'+dataValue+']'))?parseInt(swiper.data(dataValue), 10):returnValue;
	}
	_functions.initSwiper = function(){
		$('.swiper-container').not('.initialized').each(function(){								  
			var $t = $(this);	

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index+' initialized').attr('id', index);
			$t.find('.swiper-pagination').addClass('swiper-pagination-'+index);
			$t.parent().find('.swiper-button-prev').addClass('swiper-button-prev-'+index);
			$t.parent().find('.swiper-button-next').addClass('swiper-button-next-'+index);

			var slidesPerViewVar = setParams($t,'slides-per-view',1);
			if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				pagination: '.swiper-pagination-'+index,
		        paginationClickable: true,
		        nextButton: '.swiper-button-next-'+index,
		        prevButton: '.swiper-button-prev-'+index,
		        slidesPerView: slidesPerViewVar,
		        autoHeight: setParams($t,'autoheight',0),
		        loop: setParams($t,'loop',0),
				autoplay: setParams($t,'autoplay',0),
				centeredSlides: setParams($t,'center',0),
		        breakpoints: ($t.is('[data-breakpoints]'))? { 767: { slidesPerView: parseInt($t.attr('data-xs-slides'), 10) }, 991: { slidesPerView: parseInt($t.attr('data-sm-slides'), 10) }, 1199: { slidesPerView: parseInt($t.attr('data-md-slides'), 10) }, 1370: { slidesPerView: parseInt($t.attr('data-lt-slides'), 10) } } : {},
		        initialSlide: setParams($t,'initialslide',0),
		        speed: setParams($t,'speed',500),
		        parallax: (_isFF)?0:setParams($t,'parallax',0),
		        slideToClickedSlide: setParams($t,'clickedslide',0),
		        mousewheelControl: setParams($t,'mousewheel',0),
		        direction: ($t.is('[data-direction]'))?$t.data('direction'):'horizontal',
		        spaceBetween: setParams($t,'space',0),
		        watchSlidesProgress: true,
		        keyboardControl: true,
		        mousewheelReleaseOnEdges: true,
		        preloadImages: false,
		        lazyLoading: true,
		        onTransitionEnd: function(swiper){
		        	var pageNum = (swiper.activeIndex+1<10)?('0'+(swiper.activeIndex+1)):(swiper.activeIndex+1);
		        	$t.find('.swiper-pager-current').text(pageNum);
		        },
			});
			swipers['swiper-'+index].update();
			initIterator++;
		});
		$('.swiper-container.swiper-control-top').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).closest('.swipers-couple-wrapper').find('.swiper-control-bottom').attr('id')];
		});
		$('.swiper-container.swiper-control-bottom').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).closest('.swipers-couple-wrapper').find('.swiper-control-top').attr('id')];
		});
	};

	$('.swiper-pager-arrow-prev').on('click', function(){
		swipers['swiper-'+$(this).closest('.swiper-container').attr('id')].slidePrev();
		return false;
	});

	$('.swiper-pager-arrow-next').on('click', function(){
		swipers['swiper-'+$(this).closest('.swiper-container').attr('id')].slideNext();
		return false;
	});


	/*==============================*/
	/* 08 - buttons, clicks, hovers */
	/*==============================*/

	//open and close popup
	_functions.openPopup = function(foo){
		$('.popup-content').removeClass('active');
		$('.popup-wrapper, .popup-content[data-rel="'+foo+'"]').addClass('active');
		$('html').addClass('overflow-hidden');
	};

	_functions.closePopup = function(){
		$('.popup-wrapper, .popup-content').removeClass('active');
		$('html').removeClass('overflow-hidden');
		$('.video-popup .popup-iframe').html('');
	};

	$(document).on('click', '.open-popup', function(e){
		_functions.openPopup($(this).data('rel'));
		return false;
	});

	$(document).on('click', '.popup-wrapper .button-close, .popup-wrapper .layer-close', function(e){
		_functions.closePopup();
		return false;
	});

	//video popup
	$('.open-video').on('click', function(e){
		$('.video-popup .popup-iframe').html('<iframe src="'+$(this).data('src')+'"></iframe>');
		$('.popup-wrapper').addClass('active');
		$('.video-popup').addClass('active');
		return false;
	});

	//open ajax product popup
	$(document).on('click', '.open-popup-ajax', function(e){
		e.preventDefault();
		$('html').addClass('overflow-hidden');
		$('.popup-content').removeClass('active');
		$('.popup-wrapper').addClass('active');
		var url = $(this).attr('href');
		$.ajax({
			type:"GET",
			async:true,
			url: url,
			success:function(response){
				var responseObject = $($.parseHTML(response));
				$('.ajax-popup .swiper-container').each(function(){
					swipers['swiper-'+$(this).attr('id')].destroy();
					delete swipers['swiper-'+$(this).attr('id')];
				});
				$('.ajax-popup').remove();
				$('.popup-wrapper').append(responseObject.addClass('ajax-popup'));
				_functions.initSwiper();
				responseObject.addClass('active');
				_functions.initSelect();
			}
		});
		return false;
	});

	//hamburger menu
	$('.hamburger-icon').on('click', function(){
		$(this).toggleClass('active');
		$('header').toggleClass('active');
		return false;
	});

	//toggle submenu
	$('.toggle-menu').on('click', function(){
		$(this).toggleClass('active').next().slideToggle();
		return false;
	});

	//filtration
	$('.sorting-menu .title').on('click', function(){
		$(this).toggleClass('active').next('.toggle').slideToggle();
		return false;
	});





});