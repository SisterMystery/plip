var net = require('net');
var conns = [];
var server = net.createServer(function(c) { //'connection' listener
  console.log('server connected');
  conns.push(c);
	var num = conns.length -1;
	console.log("NUM == " +  num);
	c.on('end', function() {
    console.log('server disconnected');
  });
	
	c.on('data', function(data) {
		for (i in conns){
			if (i != num){
			conns[i].write(data);
			}
		}
		});	
	
  c.write('Welcome to puddle 10.10.117.106\r\n');
  //c.pipe(c);
});
server.listen(8124, function() { //'listening' listener
  console.log('server bound');
});
