// This file contains the code relevant to the Edits Menu
var Delta = Quill.import('delta')
var editNumSelected = []

class EditsMenu {
    constructor(quill, options) {
        this.quill = quill;
        this.options = options;
        this.container = document.querySelector(options.container);
        quill.on('text-change', this.update.bind(this));
        this.editorContents = this.quill.getContents();
    }

    populateMenu() {
        var redoStack = []
        var undoStack = []
        var oldContent = ""
        var newContent = ""
        var menuContent = ""
        var insertFlag = false
        var editNum = 1
        editor.history.stack.undo.forEach(element => {
            redoStack = element.redo.ops
            undoStack = element.undo.ops
            redoStack.forEach(edit => {
                if (edit['insert'] != undefined) {
                    newContent = edit['insert']
                    insertFlag = true
                } else if (edit['retain'] != undefined) {

                } else if (edit['delete'] != undefined && !insertFlag) {
                    newContent = ""
                }
            })
            insertFlag = false
            undoStack.forEach(edit => {
                if (edit['insert'] != undefined) {
                    oldContent = edit['insert']
                    insertFlag = true
                } else if (edit['retain'] != undefined) {

                } else if (edit['delete'] != undefined && !insertFlag) {
                    oldContent = ""
                }
            })
            insertFlag = false
            menuContent += `<tr>
                                <td>
                                    <div class="card">
                                        <div class="card-body" >
                                            <h5 class="card-title">Edit ${editNum}</h5>
                                            <p id="editor_old1" class="card-text">Old: ${oldContent}</p>
                                            <p id="editor_new1" class="card-text">New: ${newContent}</p>
                                        </div>
                                            <button class="btn btn-primary" value="${[editNum]}" onclick="editSelected(this.value)" >Select</button>
                                        
                                    </div>
                            
                                </td>
                            </tr>`
            editNum++
            $("#ungrouped-table-body").html(menuContent)
        });
    }

    update() {
        this.populateMenu()
    }
}

Quill.register('modules/editsMenu', EditsMenu, true)

function editSelected(editNum) {
    editNumSelected.push(editNum)
    document.getElementById('deleteEdits').style.display = "block"
    document.getElementById('performEdits').style.display = "block"
}

function performEdits() {
    editNumSelected.forEach(editNum => {
        undoItem = editor.history.stack.undo.splice(editNum - 1, 1)[0].undo.ops
            //TODO: newline char bug
            //TODO: bug when doing different edit when another edit has an old and new
        console.log("Edit NUMBER " + editNum)
        console.log(undoItem)
        editor.updateContents(undoItem)
    })
    document.getElementById('deleteEdits').style.display = "none"
    document.getElementById('performEdits').style.display = "none"
    editNumSelected = []
}

function deleteEdits() {
    editNumSelected.forEach(editNum => {
        editor.history.stack.undo.splice(editNum - 1, 1)
            //TODO: newline char bug
            //TODO: bug when doing different edit when another edit has an old and new
    })
    $("#ungrouped-table-body").html('')
    document.getElementById('deleteEdits').style.display = "none"
    document.getElementById('performEdits').style.display = "none"
    editNumSelected = []
}