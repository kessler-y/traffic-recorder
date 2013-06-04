var HttpTrafficRecorder = require('../lib/HttpTrafficRecorder');
var fs = require('fs');
var child = require('child_process');
var assert = require('assert');
var recorder = new HttpTrafficRecorder({ logFile: 'test.log' });

var rowSize = 10000;

describe('moo moo land', function() {
	it('buggy buggy', function (done) {
		this.timeout(50000);

		var expectedSum = ((rowSize - 1) * rowSize) / 2;

		recorder.listen(8181, function () {	
			
			var worker = child.spawn('node', ['httpclient.js', '8181', rowSize], { cwd: process.cwd(), stdio: 'inherit' });			
			
			worker.on('exit', function(code	) {

				var data = fs.readFileSync('test.log', 'utf8');

				var rows = data.split('\n');

				assert.strictEqual(101, rows.length);
				rows.pop()  // remove last empty line;

				for (var i = 0; i < 100; i++) {
					var row = rows[i].split(',');
					var firstValue = row[0].split('-');
					var rowPrefix = firstValue[0];
					//console.log('rowPrefix is %s', rowPrefix);
					var sum = 0;
					for (var x = 0; x < row.length; x++) {

						var rowValues = row[x].split('-');
						
						//assert.strictEqual(rowPrefix, rowValues[0], [rowPrefix, rowValues[0]]);	

						if (rowPrefix !== rowValues[0]) {
							console.log(rowPrefix, rowValues);
							//break;
						}
						
						sum += parseInt(rowValues[1]);
					}

					assert.strictEqual(expectedSum, sum);
				}

				//console.log('done %s', code);
				//process.exit(0);
				done();
			});

		});		
	});

	after(function() {
	//	fs.unlinkSync('test.log');
	})
});

