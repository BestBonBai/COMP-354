### Smart Editor:
[![Test Run Editor - V2](https://github.com/BestBonBai/COMP-354/actions/workflows/testRun.yml/badge.svg)](https://github.com/BestBonBai/COMP-354/actions/workflows/testRun.yml)


### First install NodeJS and NPM if not already installed.
https://www.npmjs.com/get-npm

### Inside the A2 folder run "npm install" and run "npm install nodemon"

### To run app:
Run 'npm run start' in the A2 directory
or use 'node server.js'

### To run tests:
Run 'npm test' or 'npm run test'

### Test File save and download
Need to set your broswer settings -> Downloads -> Open `Ask where to save each file before downloading` option

### Dependencies
{
    "ejs": "^3.1.6",
    "express": "^4.17.1",
    "jquery": "^3.6.0",
    "nodemon": "^2.0.7",
    "quill": "^1.3.7"
}

### Folder Structure
The folder structure is in line with the usual folder structure for a nodejs app
A2
+-- public
|   +--css
|       +-- style.css
|   +--js
|       +-- All necessary JS files for the app
+-- test
|   +-- All necessary test files
+-- views
|   +-- index.ejs the main html/ejs file for the app
|   +-- pages
|       +-- All necessary .ejs pages
|   +-- partials
|       +-- All necessary .ejs partial pages to be used in index.ejs
+-- server.js - the server/backend code for the app
+-- testsetup.js - Jest test setup file

### Test Group words:
Demo: city words:
```javascript
showgroup: {
    container: '#showgroup',
    // set word group rules
    dicGroup: {
        "Montreal" : "1",
        "Toronto" : "1",
        "Brossard" : "1",
        "Ottawa" : "1",
        "Sherbrooke" : "1"
    }
                    
}
````

### Demo of smoe features:
![Demo1](https://cdn.jsdelivr.net/gh/bestbonbai/bai_cdn@master/img/soen/demo3.gif)

### New features:

### Add Test CI