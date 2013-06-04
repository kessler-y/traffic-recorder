var config = require('./lib/config');



module.exports.create = function(protocol, options) {
	if (protocol === 'http')
		return new HttpTrafficRecorder(options);

	throw new Error('unsupported protocol ' + protocol);
}