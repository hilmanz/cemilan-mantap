/*
The MIT License (MIT)

 * Copyright (c) 2017 Benjamin Wong, benjamin-w@hotmail.com
 * https://github.com/yben56/j-rating
 * Dependencies - jquery-3.1.1, Bootstrap v3.3.6

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function($){
	$.fn.jRating = function( options ){
		var self = $(this);
		
		var defaults = $.extend({
			stars: 5,
			size: false,
			buttons_color: false,
			active_color: false,
			text: false,
			rating: 0
		}, options);
		
		//for css
		$(this).addClass("j-rating");
				
		//add btns
		var btns = function(){
			var btns = "";
			
			for (var i = 1; i <= defaults.stars; i++ ) {
				btns += "<input type='radio' name='j-rating' id='r" + i + "' value='" + i + "' /><label class='fa fa-star' for='r" + i + "' data-num='" + i + "'></label>";
			}
	
			return btns;
		};

		$(this).append(btns());
		
		//size
		if (defaults.size) {
			self.css("font-size", defaults.size);
		}
		
		//buttons color
		if (defaults.buttons_color) {
			$(this).append("<style type='text/css'>#" + self[0].id + " label { color: " + defaults.buttons_color +"; }</style>");
		}

		//active color
		if (defaults.active_color) {
			$(this).append("<style type='text/css'>#" + self[0].id + " .on { color: " + defaults.active_color + " !important; }</style>");
		}
		
		//display text
        if (defaults.text) {
			$(this).append("<span class='text'>" + "<span class='bold'>" + defaults.rating + "</span>" + "/" + defaults.stars + "</span>");
		}
		
		//btn clicked
		$(this).find("label").click(function(){
			self.find("label").removeClass("on");
			
			var num = $(this).data("num");
		
			for (var i = 1; i <= num; i++) {
				self.find("label:nth-of-type(" + i +")").addClass("on");
			}
			
			if (defaults.text) {
				self.find(".text").html("<span class='bold'>" + num + "</span>" + "/" + defaults.stars);
			}
		});
		
		//for edit
		if (defaults.rating != 0) {
			self.find("#r" + defaults.rating).prop('checked', true);
			
			for (var i = 1; i <= defaults.rating; i++) {
				self.find("label:nth-of-type(" + i +")").addClass("on");
			}
			
			self.find(".text").html(defaults.rating + "/" + defaults.stars);
		}
	};
})(jQuery);
