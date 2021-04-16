// This file contains the necessary code for the Undo, Redo and Delete functionalies
// The undo stack will also be located here

// Undo
var click_undoByTime = document.getElementById("undoByTime_click");
click_undoByTime.onclick = function() {
    console.log("Successful Undo By Timing...");
    editor.history.undo() ;
    console.log("UNDO STACK in undo by time")
    console.log(editor.history.stack.undo)
    editsMenu.edits = [];
    editsMenu.update();
}

// Simple Redo
var click_redo = document.getElementById("redo_click");
click_redo.onclick = function() {
    console.log("Successful Redo...");
    editor.history.redo();
    editsMenu.edits = [];
    editsMenu.update();
}