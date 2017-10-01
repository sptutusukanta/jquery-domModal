/**
 * domModal https://github.com/oomlaut/domModal.jquery.js
 *
 * @author Paul Gueller (http://paulgueller.com)
 * @version 1.4.0
 * @since 2011-0723
 * 
 * Dual licensed under the MIT and GPL licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-license.php
 */

;(function($){
/** jQuery().domModal();
 *
 * @name domModal
 * @param options user-provided settings for the modal overlay and content window.
 * @param Function callbackDisplay Executed after #modalContent is appended to <body> and .fadeIn() animation completes
 * @param Function callbackDestroy Executed after #modelContent is removed
 * @type jQuery
 * @cat plugins/"windows and overlays"
 *
 */
jQuery.fn.domModal = function (options, callbackDisplay, callbackDestroy) {
	//modal containers
	var modal = {};
	var $ref;
	
	var defaults = {
		target: false
		,event:	'click'
		,iframe: false
		,width: false
		,height: false
		,opacity: .85
		,transitionRate: 500
		,closeBtn: true
		,closeModal: null
		,setup: null
	};

	var settings = $.extend(true, defaults, options);
	
	var methods = {
		construct: function () {
			var context = this;
			settings.iframe = (settings.iframe) ? settings.iframe : ($ref.attr('rel') == 'iframe');
			if (settings.iframe) {
				settings.target = (settings.target) ? settings.target : $ref.attr('href');
				settings.height = (settings.height) ? settings.height : 600;
				settings.width = (settings.width) ? settings.width : 800;
				$content = $('<iframe>', {
					id: 'modalContentIframe'
					,name: 'modalContentIframe'
					,frameborder: 0
					,height: settings.height
					,width: settings.width
					,scrolling: 'auto'
					,src: settings.target
					,onload: function (){ }
				});
			} else {
				settings.target = (settings.target) ? settings.target : $($ref.attr('href'));
				settings.width = (settings.width) ? settings.width : settings.target.width();
				settings.height = (settings.height) ? settings.height : settings.target.height();
				$content = settings.target.clone().css({ display: 'block' });
			}
			modal = {
				overlay : $('<div>', {
					id: 'modalOverlay'
					,'class': 'modalRemove'
					,click: function () { return !context.destroy(); }
					}).css({ opacity: settings.opacity }).appendTo('body')
				,content : $('<div>', { id: 'modalContent' })
					.height(settings.height)
					.width(settings.width)
					.append($content).appendTo('body')
				,close : $('<a>', {
					id: 'modalClose'
		            ,'class': 'ir modalRemove'
		            ,title: 'close'
		            ,text: "close"
		            ,href: '#modalRemove'
					,click: function () { return !context.destroy(); }
				})
			};

            if (settings.closeModal) {
                modal.content.find(settings.closeModal).click(function(){
                    return !context.destroy();
                });
            }

			return true;
		}
		,display: function () {
			this.construct();
			$('select').addClass('modalmod').hide();
			modal.overlay.add(modal.content.css({
						marginTop: -(modal.content.outerHeight() / 2) + 'px'
						,marginLeft: -(modal.content.outerWidth() / 2) + 'px'
					})
			).fadeIn(settings.transitionRate, function () {
				if (settings.closeBtn) {
					modal.close.appendTo(modal.content);
				}
			});
			if($.isFunction(callbackDisplay)) { callbackDisplay(); }
			return true;
		}
		,destroy: function () {
			modal.close.remove();
			modal.overlay.add(modal.content).fadeOut(settings.transitionRate, function () {
				modal.overlay.add(modal.content).remove();
				$('select.modalmod').show();
			})
			if($.isFunction(callbackDestroy)) { callbackDestroy(); }
			return true;
		}
	};

	return this.each(function () {
		$(this).bind(settings.event, function () {
			$ref = $(this);
			$.isFunction(settings.setup) && settings.setup();
			methods.display();
			return false;
		});
	});
};
})(jQuery);