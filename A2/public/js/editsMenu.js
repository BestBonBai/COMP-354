// This file contains the code relevant to the Edits Menu
class EditsMenu {
    constructor(quill, options) {
        this.quill = quill;
        this.options = options;
        this.container = document.querySelector(options.container);
        quill.on('text-change', this.update.bind(this));
        this.editorContents = this.quill.getContents();
        this.edits = []
        this.groups = []
    }
    // Iterates through the undo and redo stacks located in the quill editor and populates the edits array
    populateEdits() {
        var redoStack = []
        var undoStack = []
        var oldContent = ""
        var newContent = ""
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
            if (this.edits[editNum-1]) { // update existing edit
                this.edits[editNum-1].oldContent = oldContent
                this.edits[editNum-1].newContent = newContent
            } else { // create new edit
                this.edits[editNum-1] = new Edit(oldContent, newContent, editNum)
            }
            var text = this.quill.getText();
            if (!text.includes(this.edits[editNum-1].newContent)) {
                this.edits[editNum-1].enabled = false
            } else {
                this.edits[editNum-1].enabled = true
            }
            insertFlag = false
            editNum++
        });
    }

    updateEditNum() {
        this.edits.forEach((edit, index) => {
            edit.number = index + 1
        })
    }

    // updates the Edits Menu with all the edits in the edits array
    updateMenu() {
        var ungroupedContent = ""
        var groupedContent = ""
        var allGroups = ""
        this.edits.forEach(edit => {
            if (edit.group == "") { //ungrouped
                ungroupedContent += `<tr>
                                        <td>
                                            <div class="card">
                                                <div class="card-body">
                                                    <i id="edit${edit.number}Selected"class="fas fa-check-circle" style="float:right; color: #1e56a0; display:none;"></i>
                                                    <h5 class="card-title">Edit ${edit.number}</h5>
                                                    <p id="editor_old1" class="card-text">Old: ${edit.oldContent}</p>
                                                    <p id="editor_new1" class="card-text">New: ${edit.newContent}</p>
                                                    <button class="btn btn-primary" id="edit${edit.number}Button" value="${edit.number}" onclick="editsMenu.editSelected(this.value)" >Select</button>
                                                    <button class="btn btn-primary" value="${edit.number}" onclick="editsMenu.addToGroup(this.value)" >Add To Group</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>`
            }
        })
        this.groups.forEach(group => { //grouped
            var groupHeader = `<tr>
                                    <th class="subtitle" scope="col">${group} <button class="btn btn-primary" value="${group}" style="float:right;" onclick="editsMenu.groupSelected(this.value)">Select All</button></th>
                                </tr>`
            groupedContent = ""
            this.edits.forEach(edit => {
                if (edit.group == group ) {
                    groupedContent += `<tr>
                                            <td>
                                                <div class="card">
                                                    <div class="card-body">
                                                        <i id="edit${edit.number}Selected"class="fas fa-check-circle" style="float:right; color: #1e56a0; display:none;"></i>
                                                        <h5 class="card-title">Edit ${edit.number}</h5>
                                                        <p id="editor_old1" class="card-text">Old: ${edit.oldContent}</p>
                                                        <p id="editor_new1" class="card-text">New: ${edit.newContent}</p>
                                                        <button class="btn btn-primary" id="edit${edit.number}Button" value="${edit.number}" onclick="editsMenu.editSelected(this.value)" >Select</button>
                                                        <button class="btn btn-primary" value="${edit.number}" onclick="editsMenu.addToGroup(this.value)" >Change Group</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>`
                }
            })
            allGroups += groupHeader + groupedContent
        })
        $("#ungrouped-table-body").html(ungroupedContent)
        $("#grouped-table-body").html(allGroups)

        // Disable edit if user has entered a new edit within another edit
        this.edits.forEach(edit => { 
            if (edit.enabled) {
                console.log("Enabling edit..." + edit.number)
                document.getElementById(`edit${edit.number}Button`).disabled = false
            } else {
                console.log("Disabling edit..." + edit.number)
                document.getElementById(`edit${edit.number}Button`).disabled = true
            }
        })
    }

    editSelected(editNum) {
        this.edits[editNum-1].selected = true
        document.getElementById('deleteEdits').style.display = "inline-block"
        document.getElementById('performEdits').style.display = "inline-block"
        document.getElementById(`edit${editNum}Selected`).style.display = "block"
    }

    groupSelected(group) {
        this.edits.forEach(edit => {
            if (edit.group == group) {
                this.editSelected(edit.number)
            }
        })
    }
    
    performEdits() {
        this.edits.slice().reverse().forEach(edit => {
            if (edit.selected) {
                var undoItem = editor.history.stack.undo.splice(edit.number-1, 1)[0]
                // Handles cases when there are new lines in the edit
                undoItem.undo.ops.forEach((op,index) => { 
                    if (op['retain'] == 1 && (index+1) < undoItem.undo.ops.length && undoItem.undo.ops[index+1]['delete'] == 1) {
                        undoItem.undo.ops.splice(index, 2)
                        if (index > 0 && undoItem.undo.ops[index-1]['delete']) {
                            undoItem.undo.ops[index-1]['delete'] += 1
                        }
                    } else if (edit.newContent.includes('\n') && op['retain'] == 1) {
                        undoItem.undo.ops.splice(index, 1)
                    }
                })
                var lenEdit = 0
                if (undoItem.undo.ops[0]["delete"]) {
                    lenEdit = undoItem.undo.ops[0]["delete"] 
                }
                var i;
                for (i = edit.number-1; i < editor.history.stack.undo.length; i++) {
                    editor.history.stack.undo[i].undo.ops[0]["retain"] -= lenEdit;
                    if (editor.history.stack.undo[i].undo.ops[0]["retain"] == 0 ) {
                        editor.history.stack.undo[i].undo.ops.splice(0, 1)
                    }
                }
                editor.history.stack.undo.push(undoItem)
                editor.history.undo()
                console.log("Successful undo")
                document.getElementById(`edit${edit.number}Selected`).style.display = "none"
            }
        })
        this.edits = this.edits.filter(function(edit) {
            return !edit.selected
        })
        this.updateEditNum()
        document.getElementById('deleteEdits').style.display = "none"
        document.getElementById('performEdits').style.display = "none"
        this.update()
    }
    
    deleteEdits() {
        this.edits.slice().reverse().forEach(edit => {
            if (edit.selected) {
                editor.history.stack.undo.splice(edit.number-1, 1)
            }
        })
        this.edits = this.edits.filter(function(edit) {
            return !edit.selected
        })
        this.updateEditNum()
        $("#ungrouped-table-body").html('')
        document.getElementById('deleteEdits').style.display = "none"
        document.getElementById('performEdits').style.display = "none"
        this.update()
    }
    
    addToGroup(editNum) {
        var group = prompt("What group do you want to add this edit to?", "Group A")
        if (group == null || group == "") {
            this.edits[editNum-1].group = ""
            return
        }
        this.edits[editNum-1].group = group
        if (!this.groups.includes(group)) { this.groups.push(group); }
        this.updateMenu()
    }

    updateGroups() {
        this.groups.forEach((group, index) => {
            console.log(group)
            var shouldRemove = true
            this.edits.forEach(edit => {
                console.log("Edit:"+edit.newContent+" group:"+edit.group)
                if (edit.group == group) {
                    shouldRemove = false
                    console.log("Keep this group")
                }
            })
            if (shouldRemove) { this.groups.splice(index, 1); }
        })
    }

    update() {
        this.populateEdits()
        this.updateGroups()
        this.updateMenu()
    }
}

Quill.register('modules/editsMenu', EditsMenu, true)
