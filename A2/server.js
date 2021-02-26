const express = require('express');
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

app.listen(port, () => {
    console.log(`App is running at port: ${port}`);
});