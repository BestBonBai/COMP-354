// the class is for test undo by group display in Quill
class showGroup {
    constructor(quill, options) {
        this.quill = quill;
        this.options = options;
        this.container = document.querySelector(options.container);
        quill.on('text-change', this.update.bind(this));
        this.update();

        //groupList
        var alistGroup = document.querySelector(options.dictionary);
        this.testgroup(alistGroup);
    }

    compareWord() {
        let text = this.quill.getText();

        if (this.options.display === 'group') {
            text = text.trim();
            // Splitting empty text returns a non-empty array
            return text.length > 0 ? text.split(/\s+/) : 0;
        } else {
            return text;
        }

    }

    update() {
        var showText = this.compareWord();
        var mytitle = 'Display words in group library: '
        this.container.innerText = mytitle + showText;
    }

    testgroup(a) {
        this.container.innerText = a;
    }

}


Quill.register('modules/showgroup', showGroup);