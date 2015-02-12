domModal.jquery.js
==================

A lightweight jQuery plug-in to load content from elsewhere in the DOM into a modal overlay.

[![endorse](http://api.coderwall.com/oomlaut/endorsecount.png)](http://coderwall.com/oomlaut)

FEATURES
--------

* Clean separation of markup and styling
* Callback functions available on modal display and destroy
* Load from the DOM, or in an `iframe`

REQUIREMENTS
------------

* jQuery v1.3 or above

INSTALLATION
------------

Include script after the jQuery library (unless you are packaging scripts somehow else):

	<script src="/path/to/domModal.jQuery.js"></script>

Insert the styles within your stylesheet or link to it in the HEAD

	<link href="/path/to/domModal.css" rel="stylesheet">

USAGE
-----

	jQuery('a[rel*="modal"]').domModal();

Each member of a selected set based on the href attribute from `a` elements with rel="modal"
	
	jQuery('a[href*="http://"]').domModal({closeBtn: false, transitionRate: "slow"});

Options specified to omit the close button and to tansition slowly in effect.

	jQuery('input#googleBtn').domModal({iframe: true, height: 600, width: 450, event: 'customEvent'});

Load modal content in an `iframe`


OPTIONS
-------

* `target` An alternate jQuery selected element as target. Default value: _false_
* `event` Event on which to construct the overlay. Default value: _click_
* `iframe` Load the target in an iframe instead Default value: _false_
* `width` If unspecified, will use width of target element.  Default value: _false_
* `height` If unspecified, will use height of target element. Default value: _false_
* `opacity` Translucency (0.00-1.00) of overlay background fill. Default value: _.85_
* `transitionRate` Duration (integer 1-1000 || "fast" || "slow") of effects. Default value: _500_
* `closeBtn` Display a "close" button. Default value: _true_
* `setup` Function to be performed prior to overlay construction. Default value: _null_


CHANGELOG
---------


DEVELOPMENT
-----------
* Source hosted at [GitHub][gh]
* Please report all issues, questions, and feature requests to [GitHub Issues][ghi]
* Pull requests are definitely encouraged! Please test your code before submitting however.

 

CREDITS
-------
* Originally inspired by [Thickbox][tb]
* Plugin structure and callback inclusion inspired by [Simplemodal][sm]
* Bind to custom event inspired by [Squeezebox][sb]
	


AUTHORS
-------
[Paul Gueller][pg]

[gh]: https://github.com/oomlaut/domModal.jquery.js
[ghi]: https://github.com/oomlaut/domModal.jquery.js/issues
[tb]: http://jquery.com/demo/thickbox/
[sm]: http://www.ericmmartin.com/projects/simplemodal/
[sb]: http://digitarald.de/project/squeezebox/
[pg]: http://paulgueller.com
