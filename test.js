var assert = require('assert');
var rim = require('rimraf');
var exists = require('fs').existsSync;
var read   = require('fs').readFileSync;

rim.sync('test/fixtures/dist/main.css');
var cb = require('crossbow-cli');
var runner = cb({
    input: ['run', './index.js'],
    flags: {
        handoff: true
    }
}, {
    crossbow: {
        config: {
            "./index.js": {
                input: "test/fixtures/main.scss",
                output: "test/fixtures/dist/main.css"
            }
        }
    }
});

runner
    .run
    .subscribe(function () {
        //console.log('VALUE');
    }, function (err) {
        //console.log(err);
    }, function () {
        assert(exists('test/fixtures/dist/main.css'));
        assert(read('test/fixtures/dist/main.css', 'utf-8').indexOf('normalize.css') > -1);
    })

