var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var multer = require('multer');
var httpServer = http.Server(app);
var done= false;

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
app.post('/',function(req,res){
  if(done==true){
    console.log(req.files);
    res.status(204).end();
  }
});
app.listen(3000);