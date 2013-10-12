var assert = require('assert')
  , tests
  , Contrib = geddy.model.Contrib
  , Karma = geddy.model.Karma
  , testConfig = require('../test-helper.js')
  , createContrib = testConfig.createContrib
  , createContribAndSave = testConfig.createContribAndSave;

tests = {
  'Talks must have a title, description and an contributor field': function (next) {
    var c = createContrib();
    c.save(function (err, data) {
      assert.equal(null, err);
      next();
    });
  },

  'A title is required': function (next) {
    var c = Contrib.create({
      description: 'enteenteenteenteenteenteente',
      contributor: 'henry'
    });
    c.save(function (err, data) {
      assert.ok(err.title);
      next();
    });
  },

  'A title is must have 3 chars': function (next) {
    var c = Contrib.create({
      description: 'enteenteenteenteenteenteente',
      title: 'en',
      contributor: 'henry'
    });
    c.save(function (err, data) {
      assert.ok(err.title);
      next();
    });
  },

  'A description must be present': function (next) {
    var c = Contrib.create({
      title: 'en',
      contributor: 'henry'
    });
    c.save(function (err, data) {
      assert.ok(err.description);
      next();
    });
  },

  'A description must have 10 chars': function (next) {
    var c = Contrib.create({
      title: 'enasdasd',
      contributor: 'henry',
      description: 'ente',

    });
    c.save(function (err, data) {
      assert.ok(err.description);
      next();
    });
  },

  'A contrib has many karmas': function (next) {
    createContribAndSave(function (err, c) {
      Contrib.first(function (err, c) {
        c.addKarma(Karma.create({date: new Date()}));
        c.addKarma(Karma.create({date: new Date()}));
        c.save(function (err, data) {
          Contrib.first({id: c.id }, function (err, result) {
            result.getKarmas(function (err, data) {
              assert.equal(2, data.length);
              next();
            });
          });
        });
      });
    });
  },

};

module.exports = tests;

