var dgram = require("dgram");
var readline = require("readline");

ioBar = (function() {
  var bufferer = new Buffer("");
  return ( readline.createInterface({
    input:process.stdin,
    output:process.stdout
  }))
}())

var homeIP; 
 require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  homeIP = add;
})



var server = dgram.createSocket("udp4");

server.on("error", function (err) {
  ioBar.write("server error:\n" + err.stack);
  server.close();
})

server.on("message", function (msg, rinfo) {
  if (rinfo.address != homeIP){
  ioBar.write("server got: " + msg + " from " +
    rinfo.address + ":" + rinfo.port);
  }
})

server.on("listening", function () {
  var address = server.address();
  ioBar.write("server listening " +
      address.address + ":" + address.port);
})

server.bind(41234,function () {server.addMembership('224.0.0.114') });
ioBar.setPrompt("==>")
ioBar.on('line', function (line){
  
  bufferer = new Buffer(line)
//  ioBar.write("==> " + line )
  ioBar.prompt()
  
  server.send(bufferer,0,bufferer.length,41234,'224.0.0.114')
})

