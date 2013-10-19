var Recaptcha = require('recaptcha').Recaptcha
  , createFeed = require(__dirname + '/../../lib/feed.js');

var Interests = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Interest.all({}, {limit: 300},
      function (err, interests) {
        self.respondWith(interests, {type: 'Interest'});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , interest = geddy.model.Interest.create(params);

    interest.save(function (err, data) {
      if (err) {
        throw err;
      }
      self.respondWith(interest, {status: err});
    });
  };

  this.show = function (req, resp, params) {
    var self = this
      , Interest = geddy.model.Interest;

    Interest.first(params.id, {includes: ['karmas', 'contribs']}, function (err, interest) {
      if (err) {
        throw err;
      }
      if (!interest) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(interest);
      }
    });
  };

  this.xml = function (req, resp, params) {
    var self = this
      , Interest = geddy.model.Interest
      , feed;

    Interest.all(function (err, interests) {
      feed = createFeed(interests);
      self.output(200, {'Content-Type': 'application/xml'}, feed.render('atom-1.0'));
    });
  };

};

exports.Interests = Interests;

