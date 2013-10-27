var Recaptcha = require('recaptcha').Recaptcha
  , createFeed = require(__dirname + '/../../lib/feed.js')
  , getVotedKey = require(__dirname + '/../../lib/session-keys.js').getVotedKey;

var Interests = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this
      , Interest = geddy.model.Interest;

    Interest.all({}, {limit: 300},
      function (err, interests) {
        self.respondWith(interests, {type: 'Interest'});
    });
  };

  this.add = function (req, resp, params) {
    var config = geddy.config
      , recaptcha = new Recaptcha(config.recaptcha.publicKey, config.recaptcha.privateKey);
    this.respond({ recaptcha: recaptcha.toHTML() });
  };

  this.create = function (req, resp, params) {
    var self = this
      , interest = geddy.model.Interest.create(params)
      , config = geddy.config;

    var recaptcha = new Recaptcha(config.recaptcha.publicKey, config.recaptcha.privateKey, {
      remoteip: req.connection.remoteAddress,
      challenge: params.recaptcha_challenge_field,
      response: params.recaptcha_response_field
    });

    recaptcha.verify(function (success, err) {
      if (success || !geddy.config.recaptcha.enabled) {
        interest.save(function (er, data) {
          var success = 'Created Interest! Thank you so much!';
          self.respondWith(interest, {status: er || success});
        });
      } else {
        self.flash.error('Wrong Captcha');
        var r = {
          recaptcha: recaptcha.toHTML(),
        };
        self.redirect(geddy.viewHelpers.addInterestPath);
      }
    });
  };

  this.show = function (req, resp, params) {
    var self = this
      , Interest = geddy.model.Interest
      , voted = self.session.get(getVotedKey(params.id));

    Interest.first(params.id, {includes: ['karmas', 'contribs']}, function (err, interest) {
      if (err) {
        throw err;
      }
      if (!interest) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respond({interest: interest, hasVoted: voted});
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
