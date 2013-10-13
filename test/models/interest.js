var assert = require('assert')
  , tests
  , Interest = geddy.model.Interest
  , Karma = geddy.model.Karma
  , testConfig = require('../test-helper.js')
  , createItem = testConfig.createItem
  , createItemAndSave = testConfig.createItemAndSave;

tests = {

  'after': function (next) {
    next();
  },

  'simple test if the model saves without a error': function (next) {
    var interest = Interest.create({
      title: 'Ente',
      prospect: 'Jan',
      description: '1234567890'
    });
    interest.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  },

  'Talks must have a title, description and an contributor field': function (next) {
    var c = createItem(null, 'Interest');
    c.save(function (err, data) {
      assert.equal(null, err);
      next();
    });
  },

  'A title is required': function (next) {
    var c = Interest.create({
      description: 'enteenteenteenteenteenteente',
      prospect: 'henry'
    });
    c.save(function (err, data) {
      assert.ok(err.title);
      next();
    });
  },

  'A title is must have 3 chars': function (next) {
    var c = Interest.create({
      description: 'enteenteenteenteenteenteente',
      title: 'en',
      prospect: 'henry'
    });
    c.save(function (err, data) {
      assert.ok(err.title);
      next();
    });
  },

  'A description must be present': function (next) {
    var c = Interest.create({
      title: 'en',
      contributor: 'henry'
    });
    c.save(function (err, data) {
      assert.ok(err.description);
      next();
    });
  },

  'A description must have 10 chars': function (next) {
    var c = Interest.create({
      title: 'enasdasd',
      prospect: 'henry',
      description: 'ente',

    });
    c.save(function (err, data) {
      assert.ok(err.description);
      next();
    });
  },

  'An Interest has many karmas': function (next) {
    createItemAndSave(null, 'Interest', function (err, c) {
      c.addKarma(Karma.create({date: new Date()}));
      c.addKarma(Karma.create({date: new Date()}));
      c.save(function (err, data) {
        Interest.first({id: c.id }, function (err, result) {
          result.getKarmas(function (err, data) {
            assert.equal(2, data.length);
            next();
          });
        });
      });
    });
  },

  'An Interest has many contribs': function (next) {
    createItemAndSave(null, 'Interest', function (err, c) {
      c.addContrib(createItem(null, 'Contrib'));
      c.addContrib(createItem(null, 'Contrib'));
      c.save(function (err, data) {
        Interest.first({id: c.id }, function (err, result) {
          result.getContribs(function (err, data) {
            assert.equal(2, data.length);
            next();
          });
        });
      });
    });
  },

};

module.exports = tests;
