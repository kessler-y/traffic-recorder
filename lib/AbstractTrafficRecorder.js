var SimpleFileWriter = require('simple-file-writer');
var path = require('path');
var fs = require('fs');

/*
	options:

	@param logFile 		- incoming traffic log filename	
	@param logDirectory	- instead of specifying a log filename, specify a directory. Recorder will then create a log file of the form traffic-<start timestamp>.log there
*/
function AbstractTrafficRecorder(options) {
	this._configure(options);	
	this._log = new SimpleFileWriter(this._options.logFile);			
}

AbstractTrafficRecorder.prototype._configure = function(options) {	
	if (!options.logFile) {
		if (options.logDirectory) options.logFile = path.join(options.logDirectory, 'traffic-' + Date.now() + '.log');
		else throw new Error('missing incoming log file name');
	}

	this._options = options;
};

AbstractTrafficRecorder.prototype.listen = function(port, callback) {
	this._listen(port, callback);
};

AbstractTrafficRecorder.prototype._listen = function () {
	throw new Error('not implemented');
};

AbstractTrafficRecorder.prototype.close = function(callback) {
	this._close(callback);
};

AbstractTrafficRecorder.prototype._close = function () {
	throw new Error('not implemented');
};

module.exports = AbstractTrafficRecorder;