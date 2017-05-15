var mr_firstSectionHeight,
    mr_floatingProjectSections,
    mr_scrollTop = 0;

var _functions = {};

$(document).ready(function() {
    "use strict";
    
    // Smooth scroll to inner links

    $('.inner-link').each(function(){
        var href = $(this).attr('href');
        if(href.charAt(0) !== "#"){
            $(this).removeClass('inner-link');
        }
    });

	if($('.inner-link').length){
		$('.inner-link').smoothScroll({
			offset: -55,
			speed: 800
		});
    }

    // Update scroll variable for scrolling functions

    addEventListener('scroll', function() {
        mr_scrollTop = window.pageYOffset;
    }, false);

    // Append .background-image-holder <img>'s as CSS backgrounds

    $('.background-image-holder').each(function() {
        var imgSrc = $(this).children('img').attr('src');
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this).children('img').hide();
        $(this).css('background-position', 'initial');
    });

    // Fade in background images

    setTimeout(function() {
        $('.background-image-holder').each(function() {
            $(this).addClass('fadeIn');
        });
    }, 200);

    // Initialize Tooltips

    $('[data-toggle="tooltip"]').tooltip();

    // Icon bulleted lists

    $('ul[data-bullet]').each(function(){
        var bullet = $(this).attr('data-bullet');
        $(this).find('li').prepend('<i class="'+bullet+'"></i>');
    });

    // Progress Bars

    $('.progress-bar').each(function() {
        $(this).css('width', $(this).attr('data-progress') + '%');
    });


    // Populate filters

    $('.projects').each(function() {

        var filters = "";

        $(this).find('.project').each(function() {

            var filterTags = $(this).attr('data-filter').split(',');

            filterTags.forEach(function(tagName) {
                if (filters.indexOf(tagName) == -1) {
                    filters += '<li data-filter="' + tagName + '">' + capitaliseFirstLetter(tagName) + '</li>';
                }
            });
            $(this).closest('.projects')
                .find('ul.filters').empty().append('<li data-filter="all" class="active">All</li>').append(filters);
        });
    });

    $('.filters li').click(function() {
        var filter = $(this).attr('data-filter');
        $(this).closest('.filters').find('li').removeClass('active');
        $(this).addClass('active');

        $(this).closest('.projects').find('.project').each(function() {
            var filters = $(this).data('filter');

            if (filters.indexOf(filter) == -1) {
                $(this).addClass('inactive');
            } else {
                $(this).removeClass('inactive');
            }
        });

        if (filter == 'all') {
            $(this).closest('.projects').find('.project').removeClass('inactive');
        }
    });


    // Image Sliders

    $('.slider-all-controls').flexslider({
        start: function(slider){
            if(slider.find('.slides li:first-child').find('.fs-vid-background video').length){
               slider.find('.slides li:first-child').find('.fs-vid-background video').get(0).play();
            }
        },
        after: function(slider){
            if(slider.find('.fs-vid-background video').length){
                if(slider.find('li:not(.flex-active-slide)').find('.fs-vid-background video').length){
                    slider.find('li:not(.flex-active-slide)').find('.fs-vid-background video').get(0).pause();
                }
                if(slider.find('.flex-active-slide').find('.fs-vid-background video').length){
                    slider.find('.flex-active-slide').find('.fs-vid-background video').get(0).play();
                }
            }
        }
    });
    $('.slider-paging-controls').flexslider({
        animation: "slide",
        directionNav: false
    });
    $('.slider-arrow-controls').flexslider({
        controlNav: false
    });
    $('.slider-thumb-controls .slides li').each(function() {
        var imgSrc = $(this).find('img').attr('src');
        $(this).attr('data-thumb', imgSrc);
    });
    $('.slider-thumb-controls').flexslider({
        animation: "slide",
        controlNav: "thumbnails",
        directionNav: true
    });
    $('.logo-carousel').flexslider({
        minItems: 1,
        maxItems: 4,
        move: 1,
        itemWidth: 200,
        itemMargin: 0,
        animation: "slide",
        slideshow: true,
        slideshowSpeed: 3000,
        directionNav: false,
        controlNav: false
    });

    // Directory Slider
    $('#directory-carousel').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 210,
        itemMargin: 5,
        asNavFor: '#directory-slider'
    });
     
    $('#directory-slider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        sync: "#directory-carousel"
    });

    // Lightbox gallery titles

    $('.lightbox-grid li a').each(function(){
    	var galleryTitle = $(this).closest('.lightbox-grid').attr('data-gallery-title');
    	$(this).attr('data-lightbox', galleryTitle);
    });

    // Prepare embedded video modals

    $('iframe[data-provider]').each(function(){
        var provider = jQuery(this).attr('data-provider');
        var videoID = jQuery(this).attr('data-video-id');
        var autoplay = jQuery(this).attr('data-autoplay');
        var vidURL = '';

        if(provider == 'vimeo'){
            vidURL = "http://player.vimeo.com/video/"+videoID+"?badge=0&title=0&byline=0&title=0&autoplay="+autoplay;
            $(this).attr('data-src', vidURL);
        }else if (provider == 'youtube'){
            vidURL = "https://www.youtube.com/embed/"+videoID+"?showinfo=0&autoplay="+autoplay;
            $(this).attr('data-src', vidURL);
        }else{
            console.log('Only Vimeo and Youtube videos are supported at this time');
        }
    });

    // Multipurpose Modals

    jQuery('.foundry_modal[modal-link]').remove();

    if($('.foundry_modal').length && (!jQuery('.modal-screen').length)){
        // Add a div.modal-screen if there isn't already one there.
        var modalScreen = jQuery('<div />').addClass('modal-screen').appendTo('body');

    }

    jQuery('.foundry_modal').click(function(){
        jQuery(this).addClass('modal-acknowledged');
    });

    $('.modal-container:not([modal-link])').each(function(index) {
        if(jQuery(this).find('iframe[src]').length){
        	jQuery(this).find('.foundry_modal').addClass('iframe-modal');
        	var iframe = jQuery(this).find('iframe');
        	iframe.attr('data-src',iframe.attr('src'));
            iframe.attr('src', '');

        }
        jQuery(this).find('.btn-modal').attr('modal-link', index);

        // Only clone and append to body if there isn't already one there
        if(!jQuery('.foundry_modal[modal-link="'+index+'"]').length){
            jQuery(this).find('.foundry_modal').clone().appendTo('body').attr('modal-link', index).prepend(jQuery('<i class="ti-close close-modal">'));
        }
    });

    $('.btn-modal').unbind('click').click(function(){
    	var linkedModal = jQuery('.foundry_modal[modal-link="' + jQuery(this).attr('modal-link') + '"]');
        jQuery('.modal-screen').toggleClass('reveal-modal');
        if(linkedModal.find('iframe').length){
            if(linkedModal.find('iframe').attr('data-autoplay') === '1'){
                var autoplayMsg = '&autoplay=1'
            }
        	linkedModal.find('iframe').attr('src', (linkedModal.find('iframe').attr('data-src') + autoplayMsg));
        }
        linkedModal.toggleClass('reveal-modal');
        return false;
    });

    // Autoshow modals

	$('.foundry_modal[data-time-delay]').each(function(){
		var modal = $(this);
		var delay = modal.attr('data-time-delay');
		modal.prepend($('<i class="ti-close close-modal">'));
    	if(typeof modal.attr('data-cookie') != "undefined"){
        	if(!mr_cookies.hasItem(modal.attr('data-cookie'))){
                setTimeout(function(){
        			modal.addClass('reveal-modal');
        			$('.modal-screen').addClass('reveal-modal');
        		},delay);
            }
        }else{
            setTimeout(function(){
                modal.addClass('reveal-modal');
                $('.modal-screen').addClass('reveal-modal');
            },delay);
        }
	});

    // Autoclose modals

    $('.foundry_modal[data-hide-after]').each(function(){
        var modal = $(this);
        var delay = modal.attr('data-hide-after');
        if(typeof modal.attr('data-cookie') != "undefined"){
            if(!mr_cookies.hasItem(modal.attr('data-cookie'))){
                setTimeout(function(){
                if(!modal.hasClass('modal-acknowledged')){
                    modal.removeClass('reveal-modal');
                    $('.modal-screen').removeClass('reveal-modal');
                }
                },delay);
            }
        }else{
            setTimeout(function(){
                if(!modal.hasClass('modal-acknowledged')){
                    modal.removeClass('reveal-modal');
                    $('.modal-screen').removeClass('reveal-modal');
                }
            },delay);
        }
    });

    jQuery('.close-modal:not(.modal-strip .close-modal)').unbind('click').click(function(){
    	var modal = jQuery(this).closest('.foundry_modal');
        modal.toggleClass('reveal-modal');
        if(typeof modal.attr('data-cookie') !== "undefined"){
            mr_cookies.setItem(modal.attr('data-cookie'), "true", Infinity);
        }
    	if(modal.find('iframe').length){
            modal.find('iframe').attr('src', '');
        }
        jQuery('.modal-screen').removeClass('reveal-modal');
    });

    jQuery('.modal-screen').unbind('click').click(function(){
        if(jQuery('.foundry_modal.reveal-modal').find('iframe').length){
            jQuery('.foundry_modal.reveal-modal').find('iframe').attr('src', '');
        }
    	jQuery('.foundry_modal.reveal-modal').toggleClass('reveal-modal');
    	jQuery(this).toggleClass('reveal-modal');
    });

    jQuery(document).keyup(function(e) {
		 if (e.keyCode == 27) { // escape key maps to keycode `27`
            if(jQuery('.foundry_modal').find('iframe').length){
                jQuery('.foundry_modal').find('iframe').attr('src', '');
            }
			jQuery('.foundry_modal').removeClass('reveal-modal');
			jQuery('.modal-screen').removeClass('reveal-modal');
		}
	});

    // Modal Strips

    jQuery('.modal-strip').each(function(){
    	if(!jQuery(this).find('.close-modal').length){
    		jQuery(this).append(jQuery('<i class="ti-close close-modal">'));
    	}
    	var modal = jQuery(this);

        if(typeof modal.attr('data-cookie') != "undefined"){

            if(!mr_cookies.hasItem(modal.attr('data-cookie'))){
            	setTimeout(function(){
            		modal.addClass('reveal-modal');
            	},1000);
            }
        }else{
            setTimeout(function(){
                    modal.addClass('reveal-modal');
            },1000);
        }
    });

    jQuery('.modal-strip .close-modal').click(function(){
        var modal = jQuery(this).closest('.modal-strip');
        if(typeof modal.attr('data-cookie') != "undefined"){
            mr_cookies.setItem(modal.attr('data-cookie'), "true", Infinity);
        }
    	jQuery(this).closest('.modal-strip').removeClass('reveal-modal');
    	return false;
    });


    // Video Modals

    jQuery('.close-iframe').click(function() {
        jQuery(this).closest('.modal-video').removeClass('reveal-modal');
        jQuery(this).siblings('iframe').attr('src', '');
        jQuery(this).siblings('video').get(0).pause();
    });

    // Checkboxes

    $('.checkbox-option').on("click",function() {
        $(this).toggleClass('checked');
        var checkbox = $(this).find('input');
        if (checkbox.prop('checked') === false) {
            checkbox.prop('checked', true);
        } else {
            checkbox.prop('checked', false);
        }
    });

    // Radio Buttons

    $('.radio-option').click(function() {

        var checked = $(this).hasClass('checked'); // Get the current status of the radio

        var name = $(this).find('input').attr('name'); // Get the name of the input clicked

        if (!checked) {

            $('input[name="'+name+'"]').parent().removeClass('checked');

            $(this).addClass('checked');

            $(this).find('input').prop('checked', true);

        }

    });


    // Accordions

    $('.accordion li').click(function() {
        if ($(this).closest('.accordion').hasClass('one-open')) {
            $(this).closest('.accordion').find('li').removeClass('active');
            $(this).addClass('active');
        } else {
            $(this).toggleClass('active');
        }
    });

    // Tabbed Content

    $('.tabbed-content').each(function() {
        $(this).append('<ul class="content"></ul>');
    });

    $('.tabs li').each(function() {
        var originalTab = $(this),
            activeClass = "";
        if (originalTab.is('.tabs>li:first-child')) {
            activeClass = ' class="active"';
        }
        var tabContent = originalTab.find('.tab-content').detach().wrap('<li' + activeClass + '></li>').parent();
        originalTab.closest('.tabbed-content').find('.content').append(tabContent);
    });

    $('.tabs li').click(function() {
        $(this).closest('.tabs').find('li').removeClass('active');
        $(this).addClass('active');
        var liIndex = $(this).index() + 1;
        $(this).closest('.tabbed-content').find('.content>li').removeClass('active');
        $(this).closest('.tabbed-content').find('.content>li:nth-of-type(' + liIndex + ')').addClass('active');
    });

    // Local Videos

    $('section').closest('body').find('.local-video-container .play-button').click(function() {
        $(this).siblings('.background-image-holder').removeClass('fadeIn');
        $(this).siblings('.background-image-holder').css('z-index', -1);
        $(this).css('opacity', 0);
        $(this).siblings('video').get(0).play();
    });

    // Youtube Videos

    $('section').closest('body').find('.player').each(function() {
        var section = $(this).closest('section');
        section.find('.container').addClass('fadeOut');
        var src = $(this).attr('data-video-id');
        var startat = $(this).attr('data-start-at');
        $(this).attr('data-property', "{videoURL:'http://youtu.be/" + src + "',containment:'self',autoPlay:true, mute:true, startAt:" + startat + ", opacity:1, showControls:false}");
    });

	if($('.player').length){
        $('.player').each(function(){

            var section = $(this).closest('section');
            var player = section.find('.player');
            player.YTPlayer();
            player.on("YTPStart",function(e){
                section.find('.container').removeClass('fadeOut');
                section.find('.masonry-loader').addClass('fadeOut');
            });

        });
    }

    // Interact with Map once the user has clicked (to prevent scrolling the page = zooming the map

    $('.map-holder').click(function() {
        $(this).addClass('interact');
    });

    if($('.map-holder').length){
    	$(window).scroll(function() {
			if ($('.map-holder.interact').length) {
				$('.map-holder.interact').removeClass('interact');
			}
		});
    }


    //                                                            //
    //                                                            //
    // form code                                          //
    //                                                            //
    //                                                            //

    $('.validate-required, .validate-email').on('blur change', function() {
        validateFields($(this).closest('form'));
    });

    $('form').each(function() {
        if ($(this).find('.form-error').length) {
            $(this).attr('original-error', $(this).find('.form-error').text());
        }
    });

    function validateFields(form) {
            var name, error, originalErrorMessage;

            $(form).find('.validate-required[type="checkbox"]').each(function() {
                if (!$('[name="' + $(this).attr('name') + '"]:checked').length) {
                    error = 1;
                    name = $(this).attr('name').replace('[]', '');
                    form.find('.form-error').text('Please tick at least one ' + name + ' box.');
                }
            });

            $(form).find('.validate-required').each(function() {
                if ($(this).val() === '') {
                    $(this).addClass('field-error');
                    error = 1;
                } else {
                    $(this).removeClass('field-error');
                }
            });

            $(form).find('.validate-email').each(function() {
                if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                    $(this).addClass('field-error');
                    error = 1;
                } else {
                    $(this).removeClass('field-error');
                }
            });

            if (!form.find('.field-error').length) {
                form.find('.form-error').fadeOut(1000);
            }

            return error;
        }

    //
    //
    // End form code
    //
    //


    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }

    // Disable parallax on mobile

    if ((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        $('section').removeClass('parallax');
    }


});

$(window).load(function() {
    "use strict";

    // Initialize Masonry

    if ($('.masonry').length) {
        var container = document.querySelector('.masonry');
        var msnry = new Masonry(container, {
            itemSelector: '.masonry-item'
        });

        msnry.on('layoutComplete', function() {

            mr_firstSectionHeight = $('.main-container section:nth-of-type(1)').outerHeight(true);

            // Fix floating project filters to bottom of projects container

            if ($('.filters.floating').length) {
                setupFloatingProjectFilters();
                updateFloatingFilters();
                window.addEventListener("scroll", updateFloatingFilters, false);
            }

            $('.masonry').addClass('fadeIn');
            $('.masonry-loader').addClass('fadeOut');
            if ($('.masonryFlyIn').length) {
                masonryFlyIn();
            }
        });

        msnry.layout();
    }

    mr_firstSectionHeight = $('.main-container section:nth-of-type(1)').outerHeight(true);


});

function updateNav() {
    var scrollY = mr_scrollTop;
}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function masonryFlyIn() {
    var $items = $('.masonryFlyIn .masonry-item');
    var time = 0;

    $items.each(function() {
        var item = $(this);
        setTimeout(function() {
            item.addClass('fadeIn');
        }, time);
        time += 170;
    });
}

function setupFloatingProjectFilters() {
    mr_floatingProjectSections = [];
    $('.filters.floating').closest('section').each(function() {
        var section = $(this);

        mr_floatingProjectSections.push({
            section: section.get(0),
            outerHeight: section.outerHeight(),
            elemTop: section.offset().top,
            elemBottom: section.offset().top + section.outerHeight(),
            filters: section.find('.filters.floating'),
            filersHeight: section.find('.filters.floating').outerHeight(true)
        });
    });
}

function updateFloatingFilters() {
    var l = mr_floatingProjectSections.length;
    while (l--) {
        var section = mr_floatingProjectSections[l];

        if ((section.elemTop < mr_scrollTop) && typeof window.mr_variant == "undefined" ) {
            section.filters.css({
                position: 'fixed',
                top: '16px',
                bottom: 'auto'
            });
            if (mr_scrollTop > (section.elemBottom - 70)) {
                section.filters.css({
                    position: 'absolute',
                    bottom: '16px',
                    top: 'auto'
                });
                section.filters.css({
                    transform: 'translate3d(-50%,0,0)'
                });
            }
        } else {
            section.filters.css({
                position: 'absolute',
                transform: 'translate3d(-50%,0,0)'
            });
        }
    }
}

window.initializeMaps = function(){
    if(typeof google !== "undefined"){
        if(typeof google.maps !== "undefined"){
            $('.map-canvas[data-maps-api-key]').each(function(){
                    var mapInstance   = this,
                        mapJSON       = typeof $(this).attr('data-map-style') !== "undefined" ? $(this).attr('data-map-style'): false,
                        mapStyle      = JSON.parse(mapJSON) || [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}],
                        zoomLevel     = (typeof $(this).attr('data-map-zoom') !== "undefined" && $(this).attr('data-map-zoom') !== "") ? $(this).attr('data-map-zoom') * 1: 17,
                        latlong       = typeof $(this).attr('data-latlong') != "undefined" ? $(this).attr('data-latlong') : false,
                        latitude      = latlong ? 1 *latlong.substr(0, latlong.indexOf(',')) : false,
                        longitude     = latlong ? 1 * latlong.substr(latlong.indexOf(",") + 1) : false,
                        geocoder      = new google.maps.Geocoder(),
                        address       = typeof $(this).attr('data-address') !== "undefined" ? $(this).attr('data-address').split(';'): false,
                        markerTitle   = "We Are Here",
                        isDraggable = $(document).width() > 766 ? true : false,
                        map, marker, markerImage,
                        mapOptions = {
                            draggable: isDraggable,
                            scrollwheel: false,
                            zoom: zoomLevel,
                            disableDefaultUI: true,
                            styles: mapStyle
                        };

                    if($(this).attr('data-marker-title') != undefined && $(this).attr('data-marker-title') != "" )
                    {
                        markerTitle = $(this).attr('data-marker-title');
                    }

                    if(address != undefined && address[0] != ""){
                            geocoder.geocode( { 'address': address[0].replace('[nomarker]','')}, function(results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                var map = new google.maps.Map(mapInstance, mapOptions);
                                map.setCenter(results[0].geometry.location);

                                address.forEach(function(address){
                                    var markerGeoCoder;

                                    markerImage = {url: window.mr_variant == undefined ? 'img/mapmarker.png' : '../img/mapmarker.png', size: new google.maps.Size(50,50), scaledSize: new google.maps.Size(50,50)};
                                    if(/(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)/.test(address) ){
                                        var latlong = address.split(','),
                                        marker = new google.maps.Marker({
                                                        position: { lat: 1*latlong[0], lng: 1*latlong[1] },
                                                        map: map,
                                                        icon: markerImage,
                                                        title: markerTitle,
                                                        optimised: false
                                                    });
                                    }
                                    else if(address.indexOf('[nomarker]') < 0){
                                        markerGeoCoder = new google.maps.Geocoder();
                                        markerGeoCoder.geocode( { 'address': address.replace('[nomarker]','')}, function(results, status) {
                                            if (status == google.maps.GeocoderStatus.OK) {
                                                marker = new google.maps.Marker({
                                                    map: map,
                                                    icon: markerImage,
                                                    title: markerTitle,
                                                    position: results[0].geometry.location,
                                                    optimised: false
                                                });
                                            }
                                        });
                                    }

                                });
                            } else {
                                console.log('There was a problem geocoding the address.');
                            }
                        });
                    }
                    else if(latitude != undefined && latitude != "" && latitude != false && longitude != undefined && longitude != "" && longitude != false ){
                        mapOptions.center   = { lat: latitude, lng: longitude};
                        map = new google.maps.Map(mapInstance, mapOptions);
                        marker              = new google.maps.Marker({
                                                    position: { lat: latitude, lng: longitude },
                                                    map: map,
                                                    icon: markerImage,
                                                    title: markerTitle
                                                });

                    }

                });
        }
    }
}
initializeMaps();

// End of Maps


// Prepare Signup Form - It is used to retrieve form details from an iframe Mail Chimp or Campaign Monitor form.

function prepareSignup(iFrame){
    var form   = jQuery('<form />'),
        action = iFrame.contents().find('form').attr('action');

    // Alter action for a Mail Chimp-compatible ajax request url.
    if(/list-manage\.com/.test(action)){
       action = action.replace('/post?', '/post-json?') + "&c=?";
       if(action.substr(0,2) == "//"){
           action = 'http:' + action;
       }
    }

    // Alter action for a Campaign Monitor-compatible ajax request url.
    if(/createsend\.com/.test(action)){
       action = action + '?callback=?';
    }


    // Set action on the form
    form.attr('action', action);

    // Clone form input fields from
    iFrame.contents().find('input, select, textarea').not('input[type="submit"]').each(function(){
        $(this).clone().appendTo(form);

    });

    return form;


}



/*\
|*|  COOKIE LIBRARY THANKS TO MDN
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  Revision #1 - September 4, 2014
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
|*|  https://developer.mozilla.org/User:fusionchess
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * mr_cookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * mr_cookies.getItem(name)
|*|  * mr_cookies.removeItem(name[, path[, domain]])
|*|  * mr_cookies.hasItem(name)
|*|  * mr_cookies.keys()
|*|
\*/

var mr_cookies = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};

/*\
|*|  END COOKIE LIBRARY
\*/

/**!
 * easyPieChart
 * Lightweight plugin to render simple, animated and retina optimized pie charts
 *
 * @license
 * @author Robert Fleischmann <rendro87@gmail.com> (http://robert-fleischmann.de)
 * @version 2.1.4
 **/

(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    }
    else if(typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    }
    else {
        factory(root.jQuery);
    }
}(this, function($) {
/**
 * Renderer to render the chart on a canvas object
 * @param {DOMElement} el      DOM element to host the canvas (root of the plugin)
 * @param {object}     options options object of the plugin
 */
var CanvasRenderer = function(el, options) {
	var cachedBackground;
	var canvas = document.createElement('canvas');

	el.appendChild(canvas);

	if (typeof(G_vmlCanvasManager) !== 'undefined') {
		G_vmlCanvasManager.initElement(canvas);
	}

	var ctx = canvas.getContext('2d');

	canvas.width = canvas.height = options.size;

	// canvas on retina devices
	var scaleBy = 1;
	if (window.devicePixelRatio > 1) {
		scaleBy = window.devicePixelRatio;
		canvas.style.width = canvas.style.height = [options.size, 'px'].join('');
		canvas.width = canvas.height = options.size * scaleBy;
		ctx.scale(scaleBy, scaleBy);
	}

	// move 0,0 coordinates to the center
	ctx.translate(options.size / 2, options.size / 2);

	// rotate canvas -90deg
	ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);

	var radius = (options.size - options.lineWidth) / 2;
	if (options.scaleColor && options.scaleLength) {
		radius -= options.scaleLength + 2; // 2 is the distance between scale and bar
	}

	// IE polyfill for Date
	Date.now = Date.now || function() {
		return +(new Date());
	};

	/**
	 * Draw a circle around the center of the canvas
	 * @param {strong} color     Valid CSS color string
	 * @param {number} lineWidth Width of the line in px
	 * @param {number} percent   Percentage to draw (float between -1 and 1)
	 */
	var drawCircle = function(color, lineWidth, percent) {
		percent = Math.min(Math.max(-1, percent || 0), 1);
		var isNegative = percent <= 0 ? true : false;

		ctx.beginPath();
		ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, isNegative);

		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;

		ctx.stroke();
	};

	/**
	 * Draw the scale of the chart
	 */
	var drawScale = function() {
		var offset;
		var length;

		ctx.lineWidth = 1;
		ctx.fillStyle = options.scaleColor;

		ctx.save();
		for (var i = 24; i > 0; --i) {
			if (i % 6 === 0) {
				length = options.scaleLength;
				offset = 0;
			} else {
				length = options.scaleLength * 0.6;
				offset = options.scaleLength - length;
			}
			ctx.fillRect(-options.size/2 + offset, 0, length, 1);
			ctx.rotate(Math.PI / 12);
		}
		ctx.restore();
	};

	/**
	 * Request animation frame wrapper with polyfill
	 * @return {function} Request animation frame method or timeout fallback
	 */
	var reqAnimationFrame = (function() {
		return  window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function(callback) {
					window.setTimeout(callback, 1000 / 60);
				};
	}());

	/**
	 * Draw the background of the plugin including the scale and the track
	 */
	var drawBackground = function() {
		if(options.scaleColor) drawScale();
		if(options.trackColor) drawCircle(options.trackColor, options.lineWidth, 1);
	};

  /**
    * Canvas accessor
   */
  this.getCanvas = function() {
    return canvas;
  };

  /**
    * Canvas 2D context 'ctx' accessor
   */
  this.getCtx = function() {
    return ctx;
  };

	/**
	 * Clear the complete canvas
	 */
	this.clear = function() {
		ctx.clearRect(options.size / -2, options.size / -2, options.size, options.size);
	};

	/**
	 * Draw the complete chart
	 * @param {number} percent Percent shown by the chart between -100 and 100
	 */
	this.draw = function(percent) {
		// do we need to render a background
		if (!!options.scaleColor || !!options.trackColor) {
			// getImageData and putImageData are supported
			if (ctx.getImageData && ctx.putImageData) {
				if (!cachedBackground) {
					drawBackground();
					cachedBackground = ctx.getImageData(0, 0, options.size * scaleBy, options.size * scaleBy);
				} else {
					ctx.putImageData(cachedBackground, 0, 0);
				}
			} else {
				this.clear();
				drawBackground();
			}
		} else {
			this.clear();
		}

		ctx.lineCap = options.lineCap;

		// if barcolor is a function execute it and pass the percent as a value
		var color;
		if (typeof(options.barColor) === 'function') {
			color = options.barColor(percent);
		} else {
			color = options.barColor;
		}

		// draw bar
		drawCircle(color, options.lineWidth, percent / 100);
	}.bind(this);

	/**
	 * Animate from some percent to some other percentage
	 * @param {number} from Starting percentage
	 * @param {number} to   Final percentage
	 */
	this.animate = function(from, to) {
		var startTime = Date.now();
		options.onStart(from, to);
		var animation = function() {
			var process = Math.min(Date.now() - startTime, options.animate.duration);
			var currentValue = options.easing(this, process, from, to - from, options.animate.duration);
			this.draw(currentValue);
			options.onStep(from, to, currentValue);
			if (process >= options.animate.duration) {
				options.onStop(from, to);
			} else {
				reqAnimationFrame(animation);
			}
		}.bind(this);

		reqAnimationFrame(animation);
	}.bind(this);
};

var EasyPieChart = function(el, opts) {
	var defaultOptions = {
		barColor: '#ef1e25',
		trackColor: '#f9f9f9',
		scaleColor: '#dfe0e0',
		scaleLength: 5,
		lineCap: 'round',
		lineWidth: 3,
		size: 110,
		rotate: 0,
		animate: {
			duration: 1000,
			enabled: true
		},
		easing: function (x, t, b, c, d) { // more can be found here: http://gsgd.co.uk/sandbox/jquery/easing/
			t = t / (d/2);
			if (t < 1) {
				return c / 2 * t * t + b;
			}
			return -c/2 * ((--t)*(t-2) - 1) + b;
		},
		onStart: function(from, to) {
			return;
		},
		onStep: function(from, to, currentValue) {
			return;
		},
		onStop: function(from, to) {
			return;
		}
	};

	// detect present renderer
	if (typeof(CanvasRenderer) !== 'undefined') {
		defaultOptions.renderer = CanvasRenderer;
	} else if (typeof(SVGRenderer) !== 'undefined') {
		defaultOptions.renderer = SVGRenderer;
	} else {
		throw new Error('Please load either the SVG- or the CanvasRenderer');
	}

	var options = {};
	var currentValue = 0;

	/**
	 * Initialize the plugin by creating the options object and initialize rendering
	 */
	var init = function() {
		this.el = el;
		this.options = options;

		// merge user options into default options
		for (var i in defaultOptions) {
			if (defaultOptions.hasOwnProperty(i)) {
				options[i] = opts && typeof(opts[i]) !== 'undefined' ? opts[i] : defaultOptions[i];
				if (typeof(options[i]) === 'function') {
					options[i] = options[i].bind(this);
				}
			}
		}

		// check for jQuery easing
		if (typeof(options.easing) === 'string' && typeof(jQuery) !== 'undefined' && jQuery.isFunction(jQuery.easing[options.easing])) {
			options.easing = jQuery.easing[options.easing];
		} else {
			options.easing = defaultOptions.easing;
		}

		// process earlier animate option to avoid bc breaks
		if (typeof(options.animate) === 'number') {
			options.animate = {
				duration: options.animate,
				enabled: true
			};
		}

		if (typeof(options.animate) === 'boolean' && !options.animate) {
			options.animate = {
				duration: 1000,
				enabled: options.animate
			};
		}

		// create renderer
		this.renderer = new options.renderer(el, options);

		// initial draw
		this.renderer.draw(currentValue);

		// initial update
		if (el.dataset && el.dataset.percent) {
			this.update(parseFloat(el.dataset.percent));
		} else if (el.getAttribute && el.getAttribute('data-percent')) {
			this.update(parseFloat(el.getAttribute('data-percent')));
		}
	}.bind(this);

	/**
	 * Update the value of the chart
	 * @param  {number} newValue Number between 0 and 100
	 * @return {object}          Instance of the plugin for method chaining
	 */
	this.update = function(newValue) {
		newValue = parseFloat(newValue);
		if (options.animate.enabled) {
			this.renderer.animate(currentValue, newValue);
		} else {
			this.renderer.draw(newValue);
		}
		currentValue = newValue;
		return this;
	}.bind(this);

	/**
	 * Disable animation
	 * @return {object} Instance of the plugin for method chaining
	 */
	this.disableAnimation = function() {
		options.animate.enabled = false;
		return this;
	};

	/**
	 * Enable animation
	 * @return {object} Instance of the plugin for method chaining
	 */
	this.enableAnimation = function() {
		options.animate.enabled = true;
		return this;
	};

	init();
};

$.fn.easyPieChart = function(options) {
	return this.each(function() {
		var instanceOptions;

		if (!$.data(this, 'easyPieChart')) {
			instanceOptions = $.extend({}, options, $(this).data());
			$.data(this, 'easyPieChart', new EasyPieChart(this, instanceOptions));
		}
	});
};

}));

// Generated by CoffeeScript 1.6.2
/*!
jQuery Waypoints - v2.0.5
Copyright (c) 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/


(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice;

  (function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      return define('waypoints', ['jquery'], function($) {
        return factory($, root);
      });
    } else {
      return factory(root.jQuery, root);
    }
  })(window, function($, window) {
    var $w, Context, Waypoint, allWaypoints, contextCounter, contextKey, contexts, isTouch, jQMethods, methods, resizeEvent, scrollEvent, waypointCounter, waypointKey, wp, wps;

    $w = $(window);
    isTouch = __indexOf.call(window, 'ontouchstart') >= 0;
    allWaypoints = {
      horizontal: {},
      vertical: {}
    };
    contextCounter = 1;
    contexts = {};
    contextKey = 'waypoints-context-id';
    resizeEvent = 'resize.waypoints';
    scrollEvent = 'scroll.waypoints';
    waypointCounter = 1;
    waypointKey = 'waypoints-waypoint-ids';
    wp = 'waypoint';
    wps = 'waypoints';
    Context = (function() {
      function Context($element) {
        var _this = this;

        this.$element = $element;
        this.element = $element[0];
        this.didResize = false;
        this.didScroll = false;
        this.id = 'context' + contextCounter++;
        this.oldScroll = {
          x: $element.scrollLeft(),
          y: $element.scrollTop()
        };
        this.waypoints = {
          horizontal: {},
          vertical: {}
        };
        this.element[contextKey] = this.id;
        contexts[this.id] = this;
        $element.bind(scrollEvent, function() {
          var scrollHandler;

          if (!(_this.didScroll || isTouch)) {
            _this.didScroll = true;
            scrollHandler = function() {
              _this.doScroll();
              return _this.didScroll = false;
            };
            return window.setTimeout(scrollHandler, $[wps].settings.scrollThrottle);
          }
        });
        $element.bind(resizeEvent, function() {
          var resizeHandler;

          if (!_this.didResize) {
            _this.didResize = true;
            resizeHandler = function() {
              $[wps]('refresh');
              return _this.didResize = false;
            };
            return window.setTimeout(resizeHandler, $[wps].settings.resizeThrottle);
          }
        });
      }

      Context.prototype.doScroll = function() {
        var axes,
          _this = this;

        axes = {
          horizontal: {
            newScroll: this.$element.scrollLeft(),
            oldScroll: this.oldScroll.x,
            forward: 'right',
            backward: 'left'
          },
          vertical: {
            newScroll: this.$element.scrollTop(),
            oldScroll: this.oldScroll.y,
            forward: 'down',
            backward: 'up'
          }
        };
        if (isTouch && (!axes.vertical.oldScroll || !axes.vertical.newScroll)) {
          $[wps]('refresh');
        }
        $.each(axes, function(aKey, axis) {
          var direction, isForward, triggered;

          triggered = [];
          isForward = axis.newScroll > axis.oldScroll;
          direction = isForward ? axis.forward : axis.backward;
          $.each(_this.waypoints[aKey], function(wKey, waypoint) {
            var _ref, _ref1;

            if ((axis.oldScroll < (_ref = waypoint.offset) && _ref <= axis.newScroll)) {
              return triggered.push(waypoint);
            } else if ((axis.newScroll < (_ref1 = waypoint.offset) && _ref1 <= axis.oldScroll)) {
              return triggered.push(waypoint);
            }
          });
          triggered.sort(function(a, b) {
            return a.offset - b.offset;
          });
          if (!isForward) {
            triggered.reverse();
          }
          return $.each(triggered, function(i, waypoint) {
            if (waypoint.options.continuous || i === triggered.length - 1) {
              return waypoint.trigger([direction]);
            }
          });
        });
        return this.oldScroll = {
          x: axes.horizontal.newScroll,
          y: axes.vertical.newScroll
        };
      };

      Context.prototype.refresh = function() {
        var axes, cOffset, isWin,
          _this = this;

        isWin = $.isWindow(this.element);
        cOffset = this.$element.offset();
        this.doScroll();
        axes = {
          horizontal: {
            contextOffset: isWin ? 0 : cOffset.left,
            contextScroll: isWin ? 0 : this.oldScroll.x,
            contextDimension: this.$element.width(),
            oldScroll: this.oldScroll.x,
            forward: 'right',
            backward: 'left',
            offsetProp: 'left'
          },
          vertical: {
            contextOffset: isWin ? 0 : cOffset.top,
            contextScroll: isWin ? 0 : this.oldScroll.y,
            contextDimension: isWin ? $[wps]('viewportHeight') : this.$element.height(),
            oldScroll: this.oldScroll.y,
            forward: 'down',
            backward: 'up',
            offsetProp: 'top'
          }
        };
        return $.each(axes, function(aKey, axis) {
          return $.each(_this.waypoints[aKey], function(i, waypoint) {
            var adjustment, elementOffset, oldOffset, _ref, _ref1;

            adjustment = waypoint.options.offset;
            oldOffset = waypoint.offset;
            elementOffset = $.isWindow(waypoint.element) ? 0 : waypoint.$element.offset()[axis.offsetProp];
            if ($.isFunction(adjustment)) {
              adjustment = adjustment.apply(waypoint.element);
            } else if (typeof adjustment === 'string') {
              adjustment = parseFloat(adjustment);
              if (waypoint.options.offset.indexOf('%') > -1) {
                adjustment = Math.ceil(axis.contextDimension * adjustment / 100);
              }
            }
            waypoint.offset = elementOffset - axis.contextOffset + axis.contextScroll - adjustment;
            if ((waypoint.options.onlyOnScroll && (oldOffset != null)) || !waypoint.enabled) {
              return;
            }
            if (oldOffset !== null && (oldOffset < (_ref = axis.oldScroll) && _ref <= waypoint.offset)) {
              return waypoint.trigger([axis.backward]);
            } else if (oldOffset !== null && (oldOffset > (_ref1 = axis.oldScroll) && _ref1 >= waypoint.offset)) {
              return waypoint.trigger([axis.forward]);
            } else if (oldOffset === null && axis.oldScroll >= waypoint.offset) {
              return waypoint.trigger([axis.forward]);
            }
          });
        });
      };

      Context.prototype.checkEmpty = function() {
        if ($.isEmptyObject(this.waypoints.horizontal) && $.isEmptyObject(this.waypoints.vertical)) {
          this.$element.unbind([resizeEvent, scrollEvent].join(' '));
          return delete contexts[this.id];
        }
      };

      return Context;

    })();
    Waypoint = (function() {
      function Waypoint($element, context, options) {
        var idList, _ref;

        if (options.offset === 'bottom-in-view') {
          options.offset = function() {
            var contextHeight;

            contextHeight = $[wps]('viewportHeight');
            if (!$.isWindow(context.element)) {
              contextHeight = context.$element.height();
            }
            return contextHeight - $(this).outerHeight();
          };
        }
        this.$element = $element;
        this.element = $element[0];
        this.axis = options.horizontal ? 'horizontal' : 'vertical';
        this.callback = options.handler;
        this.context = context;
        this.enabled = options.enabled;
        this.id = 'waypoints' + waypointCounter++;
        this.offset = null;
        this.options = options;
        context.waypoints[this.axis][this.id] = this;
        allWaypoints[this.axis][this.id] = this;
        idList = (_ref = this.element[waypointKey]) != null ? _ref : [];
        idList.push(this.id);
        this.element[waypointKey] = idList;
      }

      Waypoint.prototype.trigger = function(args) {
        if (!this.enabled) {
          return;
        }
        if (this.callback != null) {
          this.callback.apply(this.element, args);
        }
        if (this.options.triggerOnce) {
          return this.destroy();
        }
      };

      Waypoint.prototype.disable = function() {
        return this.enabled = false;
      };

      Waypoint.prototype.enable = function() {
        this.context.refresh();
        return this.enabled = true;
      };

      Waypoint.prototype.destroy = function() {
        delete allWaypoints[this.axis][this.id];
        delete this.context.waypoints[this.axis][this.id];
        return this.context.checkEmpty();
      };

      Waypoint.getWaypointsByElement = function(element) {
        var all, ids;

        ids = element[waypointKey];
        if (!ids) {
          return [];
        }
        all = $.extend({}, allWaypoints.horizontal, allWaypoints.vertical);
        return $.map(ids, function(id) {
          return all[id];
        });
      };

      return Waypoint;

    })();
    methods = {
      init: function(f, options) {
        var _ref;

        options = $.extend({}, $.fn[wp].defaults, options);
        if ((_ref = options.handler) == null) {
          options.handler = f;
        }
        this.each(function() {
          var $this, context, contextElement, _ref1;

          $this = $(this);
          contextElement = (_ref1 = options.context) != null ? _ref1 : $.fn[wp].defaults.context;
          if (!$.isWindow(contextElement)) {
            contextElement = $this.closest(contextElement);
          }
          contextElement = $(contextElement);
          context = contexts[contextElement[0][contextKey]];
          if (!context) {
            context = new Context(contextElement);
          }
          return new Waypoint($this, context, options);
        });
        $[wps]('refresh');
        return this;
      },
      disable: function() {
        return methods._invoke.call(this, 'disable');
      },
      enable: function() {
        return methods._invoke.call(this, 'enable');
      },
      destroy: function() {
        return methods._invoke.call(this, 'destroy');
      },
      prev: function(axis, selector) {
        return methods._traverse.call(this, axis, selector, function(stack, index, waypoints) {
          if (index > 0) {
            return stack.push(waypoints[index - 1]);
          }
        });
      },
      next: function(axis, selector) {
        return methods._traverse.call(this, axis, selector, function(stack, index, waypoints) {
          if (index < waypoints.length - 1) {
            return stack.push(waypoints[index + 1]);
          }
        });
      },
      _traverse: function(axis, selector, push) {
        var stack, waypoints;

        if (axis == null) {
          axis = 'vertical';
        }
        if (selector == null) {
          selector = window;
        }
        waypoints = jQMethods.aggregate(selector);
        stack = [];
        this.each(function() {
          var index;

          index = $.inArray(this, waypoints[axis]);
          return push(stack, index, waypoints[axis]);
        });
        return this.pushStack(stack);
      },
      _invoke: function(method) {
        this.each(function() {
          var waypoints;

          waypoints = Waypoint.getWaypointsByElement(this);
          return $.each(waypoints, function(i, waypoint) {
            waypoint[method]();
            return true;
          });
        });
        return this;
      }
    };
    $.fn[wp] = function() {
      var args, method;

      method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (methods[method]) {
        return methods[method].apply(this, args);
      } else if ($.isFunction(method)) {
        return methods.init.apply(this, arguments);
      } else if ($.isPlainObject(method)) {
        return methods.init.apply(this, [null, method]);
      } else if (!method) {
        return $.error("jQuery Waypoints needs a callback function or handler option.");
      } else {
        return $.error("The " + method + " method does not exist in jQuery Waypoints.");
      }
    };
    $.fn[wp].defaults = {
      context: window,
      continuous: true,
      enabled: true,
      horizontal: false,
      offset: 0,
      triggerOnce: false
    };
    jQMethods = {
      refresh: function() {
        return $.each(contexts, function(i, context) {
          return context.refresh();
        });
      },
      viewportHeight: function() {
        var _ref;

        return (_ref = window.innerHeight) != null ? _ref : $w.height();
      },
      aggregate: function(contextSelector) {
        var collection, waypoints, _ref;

        collection = allWaypoints;
        if (contextSelector) {
          collection = (_ref = contexts[$(contextSelector)[0][contextKey]]) != null ? _ref.waypoints : void 0;
        }
        if (!collection) {
          return [];
        }
        waypoints = {
          horizontal: [],
          vertical: []
        };
        $.each(waypoints, function(axis, arr) {
          $.each(collection[axis], function(key, waypoint) {
            return arr.push(waypoint);
          });
          arr.sort(function(a, b) {
            return a.offset - b.offset;
          });
          waypoints[axis] = $.map(arr, function(waypoint) {
            return waypoint.element;
          });
          return waypoints[axis] = $.unique(waypoints[axis]);
        });
        return waypoints;
      },
      above: function(contextSelector) {
        if (contextSelector == null) {
          contextSelector = window;
        }
        return jQMethods._filter(contextSelector, 'vertical', function(context, waypoint) {
          return waypoint.offset <= context.oldScroll.y;
        });
      },
      below: function(contextSelector) {
        if (contextSelector == null) {
          contextSelector = window;
        }
        return jQMethods._filter(contextSelector, 'vertical', function(context, waypoint) {
          return waypoint.offset > context.oldScroll.y;
        });
      },
      left: function(contextSelector) {
        if (contextSelector == null) {
          contextSelector = window;
        }
        return jQMethods._filter(contextSelector, 'horizontal', function(context, waypoint) {
          return waypoint.offset <= context.oldScroll.x;
        });
      },
      right: function(contextSelector) {
        if (contextSelector == null) {
          contextSelector = window;
        }
        return jQMethods._filter(contextSelector, 'horizontal', function(context, waypoint) {
          return waypoint.offset > context.oldScroll.x;
        });
      },
      enable: function() {
        return jQMethods._invoke('enable');
      },
      disable: function() {
        return jQMethods._invoke('disable');
      },
      destroy: function() {
        return jQMethods._invoke('destroy');
      },
      extendFn: function(methodName, f) {
        return methods[methodName] = f;
      },
      _invoke: function(method) {
        var waypoints;

        waypoints = $.extend({}, allWaypoints.vertical, allWaypoints.horizontal);
        return $.each(waypoints, function(key, waypoint) {
          waypoint[method]();
          return true;
        });
      },
      _filter: function(selector, axis, test) {
        var context, waypoints;

        context = contexts[$(selector)[0][contextKey]];
        if (!context) {
          return [];
        }
        waypoints = [];
        $.each(context.waypoints[axis], function(i, waypoint) {
          if (test(context, waypoint)) {
            return waypoints.push(waypoint);
          }
        });
        waypoints.sort(function(a, b) {
          return a.offset - b.offset;
        });
        return $.map(waypoints, function(waypoint) {
          return waypoint.element;
        });
      }
    };
    $[wps] = function() {
      var args, method;

      method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (jQMethods[method]) {
        return jQMethods[method].apply(null, args);
      } else {
        return jQMethods.aggregate.call(null, method);
      }
    };
    $[wps].settings = {
      resizeThrottle: 100,
      scrollThrottle: 30
    };
    return $w.on('load.waypoints', function() {
      return $[wps]('refresh');
    });
  });

}).call(this);



/*================*/
/* GLOBAL.js */
/*================*/

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
    /* buttons, clicks, hovers */
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

    //open ajax  popup
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


});
