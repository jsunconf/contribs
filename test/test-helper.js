var Contrib = geddy.model.Contrib
  , Karma = geddy.model.Karma
  , fixtures = require('./fixtures/Contrib.json');

exports.createContrib = createContrib;
exports.createContribAndSave = createContribAndSave;
exports.seedDb = seed;
exports.cleanUp = cleanUp;


function createContrib (data) {
  if (!data) {
    data = fixtures[0];
  }
  c = Contrib.create(data);
  return c;
}

function createContribAndSave (data, cb) {
  if (typeof data == 'function') {
    cb = data;
    c = createContrib();
  } else {
    c = createContrib(data);
  }
  c.save(cb);
}

function createContribWithRandomKarma (data, cb) {
  createContribAndSave(data, function (err, c) {
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
  var fixtureCopy = fixtures.slice();
  var doIt = function () {
    var fixture = fixtureCopy.shift();
    if (fixture) {
      createContribWithRandomKarma(fixture, doIt);
    } else {
      cb();
    }
  }
  doIt();
}

function cleanUp (cb) {
  var relations = [Contrib, Karma];
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
