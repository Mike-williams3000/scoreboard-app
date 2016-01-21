 var childProcess = require('child_process'),
     ls;
var netStart = function(startStop){
 if (startStop == "start")
    {
     function set(){
        ls = childProcess.exec('netsh wlan set hostednetwork mode=allow ssid=mikefi key=makeitgo', function (error, stdout, stderr) {
       if (error) {
         console.log(error.stack);
         console.log('Error code: '+error.code);
         console.log('Signal received: '+error.signal);
       }
       console.log('Child Process STDOUT: '+stdout);
       console.log('Child Process STDERR: '+stderr);
     });
     

     ls.on('exit', function (code) {
       console.log('Child process exited with exit code '+code);
     });
    }
        start()
        function start()    {
            ls = childProcess.exec('netsh wlan start hostednetwork', function (error, stdout, stderr) {
            if (error) {
                 console.log(error.stack);
                 console.log('Error code: '+error.code);
                 console.log('Signal received: '+error.signal);
               }
               console.log('Child Process STDOUT: '+stdout);
               console.log('Child Process STDERR: '+stderr);
             });
        };

     ls.on('exit', function (code) {
       console.log('Child process exited with exit code '+code);
     });
    }
else
    {
        ls = childProcess.exec('netsh wlan stop hostednetwork', function (error, stdout, stderr) {
       if (error) {
         console.log(error.stack);
         console.log('Error code: '+error.code);
         console.log('Signal received: '+error.signal);
       }
       console.log('Child Process STDOUT: '+stdout);
       console.log('Child Process STDERR: '+stderr);
     });

     ls.on('exit', function (code) {
       console.log('Child process exited with exit code '+code);
     });
    }
}
module.exports = netStart;