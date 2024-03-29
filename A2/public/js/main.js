(function($) {

    "use strict";

    var fullHeight = function() {

        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function() {
            $('.js-fullheight').css('height', $(window).height());
        });

    };
    fullHeight();

    $('#sidebarCollapse').on('click', function() {
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
            delay: 5000,
            maxStack: 200,
            userOnly: true
        },
        showgroup: {
            container: '#showgroup',
            // set word group rules
            dicGroup: {
                "Montreal": "1",
                "Toronto": "1",
                "Brossard": "1",
                "Ottawa": "1",
                "Sherbrooke": "1",
                "Concordia": "2",
                "University": "2",
                "School": "2",
                "College": "2",
                "and": "3",
                "with": "3",
                "also": "3"
            }

        },
        editsMenu: {
            container: '#editsMenu',
        }
    },
    placeholder: 'Start typing...',
    theme: 'snow'
};
//editor is a global variable for recall it in other functions       
editor = new Quill('#editor-container', options);
editsMenu = new EditsMenu(editor, options);