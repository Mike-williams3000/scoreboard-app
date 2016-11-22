scoreboard-app
==============
Install "npm install"
Run "npm start"

Uncomment line 7 in min.js to start hosted network key= sbapp pass=testpass (win only)

opens dev tools on start

Go to http://127.0.0.1:3000/index for browser version (serverside twig templated with swig)
Browser version syncs with main control window through websockets and Angular.

key controls - left/right arrow selects team, num pad to add points 

Events fire when count down clocks reach zero (and period clock< 30 seconds, see https://wftda.com/rules/20141201/section/1.4#1.4.3)
line up time/jam starts based on gamestate. 

All navbar and side bar items are place holders.

This app is intended to be used as a game manager and scoreboard for Roller Derby, as played under the WFTDA rule set. 
It's an app built on Electron, which runs it's own version of node, and starts a web server designed to serve content to 
a projected scoreboard and team benches, through mobile devices. 

Still to do:
Round time up! currently clock starts on 1:59:xx and ends on 0:00:xx should be 2:00 and 0:00 - sloved, implemented in browser version
Loading from database overwrites reset time on clocks - solved, set ms of clock object rather than reset()
Add mthods for New Game/Load game etc
Move to MVC style!
Team selection, pictures and numbers for display.
Template for scoreboard display
Multigame/user profiles
User auth - websockets token security
penalty tracking selection
Clock functions in browser instance with sync from main
Add jam counter adjust buttons
Move all routes to websockits?

Dist contains app packed into .asar files and win folder with installer -WARNING- installs to programFiles(x64) without confirmation!


added jan counter, need to add adjust buttons to view. 


