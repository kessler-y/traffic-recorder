/*************************************************************************************************
	DO NOT MODIFY THIS FILE UNLESS YOU REALLY REALLY REALLY REALLY KNOW WHAT YOU ARE DOING!!!  
*************************************************************************************************/

var cc = require('config-chain')
var opts = require('optimist').argv 
var env = opts.env || process.env.traffic_recorder_env || 'production' 
var path = require('path');
var currentProcessDir = process.cwd();

var configPath = opts.config || process.env.traffic_recorder_env_config;
var configPath = configPath || path.join(currentProcessDir, 'config.json');

var logger = require('log4js').getLogger('config');

logger.info('config path: %s', configPath);

var conf = cc(

	//OVERRIDE SETTINGS WITH COMMAND LINE OPTS
	opts,

	//ENV VARS IF PREFIXED WITH 'myApp_'
	cc.env('traffic_recorder_'), //myApp_foo = 'like this'

	//FILE NAMED BY ENV
    configPath,

	//PUT DEFAULTS LAST
	{		
		port: 80,
		logDirectory: '../'
	}
);

module.exports = conf;
