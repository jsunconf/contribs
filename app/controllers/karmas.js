var Karmas = function () {
  this.respondsWith = ['json'];

  this.create = function (req, resp, params) {
    params.date = new Date();
    var self = this
      , karma = geddy.model.Karma.create(params);

    karma.save(function (err, data) {
      self.respondWith(karma, {status: err});
    });
  };

};

exports.Karmas = Karmas;
