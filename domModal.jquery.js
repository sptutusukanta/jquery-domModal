/**
 * domModal https://github.com/oomlaut/domModal
 * [description]
 *
 * Copyright (c) 2011 Paul Gueller (http://paulgueller.com)
 * Dual licensed under the MIT and GPL licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-license.php
 *
 * Inspired by
 * thickbox		http://jquery.com/demo/thickbox/
 * simplemodal	http://www.ericmmartin.com/projects/simplemodal/
 * squeezebox	http://digitarald.de/project/squeezebox/
 *
 */
 
/*!TODO:
 * - ajax .load() content from another document w/o iframes
 * - true "modal" functionality: do not destroy overlays until explicit button/link is clicked
 *
 */

;(function($){
	/** jQuery().domModal();
	 *
	 * @desc simple modal
	 * @author Paul Gueller
	 * @version 1.0
	 *
	 * @name domModal
	 * @param Object usrOptions Options for the modal overlay and content window. Details listed in 'options' declaration
	 * @param Function callback Called after #modalContent is appended to <body> and .fadeIn() animation completes
	 * @type jQuery
	 * @cat plugins/"windows and overlays"
	 *
	 **/
    jQuery.fn.domModal = function(usrOptions, callback){
        return this.each(function(){
            $this = $(this);
            $this.bind('click', function(e){
                e.preventDefault;
				
				//establish basic options
				var options = {
					target:			false	//accept jQuery selected element as alternate target
					,width:			false	//if unspecified will use width of target element
					,height:		false	//if unspecified will use height of target element
					,opacity:		.85		//accept float 0.00-1.00: % opacity of overlay, color determined in .css
					,transitionRate:250		//accept integer 1-1000 || "fast" || "slow"
					,padding: {				//specify offset (px) target element to modalContent wrapper
						top:        25
						,right:     25
						,bottom:    25
						,left:      25
					}
					,closeBtn:		true	//boolean display close button [x]
					,setup:			null	//chain constructors of an object: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/call
				};
				
				//recursively merge usrOptions into options
				$.extend(true,options,usrOptions);

                //perform setup function if specified
                $.isFunction(options.setup) && options.setup();
				
				//gather information about element target
				options.target = (options.target) ? options.target : $($(this).attr('href'));
				options.width = (options.width) ? options.width : options.target.width();
				options.height = (options.height) ? options.height : options.target.height();

				//construct and append overlay
                var $modalOverlay = $('<div>', {
                    id:'modalOverlay'
                    ,'class':'modalRemove'
                    }).css({opacity:options.opacity}).appendTo('body').fadeIn(options.transitionRate);
                
				//construct and append modal content
                var $modalContent = $('<div>', {id:'modalContent'})
					.height(options.height)
					.width(options.width)
					.css({
						marginTop: -((options.height + options.padding.top + options.padding.bottom) / 2) + 'px'
						,marginLeft: -((options.width + options.padding.left + options.padding.right) /2) + 'px'
						,padding: options.padding.top + "px " + options.padding.right + "px " + options.padding.bottom + "px " + options.padding.left + "px"
					})//wrapper
                    .append(options.target.clone().css({display:'block'}))//cloned content
                    .appendTo('body').fadeIn(options.transitionRate, function(){ if($.isFunction(callback)){ callback(); } } );

				//create closeBtn
				if(options.closeBtn) {
                    $modalContent.append($('<a>', {
                        id:'modalClose'
                        ,'class':'modalRemove'
                        ,title:'close'
                        ,text:"close"
                        ,href:'#modalRemove'
                        }))//close button
                }
				
				// destroy modal window
				// bind onclick event to selector
				$('.modalRemove').bind('click', function(e){
					e.preventDefault;
					$('#modalOverlay, #modalContent').fadeOut(options.transitionRate, function(){
						$('#modalOverlay, #modalContent').remove();
					});
					return false;
				});
                return false;
            });
        });
    };
})(jQuery);