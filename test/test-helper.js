var Contrib = geddy.model.Contrib
  , Karma = geddy.model.Karma
  , Interest = geddy.model.Interest
  , fixtures = ['Contrib', 'Interest']
  , contribs = require('./fixtures/Contrib.json')
  , interests = require('./fixtures/Interest.json')
  , fixtureObj = {
    'Contrib': contribs,
    'Interest': interests
  };

exports.createItem = createItem;
exports.createItemAndSave = createItemAndSave;
exports.seedDb = seed;
exports.cleanUp = cleanUp;


function createItem (data, name) {
  var i;
  if (!data) {
    data = fixtureObj[name][0];
  }
  i = geddy.model[name].create(data);
  return i;
}

function createItemAndSave (data, name, cb) {
  var c;
  if (typeof data == 'function') {
    cb = data;
    c = createItem(null, name);
  } else if (data === null) {
    c = createItem(null, name);
  } else {
    c = createItem(data, name);
  }
  c.save(cb);
}

function createContribOrInterestWithRandomKarma (data, name, cb) {
  createItemAndSave(data, name, function (err, c) {
    var count = ~~(Math.random(0, 10) * 200);
    for (var i = 0; i < count; i++) {
      c.addKarma(Karma.create({date: new Date()}));
    }
    c.save(function (err, data) {
      cb();
    });
  });
}


function seed (cb) {
  var contribsCopy = contribs.slice();
  var interestsCopy = interests.slice();
  var listCopy = fixtures.slice();

  var runner = function (fixtures, list) {
    var f = fixtures.shift();
    var name = list.shift();
    var doIt = function () {
      var fixture = f.shift();
      if (fixture) {
        createContribOrInterestWithRandomKarma(fixture, name, doIt);
      } else {
        if (fixtures) {
          return runner(fixtures, list)
        }
      }
    }
    if (f) {
      doIt();
    } else {
      cb();
    }
  };
  runner([contribsCopy, interestsCopy], listCopy);
}

function cleanUp (cb) {
  var relations = [Contrib, Karma, Interest];
  var doIt = function () {
    var relation = relations.shift();
    if (relation) {
      relation.all(function (err, data) {
        var ids = [];
        if (err) { throw err; }
        if (!data || !data.length) { return doIt(); }
        data.forEach(function (item) {
          ids.push(item.id);
        });
        relation.remove({id: ids}, function (err, data) {
          if (err) { throw err; }
          doIt();
        });
      });
    } else {
      cb();
    }
  }
  doIt();
}
