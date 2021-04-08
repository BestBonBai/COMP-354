// This file contains the code relevant to the Edits Menu
var oldText = editor.getText()
setInterval(function(){
    var newText = editor.getText()
    if (oldText != newText) {
        console.log("Old text:\n")
        console.log(oldText)
        console.log("New text:\n")
        console.log(newText)
        var newEdit = findDiff(oldText, newText)
        console.log("Edit " + newEdit)
        oldText = newText
    }
}, 5000)

function findDiff(str1, str2){ 
    let diff= "";
    str2.split('').forEach(function(val, i){
      if (val != str1.charAt(i))
        diff += val ;         
    });
    return diff;
  }