const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;

app.use(express.static(path.join(__dirname, 'public')));



app.use('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})



const server = http.createServer(app);
app.listen(8080);



const Http = new XMLHttpRequest();

