var Recaptcha = require('recaptcha').Recaptcha;

var Contribs = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Contrib.all({}, {limit: 300},
      function(err, contribs) {
        self.respondWith(contribs, {type:'Contrib'});
    });
  };

  this.add = function (req, resp, params) {
    var config = geddy.config
      , recaptcha = new Recaptcha(config.recaptcha.publicKey, config.recaptcha.privateKey);
    this.respond({ recaptcha: recaptcha.toHTML() });
  };

  this.create = function (req, resp, params) {
    var self = this
      , contrib = geddy.model.Contrib.create(params)
      , config = geddy.config;

    var recaptcha = new Recaptcha(config.recaptcha.publicKey, config.recaptcha.privateKey, {
      remoteip: req.connection.remoteAddress,
      challenge: params.recaptcha_challenge_field,
      response: params.recaptcha_response_field
    });

    recaptcha.verify(function (success, err) {
      if (success) {
        contrib.save(function(er, data) {
          self.respondWith(contrib, {status: er});
        });
      } else {
        self.flash.error('Wrong Captcha');
        var r = {
          recaptcha: recaptcha.toHTML(),
        };
        self.respond(r, { template: 'add' });
      }
    });
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Contrib.first(params.id, {include: ['karmas']},
        function (err, contrib) {
      if (err) {
        throw err;
      }
      if (!contrib) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        if (!contrib.interestId) {
          self.respondWith(contrib);
        } else {
          geddy.model.Interest.first(contrib.interestId,
              function (er, interest) {
            contrib.interest = interest;
            self.respondWith(contrib, {status: er});
          });
        }
      }
    });
  };

  this.edit = function (req, resp, params) {
    throw new geddy.errors.NotFoundError();
  };

  this.update = function (req, resp, params) {
    throw new geddy.errors.NotFoundError();
  };

  this.remove = function (req, resp, params) {
    throw new geddy.errors.NotFoundError();
  };

};

exports.Contribs = Contribs;
