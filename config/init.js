var testHelper = require('../test/test-helper.js');

var init = function(cb) {
  // Add uncaught-exception handler in prod-like environments
  if (geddy.config.environment != 'development') {
    process.addListener('uncaughtException', function (err) {
      var msg = err.message;
      if (err.stack) {
        msg += '\n' + err.stack;
      }
      if (!msg) {
        msg = JSON.stringify(err);
      }
      geddy.log.error(msg);
    });
    return cb();
  }

  testHelper.cleanUp(function (err) {
    if (err) {
      geddy.log.error('db error, skipping fixture setup');
      return cb();
    }
    testHelper.seedDb(cb);
  });

};

exports.init = init;
