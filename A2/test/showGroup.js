import Quill from 'quill';
export default class ShowGroup {
    constructor(quill, options) {
        this.quill = quill;
        this.options = options;
        this.container = document.querySelector(options.container);
        quill.on('text-change', this.update.bind(this));
        this.update();

    }

    compareSentence() {

    }

    compareWord() {
        let text = this.quill.getText();
        text = text.trim();
        var arrText = JSON.parse(JSON.stringify(text));
        var oldText = arrText;
        console.log("Print arrText: ", arrText);
        // Splitting text returns a non-empty array
        var arrWord = arrText.split(/\s+/);
        console.log("Print arrWord: ", arrWord);

        //groupList
        //const alistGroup = JSON.parse(JSON.stringify(this.options.dicGroup));
        const alistGroup = {"Montreal":"1", "Toronto":"1", "Brossard":"1"};
        console.log("List Group Rules : ", alistGroup);
        var arrGroup1 = [];
        var newContent = []; //array for new content without group words
        //compare with groupDic
        arrWord.forEach(element => {
            if (alistGroup.hasOwnProperty(element)) {
                //assign a word into different group (e.g group1, group2)
                if (alistGroup[element] == "1") {
                    arrGroup1.push(element);
                    console.log("Finding word of groupDic : ", element, ",in Group : ", alistGroup[element]);
                }
            } else {
                // use JSON if we have more groups, now we use array
                newContent.push(element);
                console.log("---newNoGroupContent---", newContent);
            }

        });

        console.log("List all matched words: ", arrGroup1);
        var e2 = "";
        newContent.forEach(element => {
            e2 = e2 + " " + element;
        });
        $("#editor_new1").html("New: " + e2);



        //add undoByGroupclick event
        var click_undoByGroup = document.getElementById("undoByGroup_click");

        click_undoByGroup.onclick = function() {
            //alert("testing");
            console.log("Deleting the matched words in text...");

            //transfer to string and replace all \,
            var newText = newContent.toString().replace(/\,/g, " ");
            // set new text after remove the pecific group words
            editor.setContents([
                { insert: newText }
            ]);

            var redoType = 1;
            if (redoType == 1) {
                var click_redo = document.getElementById("redo_click");
                click_redo.onclick = function() {
                    console.log("Successful Redo Group...");
                    editor.setContents([
                        { insert: oldText }
                    ])
                    redoType = 0;
                }

            }

        }






        return arrGroup1;

    }

    update() {
        var showText = this.compareWord();

        var mytitle = 'Display all matched words: ';
        //this.container.innerText = mytitle + showText;
        document.getElementById('counter').innerText = mytitle + showText;
        //update EditorMenu content
        var title1 = 'Old: ';
        var title2 = 'New: ';
        console.log("@@@@@@@@@@ " + showText);
        var e1 = "";
        showText.forEach(element => {
            e1 = e1 + " " + element;
        });
        $("#editor_old1").html(title1 + e1);
    }



}


Quill.register('modules/showgroup', ShowGroup);