// This file contains the code relevant to the Edits Menu
import Quill from 'quill';
import Edit from './edit'
export default class EditsMenu {
    constructor(quill, options) {
        this.quill = quill;
        this.options = options;
        this.container = document.querySelector(options.container);
        quill.on('text-change', this.update.bind(this));
        this.editorContents = this.quill.getContents();
        this.edits = []
        this.groups = []
    }

    populateEdits() {
        var redoStack = []
        var undoStack = []
        var oldContent = ""
        var newContent = ""
        var insertFlag = false
        var editNum = 1
        console.log("UNDO STACK")
        console.log(this.quill.history.stack.undo)
        console.log("REDO STACK")
        console.log(this.quill.history.stack.redo)
        this.quill.history.stack.undo.forEach(element => {
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
            insertFlag = false
            editNum++
        });
    }

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
                                                    <button class="btn btn-primary" value="${edit.number}" onclick="editsMenu.editSelected(this.value)" >Select</button>
                                                    <button class="btn btn-primary" value="${edit.number}" onclick="editsMenu.addToGroup(this.value)" >Add To Group</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>`
            }
        })
        this.groups.forEach(group => {
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
                                                        <button class="btn btn-primary" value="${edit.number}" onclick="editsMenu.editSelected(this.value)" >Select</button>
                                                        <button class="btn btn-primary" value="${edit.number}" onclick="editsMenu.addToGroup(this.value)" >Add To Group</button>
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
                var undoItem = this.quill.history.stack.undo.splice(edit.number-1, 1)[0]
                this.quill.history.stack.redo.unshift(undoItem)
                //TODO: newline char bug
                //TODO: bug when doing different edit when another edit has an old and new
                this.quill.updateContents(undoItem.undo.ops)
                document.getElementById(`edit${edit.number}Selected`).style.display = "none"
            }
        })
        document.getElementById('deleteEdits').style.display = "none"
        document.getElementById('performEdits').style.display = "none"
        this.edits = []
        this.update()
    }
    
    deleteEdits() {
        this.edits.slice().reverse().forEach(edit => {
            if (edit.selected) {
                this.quill.history.stack.undo.splice(edit.number-1, 1)
                //TODO: newline char bug
                //TODO: bug when doing different edit when another edit has an old and new
            }
        })
        $("#ungrouped-table-body").html('')
        document.getElementById('deleteEdits').style.display = "none"
        document.getElementById('performEdits').style.display = "none"
        this.edits = []
        this.update()
    }
    
    addToGroup(editNum) {
        var group = prompt("What group do you want to add this edit to?", "Group A")
        if (group == null || group == "") {
            return
        }
        this.edits[editNum-1].group = group
        if (!this.groups.includes(group)) { this.groups.push(group); }
        this.updateMenu()
    }

    updateGroups() {
        this.groups.forEach((group, index) => {
            var shouldRemove = true
            this.edits.forEach(edit => {
                if (edit.group == group) {

                    shouldRemove = false
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

