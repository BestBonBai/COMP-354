(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

})(jQuery);

var options = {
	debug: 'info',
	modules: {
		toolbar: '#toolbar-container',
		counter: {
			container: '#counter',
			unit: 'word'
		},
		// set history: delay set to 1000, undo would undo all changes that occured within the last 1000 milliseconds. 
		history: {
			delay: 1000,
			maxStack: 200,
			userOnly: true
		},
		showgroup: {
			container: '#showgroup',
			// set word group rules
			dicGroup: {
				"Montreal" : "1",
				"Toronto" : "1",
				"Brossard" : "1",
				"Ottawa" : "1",
				"Sherbrooke" : "1",
				"And" : "1"
			}
			
		}
	},
	placeholder: 'Start typing...',
	theme: 'snow'
};
//editor is a global variable for recall it in other functions       
editor = new Quill('#editor-container', options);