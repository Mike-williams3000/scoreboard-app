var timerMod = require('./js/timer-test-module.js');
var server = require('./server.js');

var state = require('./js/game-state-module.js');
var network= require('./js/network_module.js');

network("start");
console.log(network);

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
//require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;
var displayWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
      network("stop");
    app.quit();
  }
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/dashboardelectron.html');
    mainWindow.maximize();

  // Open the devtools.
  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
      //displayWindow.destroy();
      network("stop");
      displayWindow = null;
    mainWindow = null;
  });
});
var displayFunctions = {
    
    openDisplayWindow: function()
    {   
        displayWindow = new BrowserWindow({ width: 800, height: 600, frame: false});

        //displayWindow.maximize();
        
        displayWindow.loadUrl('file://' + __dirname + '/display.html');
    },
    setFullScreen: function ()
    {
        displayWindow.setFullScreen(true);
        mainWindow.show();
    }
};
        
    
    
module.exports.state = state;
module.exports.clocks = timerMod;
module.exports.displayFunctions = displayFunctions;
//module.exports.displayWindow = displayWindow;