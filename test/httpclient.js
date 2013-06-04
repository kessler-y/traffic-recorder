var http = require('http');
var domain = require('domain');

http.globalAgent.maxSockets = 200;

var port = process.argv[2];

console.log('port is %s', port);

var count = 0;
var responses = 0;
var requests = 0;
var interval = setInterval(function() {

	if (count++ > 10) {
		interval.unref();
		process.exit(0);
	}

}, 1000);

var where = {
	hostname: 'localhost',
	port: parseInt(port),
	method: 'POST'
}

for (var i = 0; i < 100; i++) {
	send(where, i);
}

setTimeout(function() {
	for (var i = 100; i < 200; i++) {
		send(where, i);
	}

}, 1000);

function send(where, i) {

	var request = http.request(where, function(response) {
		
		var data = '';
		response.setEncoding('utf8');

		function readMore() {
			var result = response.read();

			if (result) {			
				data += result;			
				readMore();
			} else {
				response.once('readable', readMore);				
			}
		}

		response.on('end', function () {
			responses++;
			//console.log(data);
		});

		readMore();
	});

	request.on('socket', function () {
		requests++;	
	});

	var data = '';

	for (var x = 0; x < 1000; x++) {
		data += ' data'+ i + x; 
	}

	data += '\n';

	request.write(data);
	request.end();
}

