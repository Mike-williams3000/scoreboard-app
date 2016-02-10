var BrowserWindow = remote.require('browser-window');
var openDisplayWindow = function()
    {   
        var win = new BrowserWindow({ width: 800, height: 600});
        console.log(win);
        win.maximize();
        win.openDevTools();
        //win.loadUrl('https://github.com');
    };