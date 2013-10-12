var assert = require('assert')
  , tests
  , Karma = geddy.model.Karma
  , testConfig = require('../test-helper.js');

tests = {
  'simple test if the model saves without a error': function (next) {
    var karma = Karma.create({date: new Date()});
    karma.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  },
};

module.exports = tests;
