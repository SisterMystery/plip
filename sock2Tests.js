var moment = require('moment');
var net = require('net');
var readline = require("readline");
var writeStream = require("fs").createWriteStream("stuff.txt");
var name = "FoxyPan";


function makeMessage(Text) { // a function to make the text into a slightl
	return { 
		text: Text,
		sender: Text.split(':')[0],
		timeStamp: moment()
	};
}

ioBar = (function() {
	var bufferer = new Buffer(""); // create private buffer for ioBar
	return (readline.createInterface({
			input:process.stdin,
			output:process.stdout
	}))
}());

var blessed = require('blessed');

// Create a screen object.
var screen = blessed.screen();

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '60%',
  height: '60%',
  content: 'Initiating Plip....!',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});

box.addMsg = function (text){
	
}

// Append our box to the screen.
screen.append(box);

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

var client = net.connect({port: 8124,host:'10.10.117.106'},
    function() { //'connect' listener
  console.log('client connected');
});

client.on('data', function(data) {
	var msg = makeMessage(data.toString());
	if (box.getLines().length >= 12){
		box.deleteTop();
	}

	box.pushLine(msg.text);
	screen.render()
});

client.on('end', function() {
  console.log('client disconnected');
});

//ioBar.setPrompt(name+": ");
ioBar.on('line', function (line){
	bufferer = new Buffer(name+": "+line);
	ioBar.prompt()
	
	readline.cursorTo(process.stdout,0,0);	
	readline.clearScreenDown(process.stdout);
	
	client.write(bufferer);
	if (box.getLines().length >= 10){
		box.deleteTop();
	}
	box.pushLine(bufferer.toString())
	
	screen.render()	
});

// Focus our element.
box.focus();

// Render the screen.
screen.render();

