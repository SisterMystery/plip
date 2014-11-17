var net = require("net");

port = process.argv[2];
host = process.argv[3];


var plipSock = net.connect({
  "port":port,
  "host": host  
});

process.stdin.on('readable', function() {
  var input = process.stdin.read();
  if (input !== null){
    plipSock.write(input);
  }
});
