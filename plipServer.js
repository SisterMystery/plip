var net = require("net");
var fs = require("fs");

var port = process.argv[2];
var outFile = 'msgOut.txt'; 

server = net.createServer(function(conn) {
	console.log("we got a connexion from " + conn.address().address);
  conn.on('data',function(data){
    fs.writeFile(outFile, conn.address().address+": "+data+"\n" ,{flag:'a'},function(err){
      if(err) throw err;
    });
  });  
});

server.listen(6666, function() {

});
