var net = require("net");
var fs = require("fs");

var port = process.argv[2];
var outFile = 'msgOut.txt'; 

server = net.createServer(function(conn) {
  conn.on('data',function(data){
    fs.writeFile(outFile, socket.address().address+": "+data+"\n" ,function(err){
      if(err) throw err;
    });
  });  
});

server.listen(6666, function() {
  console.log("We got a connexion!");
});
