// Speak Text function (Not support IE)
function speakText(text, volume=1, pitch=0.95, rate=1, lang='en-US'){
    const announcement = new SpeechSynthesisUtterance();
    announcement.pitch = pitch;
    announcement.rate = rate;
    announcement.volume = volume;
    announcement.lang = lang;
    announcement.text = text;
    //attention the below speechSynthesis is not capital first letter
    window.speechSynthesis.speak(announcement);
}
// click read button to speak text of the editor
var click_read = document.getElementById('speakText-btn');
click_read.onclick = function() {
    //get content from the editor
    var getText = editor.getText();
    getText = getText.trim();
    var fsText = JSON.parse(JSON.stringify(getText));
    //recall speak function
    speakText(fsText);
    console.log('##### Speak Text Success!!!#####')
}