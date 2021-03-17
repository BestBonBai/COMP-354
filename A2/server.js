const express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080

app.use(express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');



// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    res.render('index');
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

var urlencodedParser = bodyParser.urlencoded({ extended: false });
//post download
app.post('/download', urlencodedParser, function(req, res) {
    console.log("###Download File success###");
    res.download('./output.txt');
});

//post save file

app.post('/save', urlencodedParser, function(req, res) {
    var fsData = req.body.download_input;
    //write file
    fs.writeFileSync('./output.txt', fsData);
    console.log("###Save File success###");
});

app.post('/save2', urlencodedParser, function(req, res) {
    var fsData = req.body.download_input2;
    //write file
    fs.writeFileSync('./output.txt', fsData);
    console.log("###Save File success###");
});

//listener
app.listen(port, () => {
    console.log(`App is running at port: ${port}`);
});