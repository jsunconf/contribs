var assert = require('assert')
  , tests
  , Contrib = geddy.model.Contrib
  , Karma = geddy.model.Karma
  , testConfig = require('../test-helper.js')
  , createItem = testConfig.createItem
  , createItemAndSave = testConfig.createItemAndSave;

tests = {

  'after': function (next) {
    next();
  },

  'Talks must have a title, description and an contributor field': function (next) {
    var c = createItem(null, 'Contrib');
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
    createItemAndSave(null, 'Contrib', function (err, c) {
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
  },

  'A contrib can belong to an Interest': function (next) {
    createItemAndSave(null, 'Interest', function (err, i) {
      var item = createItem(null, 'Contrib');
      i.addContrib(item);
      i.save(function (err, data) {
        Contrib.first({id: item.id }, function (err, result) {
          assert.ok(result.interestId);
          next();
        });
      });
    });
  }

};

module.exports = tests;

