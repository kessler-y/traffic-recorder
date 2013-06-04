var HttpTrafficRecorder = require('./lib/HttpTrafficRecorder');

module.exports.config = require('./lib/config');

module.exports.create = function(protocol, options) {
	if (protocol === 'http')
		return new HttpTrafficRecorder(options || module.exports.config.store);

	throw new Error('unsupported protocol ' + protocol);
};