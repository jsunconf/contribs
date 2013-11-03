var getVotedKey = require(__dirname + '/../../lib/session-keys.js').getVotedKey;

var Karmas = function () {
  this.respondsWith = ['json'];

  this.create = function (req, resp, params) {
    params.date = new Date();
    var self = this
      , karma = geddy.model.Karma.create(params);

    var controller = geddy.inflection.pluralize(params.type);
    karma.save(function (err, data) {
      self.session.set(getVotedKey(params[params.type + '_id']), 'v');
      self.respondWith(karma);
    });
  };

};

exports.Karmas = Karmas;
