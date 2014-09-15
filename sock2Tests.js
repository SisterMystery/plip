var net = require('net');
var readline = require("readline");
var name = "FoxyPan";

ioBar = (function() {
	var bufferer = new Buffer("");
	return (readline.createInterface({
			input:process.stdin,
			output:process.stdout
	}))
}());


var client = net.connect({port: 8124,host:'10.10.117.114'},
    function() { //'connect' listener
  console.log('client connected');
});

client.on('data', function(data) {
  console.log("*** " + data.toString() + " ***");
});

client.on('end', function() {
  console.log('client disconnected');
});

ioBar.setPrompt(name+": ");
ioBar.on('line', function (line){
	bufferer = new Buffer(name+": "+line);
	ioBar.prompt()
	
	client.write(bufferer);	
});
