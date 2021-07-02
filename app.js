const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const server = http.createServer(app);
app.listen(8080);

app.use(express.json({limit: '2mb'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
});



app.post('/', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});
