#!/usr/bin/env node
var logger = require('log4js').getLogger('server');

var optimist = require('optimist')	
	.option('port', {
		alias: 'p',
		default: 80,
		describe: 'port to listen on'
	})
	.option('transport', {		
		alias: 't',
		default: 'http',
		describe: '[http/https/tcp]'
	})
	.option('logDirectory', {
		alias: 'logdir',
		default: './logs',
		describe: '\n\nLocation of logs.\nEach server invocation will be create a log file in the form of traffic-<timestamp>.log\n\n'
	})
	.options('logFile', {
		alias: 'logfile',
		describe: '\n\nOverrides or replaces log directory options.\nSets the log file to whatever you want.\nSame log file will be used between server invocations. Logging will append to the file.\n\n'
	})
	.option('help', {
		alias: 'h',
		describe: 'display this message'
	});

var argv = optimist.argv;

if (argv.help) {
	console.log(optimist.help());
	process.exit(0);	
}

var recorder = require('./index').create(argv.transport);

recorder.listen(argv.port, function(){
	logger.info('Recorder is listening...');
});