// This file deals with the downloading, saving, and opening of text files
var click_download = document.getElementById("download_click");
click_download.onclick = function() {
    var frm = document.getElementById("form_download");
    frm.action = "/download";
    frm.method = "post";
    frm.submit();
}

var click_save = document.getElementById("save_click");
click_save.onclick = function() {
    //get content from the editor
    var getText = editor.getText();
    getText = getText.trim();
    var fsText = JSON.parse(JSON.stringify(getText));
    console.log("%%%%%%save_click to get fsText%%%%%% " + fsText);
    //submit form using POST method
    document.getElementById("download_input").value = fsText;

    var frm = document.getElementById("form_save");
    frm.action = "/save";
    frm.method = "post";
    frm.submit();

    //alert a notice
    alert('file is saved! please download it!');
}

// choose file to open
function readFile(input) {
    let file = input.files[0];
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function() {

        //set Contents in Quill Editor
        var data = reader.result;
        //transfer to string and replace all \,
        //var newdata = data.toString().replace(/\,/g, " ");
        var newdata = data.toString().replace(/-/g, "-\n")
        console.log("###reading file content: ", newdata);
        editor.setContents([
            { insert: newdata }
        ])
    };

    reader.onerror = function() {
        console.log(reader.error);
    };

}