const express = require('express');
const app = express();
const port = process.env.PORT || 8080

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(port, () => {
    console.log(`App is running at port: ${port}`);
});