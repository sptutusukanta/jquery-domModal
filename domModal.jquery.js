/**
 * domModal https://github.com/oomlaut/domModal
 * [description]
 *
 * Copyright (c) 2011 Paul Gueller (http://paulgueller.com)
 * Dual licensed under the MIT and GPL licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-license.php
 *
 * Inspired by:
 * thickbox		http://jquery.com/demo/thickbox/
 * simplemodal	http://www.ericmmartin.com/projects/simplemodal/
 * squeezebox	http://digitarald.de/project/squeezebox/
 *
 * @usage:	jQuery('a[rel*="modal"]').domModal();
 * @usage:	jQuery('a[href*="http://"]').domModal({closeBtn: false, transitionRate: "slow"});
 * @usage:	jQuery('input#googleBtn').domModal({iframe: true, height: 600, width: 450, event: 'customEvent'}).bind('click', function(){ $(this).trigger('customEvent');});
 */
 
/*!TODO:
 * - ajax .load() content from another document w/o iframes
 * - true "modal" functionality: do not destroy overlays until explicit button/link is clicked
 *
 */

;(function($){
/** jQuery().domModal();
*
* @name modal
* @param Object usrOptions Options for the modal overlay and content window. Details listed in 'presets' declaration
* @param Function callback Called after #modalContent is appended to <body> and .fadeIn() animation completes
* @type jQuery
* @cat plugins/"windows and overlays"
*
**/
jQuery.fn.domModal = function (usrOptions, callback) {
	//modal containers
	var modal = {}, options = {}, $ref;

	//methods for use
	var methods = {
		construct: function () {
			var context = this;
			//gather information about element target
			options.iframe = (options.iframe) ? options.iframe : ($ref.attr('rel') == 'iframe');
			if (options.iframe) {
				options.target = (options.target) ? options.target : $ref.attr('href');
				options.height = (options.height) ? options.height : 600;
				options.width = (options.width) ? options.width : 800;
				$content = $('<iframe>', {
					id: 'modalContentIframe'
					,name: 'modalContentIframe'
					,frameborder: 0
					,height: options.height
					,width: options.width
					,scrolling: 'auto'
					,src: options.target
					,onload: function (){ }
				});
			} else {
				options.target = (options.target) ? options.target : $($ref.attr('href'));
				options.width = (options.width) ? options.width : options.target.width();
				options.height = (options.height) ? options.height : options.target.height();
				$content = options.target.clone().css({ display: 'block' });
			}
			modal = {
				overlay : $('<div>', {
					id: 'modalOverlay'
					,'class': 'modalRemove'
					,click: function () { context.destroy(); }
					}).css({ opacity: options.opacity }).appendTo('body')
				,content : $('<div>', { id: 'modalContent' })
					.height(options.height)
					.width(options.width)
					.css({
						marginTop: -((options.height + options.padding.top + options.padding.bottom) / 2) + 'px'
						,marginLeft: -((options.width + options.padding.left + options.padding.right) / 2) + 'px'
						,padding: options.padding.top + "px " + options.padding.right + "px " + options.padding.bottom + "px " + options.padding.left + "px"
					}).append($content).appendTo('body')
				,close : $('<a>', {
					id: 'modalClose'
		            ,'class': 'ir modalRemove'
		            ,title: 'close'
		            ,text: "close"
		            ,href: '#modalRemove'
					,click: function () { context.destroy(); }
				})
			};
			return true;
		}
		,display: function (callback) {
			this.construct();
			$('select').hide();
			modal.overlay.add(modal.content).fadeIn(options.transitionRate, function () {
				//create closeBtn
				if (options.closeBtn) {
					modal.close.appendTo(modal.content); //close button
				}
				if ($.isFunction(callback)) { callback(); }
			});
			return true;
		}
		,destroy: function () {
			modal.close.remove();
			modal.overlay.add(modal.content).fadeOut(options.transitionRate, function () {
				modal.overlay.add(modal.content).remove();
				$('select').show();
			})
			return false;
		}
	};

	return this.each(function () {
		eventListener = (typeof usrOptions.event == 'undefined') ? 'click' : usrOptions.event;
		$(this).bind(eventListener, function (e) {
			e.preventDefault;
			$ref = $(this);
			var presets = {
				target: false	//accept jQuery selected element as alternate target
				//,event:		'click'
				,iframe: false	//load the target in an iframe instead
				,width: false	//if unspecified will use width of target element
				,height: false	//if unspecified will use height of target element
				,opacity: .85		//accept float 0.00-1.00: % opacity of overlay, color determined in .css
				,transitionRate: 500		//accept integer 1-1000 || "fast" || "slow"
				,padding: {				//specify offset (px) target element to modalContent wrapper
					top: 10
					,right: 10
					,bottom: 10
					,left: 10
				}
				,closeBtn: true	//boolean display close button [x]
				,setup: null	//chain constructors of an object: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/call
			};

			//recursively merge usrOptions into options
			options = $.extend(true, presets, usrOptions);

			//perform setup function if specified
			$.isFunction(options.setup) && options.setup();

			//construct and append overlay
			methods.display(callback);

			return false;
		});
	});
};
})(jQuery);