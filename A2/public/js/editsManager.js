// This file contains the necessary code for the Undo, Redo and Delete functionalies
// The undo stack will also be located here

// Undo
var click_undoByTime = document.getElementById("undoByTime_click");
click_undoByTime.onclick = function() {
    console.log("Successful Undo By Timing...");
    console.log("Before undo:\n");
    console.log(editor.history.stack);
    editor.history.undo() ;

    var history = editor.history.stack;
    console.log("History:\n")
    console.log(history)

    
    console.log("Editor history: " + editor.history);
    
}

// Simple Redo
var click_redo = document.getElementById("redo_click");
click_redo.onclick = function() {
    console.log("Successful Redo...");
    editor.history.redo();
}