var HttpTrafficRecorder = require('../lib/HttpTrafficRecorder');

var child = require('child_process');

var recorder = new HttpTrafficRecorder({ logDirectory: process.cwd()});

recorder.listen(8181, function () {	
	
	var worker = child.spawn('node', ['httpclient.js', '8181'], { cwd: process.cwd(), stdio: 'inherit' });			
	
	worker.on('exit', function(code	) {
		console.log('done %s', code);
		process.exit(0);
	});

});