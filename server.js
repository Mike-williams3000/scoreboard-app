var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var httpServer = http.Server(app);
var io = require('socket.io')(httpServer);
var timerMod = require('./js/timer-test-module.js');
timerMod.createClocks();
var state = require('./js/game-state-module.js');
var GAMEDATA = require('./js/game_data.js');
var swig = require('swig');
var network = require('./js/network_module.js');

var dataControl = require('./js/data_control.js');

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/templates');
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/index', function(req, res){
    res.render('index');
    console.log("file sent");
    
});
app.get('/scoretracker', function(req, res){
    res.render('scoretracker');
    console.log("file sent");
    
});

app.get('/start', function(req, res){
    res.send('{"var" : "steated", "array" : [1,2,3,4]}');
    console.log(state);
    state.startJam();
});
app.get('/stop', function(req, res){
    res.send('{"var" : "stopped", "array" : [1,2,3,4]}');
    console.log(state);
    state.stopJam();
});
app.get('/callOTO', function(req, res){
    res.send('{"var" : "OTO", "array" : [1,2,3,4]}');
    console.log(state);
    state.callOTO();
});
app.get('/callTTO', function(req, res){
    res.send('{"var" : "TTO", "array" : [1,2,3,4]}');
    console.log(state);
    state.callTTO();
});
app.get('/score', function(req, res){
    //res.send(req);
    //console.log(state);
    console.log(req.body);
    //state.addPoints(req)
});
app.post('/score', function(req, res){
    GAMEDATA.addPoints(req.body.selectedTeam, parseInt(req.body.points));
    res.send(GAMEDATA.getPoints());
});

app.post('/timeChange', function(req, res){
    var target = req.body.target;
    var intAmount = parseInt(req.body.intAmount);
    timerMod.timeUpDown(target, intAmount);
    res.send("timechange received");
    
});
app.post('/network', function(req, res){
    var startStop = req.body;
    network(startStop);
    res.send("network up!");
    
});
    
    
    //console.log(state);
    //console.log(req.body);
    
    //state.addPoints(req)
/*app.post('/',function(req,res){
  if(done==true){
    console.log(req.files);
    res.status(204).end();
  }
});*/
httpServer.listen(3000);

var timeHolder = {};
for (var i in timerMod.objClocks)
{
    timeHolder[i] = timerMod.objClocks[i].ms || 0;
};
console.log(timeHolder);
var sendTime = io
                .of('/getTime')
                .on('connection', function (socket) {
                    socket.join('ticker')
                    });
var getScore = io
                .of('/getScore')
                .on('connection', function (socket) {
                    socket.emit('update', GAMEDATA.getPoints())
                    
                    });
GAMEDATA.dataEvents.on("scoreUpdate", function(objScores)
                    {
                        getScore.emit("update", objScores)
                    })

var ticker = setInterval(function(){
    for (var i in timerMod.objClocks)
        {
            timeHolder[i] = timerMod.objClocks[i].ms || 0;
        };
    sendTime.in('ticker').emit('update', timeHolder)}, 1000); 