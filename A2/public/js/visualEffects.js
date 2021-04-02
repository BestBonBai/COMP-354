// 3 switch buttons 
// switch button for Preview MarkDown mode
var btn_preview = document.getElementById('preview-btn');
var body = document.querySelector('body');
var isPreview = true;
var isSetting = true;  
var isHelp = true;
btn_preview.onclick = function() {
    //set same height for div
    $("#content-preview").height($("#content-container").height());

    if (isPreview == true) {
        document.body.classList.add('preview');
        document.body.classList.remove('settings');
        document.body.classList.remove('help');
        isPreview = false;
        isSetting = true;  
        isHelp = true;
        // create preview markdown content form the Editor
        document.getElementById("content-preview").innerHTML = marked(editor.getText());
    } else {
        document.body.classList.remove('preview');
        isPreview = true;
    }
    
}

// switch button for click setting button
function click_setting(){
    //set same height for div
    $("#content-settings").height($("#content-container").height());
    var body = document.querySelector('body');           
    if (isSetting == true) {
        document.body.classList.add('settings');
        document.body.classList.remove('preview');
        document.body.classList.remove('help');
        isSetting = false;
        isPreview = true;
        isHelp = true;
    } else {
        document.body.classList.remove('settings');
        isSetting = true;
    }        
}

// switch button for click help button
function click_help(){
    //set same height for div
    $("#content-help").height($("#content-container").height());
    var body = document.querySelector('body');           
    if (isHelp == true) {
        document.body.classList.add('help');
        document.body.classList.remove('preview');
        document.body.classList.remove('settings');
        isHelp = false;
        isSetting = true;
        isPreview = true;
    } else {
        document.body.classList.remove('help');
        isHelp = true;
    }        
}

//function to preview Markdonwn from Editor
$("#editor-container").on("keyup blur", function(){
        if(isPreview == false ){
        document.getElementById("content-preview").innerHTML = marked(editor.getText());
    }

})

//set marked and highlighter js
marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code) {
        return hljs.highlightAuto(code).value;
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
    }
);

// switch button for backgroud color
var btn = document.getElementById('btn');
var body = document.querySelector('body');
var isLight = true;
btn.onclick = function() {
    if (isLight == true) {
        document.body.classList.add('night');
        // body.style.backgroundColor = '#000';
        isLight = false;
    } else {
        document.body.classList.remove('night');
        // body.style.backgroundColor = '#fff';
        isLight = true;
    }
}

// set synchronize scroll

// colorful switch button for wonderful backgroud color
$(document).ready(function(){
    var btn_color = document.getElementById('color-btn');
    var body = document.querySelector('body');
    var isColor = true;
    var isStop = false;
    btn_color.onclick = function() {
        if ( isColor ) {
            //document.body.classList.add('color');
            isColor = false;
            var colors = new Array([62,35,255],[60,255,60],[255,35,98],[45,175,230],[255,0,255],[255,128,0]);
            var step = 0;
            //color table indices for: 
            // current color left
            // next color left
            // current color right
            // next color right
            var colorIndices = [0,1,2,3];
            //transition speed
            var gradientSpeed = 0.002;
            function updateGradient(){
                if ( isStop ) {
                    clearInterval(timer1);
                    isStop = false;
                    return;
                }
                
                var c0_0 = colors[colorIndices[0]];
                var c0_1 = colors[colorIndices[1]];
                var c1_0 = colors[colorIndices[2]];
                var c1_1 = colors[colorIndices[3]];

                var istep = 1 - step;
                var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
                var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
                var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
                var color1 = "rgb("+r1+","+g1+","+b1+")";

                var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
                var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
                var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
                var color2 = "rgb("+r2+","+g2+","+b2+")";

                $('#content').css({
                    background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
                    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
                
                step += gradientSpeed;
                if ( step >= 1 )
                {
                    step %= 1;
                    colorIndices[0] = colorIndices[1];
                    colorIndices[2] = colorIndices[3];
                    
                    //pick two new target color indices
                    //do not pick the same as the current one
                    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
                    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
                    
                }
            }
            if(isStop == false){
                var timer1 = setInterval(updateGradient,20);
            }
            
            
            
        } else {
            //document.body.classList.remove('color');
            isColor = true;
            if (isStop == false){
                $('#content').css('background', '');
                isStop = true;
            }
            
        }

    }

});