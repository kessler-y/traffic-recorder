var $u = require('util');
var AbstractTrafficRecorder = require('./AbstractTrafficRecorder');
var http = require('http');
var domain = require('domain');
var fs = require('fs');

$u.inherits(HttpTrafficRecorder, AbstractTrafficRecorder)
function HttpTrafficRecorder(options) {
	AbstractTrafficRecorder.call(this, options);
	
	var self = this;
	
	this._server = http.createServer(function (request, response) {
		if (request.method === 'GET') {
			response.end('ok');
			return;
		}
		
		self._log.write(request, function () {
			response.end();
		});
	});
}

HttpTrafficRecorder.prototype._readRequest = function(request, cb) {
	
	var data = '';
	
	request.setEncoding('utf8');

	function readMore() {
		var result = request.read();

		if (result) {			
			data += result;			
			readMore();			
		} else {
			request.once('readable',readMore);
		}		
	}

	request.once('end', function () {		
		cb(data);
	});

	readMore();
};

HttpTrafficRecorder.prototype._listen = function(port, callback) {
	this._server.listen(port, callback);	
};

HttpTrafficRecorder.prototype._close = function(callback) {
	this._server.close(callback);
};

module.exports = HttpTrafficRecorder;