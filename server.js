var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var multer = require('multer');
var httpServer = http.Server(app);
var done= false;
var state = require('./js/game-state-module.js');

app.use(express.static(__dirname));

app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return fieldname
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.htm');
});
app.get('/test', function(req, res){
    res.send('{"var" : "fish", "array" : [1,2,3,4]}');
    console.log(state);
    state.startJam();
});
app.post('/',function(req,res){
  if(done==true){
    console.log(req.files);
    res.status(204).end();
  }
});
app.listen(3000);