// the class is for test undo by group display in Quill
class showGroup {
    constructor(quill, options) {
        this.quill = quill;
        this.options = options;
        this.container = document.querySelector(options.container);
        quill.on('text-change', this.update.bind(this));
        this.update();

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
        const alistGroup = JSON.parse(JSON.stringify(this.options.dicGroup));
        console.log("List Group Rules : ", alistGroup);
        var arrGroup1 = [];
        var newContent = []; //array for new content without group words
        //compare with groupDic
        arrWord.forEach(element => {
            if (alistGroup.hasOwnProperty(element)) {
                //assign a word into different group (e.g group1, group2)
                //if (alistGroup[element] == "1") {
                arrGroup1.push(element);
                console.log("Finding word of groupDic : ", element, ",in Group : ", alistGroup[element]);
                //}
            } else {
                // use JSON if we have more groups, now we use array
                newContent.push(element);
                console.log("---newNoGroupContent---", newContent);
            }

        });

        return arrGroup1;

    }

    update() {
        var showText = this.compareWord();

        var mytitle = `<p>Display all matched words group ideas: `

        //update showGroup content
        this.listWordGroup(showText, mytitle);

    }

    listWordGroup(showText, mytitle) {
        const alistGroup = JSON.parse(JSON.stringify(this.options.dicGroup));
        var disListWord = "";
        var count = 0;

        var uniShowText = this.unique(showText);
        uniShowText.forEach(element => {

            if (alistGroup.hasOwnProperty(element)) {
                count += 1;
                var listWordIdea = "";
                for (var item in alistGroup) {
                    if (alistGroup[item] == alistGroup[element] && item != element) {
                        listWordIdea += item + ", ";
                        //console.log("&&&&&&&&&&223 " + item);
                    }
                }
                // alistGroup.forEach(e2 => {
                //     if (alistGroup[e2] == alistGroup[element] && e2 != element) {
                //         listWordIdea += e2 + ", ";
                //     }
                // });
                listWordIdea = listWordIdea.substring(0, listWordIdea.length - 2);

                disListWord += ` [Word ${count}] ${element} :: ${listWordIdea}.`
            }
        });

        $("#showgroup").html(mytitle + disListWord + `</p>`);

    }

    unique(arr) {
        return arr.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], []);
    }




}


Quill.register('modules/showgroup', showGroup);