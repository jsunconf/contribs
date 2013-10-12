var Karmas = function () {
  this.respondsWith = ['json'];


  this.index = function (req, resp, params) {
    throw new Error("Not implemented");
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , karma = geddy.model.Karma.create(params);

    karma.once('beforeSave', function() {
      karma.date = new Date();
    });

    karma.save(function(err, data) {
      if (err) {
        throw err;
      }
      self.respondWith(karma, {status: err});
    });
  };

  this.show = function (req, resp, params) {
    throw new Error("Not implemented");
  };

  this.edit = function (req, resp, params) {
    throw new Error("Not implemented");
  };

  this.update = function (req, resp, params) {
    throw new Error("Not implemented");
  };

  this.remove = function (req, resp, params) {
    throw new Error("Not implemented");
  };

};

exports.Karmas = Karmas;
