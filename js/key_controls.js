var KEYMAP = {
	home:37,  //left
	away:39,  //right
	1:97,      //number keys 1 to 9
	2:98,
	3:99,
	4:100,
	5:101,
	6:102,
	7:103,
	8:104,
	9:105,

	keyEvent:function(e){
		switch (e.keyCode) {
			case this.home:
				//alert('left');
				SCOREINT.selectTeam("home");
				break;
			case 38:
				//alert('up');
				break;
			case this.away:
				//alert('right');
				SCOREINT.selectTeam("away");
				break;
			case 40:
				//alert('down');
				break;
			case this[1]:
				//alert('1');
				SCOREINT.addPoints(1);
				break;
			case this[2]:
				//alert('2');
				SCOREINT.addPoints(2);
				break;
			case this[3]:
				//alert('3');
				SCOREINT.addPoints(3);
				break;
			case this[4]:
				//alert('4');
				SCOREINT.addPoints(4);
				break;
			case this[5]:
				//alert('5');
				SCOREINT.addPoints(5);
			break;
				case this[6]:
				//alert('6');
				SCOREINT.addPoints(6);
				break;
			case this[7]:
				//alert('7');
				SCOREINT.addPoints(7);
				break;
			case this[8]:
				//alert('8');
				SCOREINT.addPoints(8);
				break;
			case this[9]:
				//alert('9');
				SCOREINT.addPoints(9);
				break;
			}
		}

}
window.onkeydown = function(e){
                    //alert(e);
                    KEYMAP.keyEvent(e);
                              };
