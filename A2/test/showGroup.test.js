import { TestScheduler } from "@jest/core";

var showGroup;
var editor;
beforeAll(() => {
    document.head.innerHTML = `<title>CLS - Smart Text Editor</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  
    <!-- Some CSS Bai-->
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900" rel="stylesheet">	
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/highlight.js/9.18.1/styles/monokai-sublime.min.css" rel="stylesheet">
    <!-- Bootstrap scripts-->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <!-- Markdown and highlight scripts -->
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js"></script>
    <!-- Font Awesome -->
    <script src="https://kit.fontawesome.com/af2dbfdb7d.js" crossorigin="anonymous"></script>
    <!-- QuillJS load -->
    <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
    <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
    <script src="js/edit.js" defer></script>
    <script src="js/counter.js" defer></script>
    <script src="js/showGroup.js" defer></script>
    <script src="js/editsMenu.js" defer></script>
    <script src="js/main.js" defer></script>
    <script src="js/editsManager.js" defer></script>
    <script src="js/fileManager.js" defer></script>
    <script src="js/textEditor.js" defer></script>
    <script src="js/textToSpeech.js" defer></script>
    <script src="js/visualEffects.js" defer></script>
    <script src="js/FileSaver.js" defer></script>`

    document.body.innerHTML = `<%- include('partials/navbar'); %>
    
    <div class="row">
      <div class="col-md-3 no-gutters" id="editsMenu">
          <%- include('partials/editsMenu'); %>
      </div>
      <div class="col-md-9 no-gutters" id="editor">
          <div>
              <button id="file-btn" class="btn btn-primary btn-sm" onclick="upload.click()" title="Open File">
              <span>choose file</span></button>
              <input type="file" name="upload" id="upload" onchange="readFile(this)" style="display: none;" >
              <!-- Speak Button  -->
              <button id="speakText-btn" class="btn btn-primary btn-sm" title="Speak Text"><span class="fa fa-volume-up"></span> </button>
              <!-- Preview Button  -->
              <button id="preview-btn" class="btn btn-primary btn-sm" title="Preview Markdown"><span class="fa fa-eye">&nbsp;preview</span></button>
              <button id="undoByTime_click" class="btn btn-primary btn-sm">Undo (Time)</button>
              <button id="undoByGroup_click" class="btn btn-primary btn-sm">Undo (Group)</button>
              <button id="redo_click" class="btn btn-primary btn-sm">Redo</button>
            </div>
            
            <div id="content-container">
    
              <div id="toolbar-container">
                  <select class="ql-size" data-toggle="tooltip" data-placement="top" title="Change font size">
                      <!-- Add font size dropdown -->
                      <option value="small"></option>
                      <option value="normal" selected></option>
                      <option value="large"></option>
                      <option value="huge"></option>
                  </select>
                  <select class="ql-font" data-toggle="tooltip" data-placement="top" title="Change font">
                      <!-- Add font dropdown -->
                      <option value="sans"></option>
                      <option value="serif" selected></option>
                      <option value="monospace"></option>   
                  </select>
                  <button class="ql-bold" data-toggle="tooltip" data-placement="top" title="Bold"></button>
                  <button class="ql-italic" data-toggle="tooltip" data-placement="top" title="Add italic text"></button>
                  <button class="ql-underline" data-toggle="tooltip" data-placement="top" title="Underline"></button>
                  <button class="ql-strike" data-toggle="tooltip" data-placement="top" title="StrikeThrough"></button>
                  <button class="ql-blockquote" data-toggle="tooltip" data-placement="top" title="Blockquote"></button>
                  <button class="ql-code-block" data-toggle="tooltip" data-placement="top" title="Code Block"></button>
                  <button class="ql-list" value="ordered" data-toggle="tooltip" data-placement="top" title="Order List"></button>
                  <button class="ql-list" value="bullet" data-toggle="tooltip" data-placement="top" title="Bullet List"></button>
                  <button class="ql-color" value="red" data-toggle="tooltip" data-placement="top" title="Change Color"></button>
                  <button class="ql-background" value="blue" data-toggle="tooltip" data-placement="top" title="Change Background"></button>
              </div>
              
              <div id="editor-container"></div>
          
              <!-- Add counter DIV -->
              <div id="counter"></div>
          
              <!-- Add group display DIV -->
              <div id="showgroup"></div>
              <div class="action-btn">
                  <button id="performEdits" class="btn btn-primary" onclick="editsMenu.performEdits()">Undo Selected Edit(s)</button>
                  <button id="deleteEdits" class="btn btn-primary" onclick="editsMenu.deleteEdits()">Delete Selected Edit(s)</button>
              </div>
          
            </div>
               
            
            <!-- Preview Content  -->
            <div id="content-preview">
                <p>Test preview </p>
            </div>
    
            <!-- Settings Content  -->
            <div id="content-settings">
                <h3 style=" text-align: center;">Settings </h3>
                <p>Developing...(need add button, range, checkbox, etc.)</p>
                <p>Developing...(need more settings)</p>
                <ul>
                  <li>
                    <a href="#"> MaxStack</a>
                  </li>
                  <li>
                    <a href="#">UndoByTiming</a>
                  </li>
                 </ul> 
            </div>
    
            <!-- Help Content  -->
            <div id="content-help">
                <%- include('pages/help'); %>
            </div>
    
          </div>
      </div>
    </div>

          <!-- Read File  -->
        
  </div>`

  var options = {
    debug: 'info',
    modules: {
        toolbar: '#toolbar-container',
        counter: {
            container: '#counter',
            unit: 'word'
        },
        // set history: delay set to 1000, undo would undo all changes that occured within the last 1000 milliseconds. 
        history: {
            delay: 5000,
            maxStack: 200,
            userOnly: false
        },
        showgroup: {
            container: '#showgroup',
            // set word group rules
            dicGroup: {
                "Montreal": "1",
                "Toronto": "1",
                "Brossard": "1",
                "Ottawa": "1",
                "Sherbrooke": "1",
                "And": "1"
            },
            dicGroupSentence: {
                "this is a group": "1",
                "test 1": "1"
            }

		},
		editsMenu: {
			container: '#editsMenu',
		}
    },
    placeholder: 'Start typing...',
    theme: 'snow'
};


//editor is a global variable for recall it in other functions       
editor = new Quill('#editor-container', options);
showGroup = new ShowGroup(editor, options);
//counter.container.innerText= document.querySelector(options.container);

});




it("Group words", () => {
    editor.updateContents([{
    insert: "Brossard, Montreal, Toronto"

        }]);
    expect(showGroup.compareWord()).toContain('Toronto');
  });