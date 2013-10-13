var assert = require('assert')
  , tests
  , Interest = geddy.model.Interest;

tests = {

  'after': function (next) {
    // cleanup DB
    Interest.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var interest = Interest.create({});
    interest.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
