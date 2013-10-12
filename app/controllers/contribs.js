var Contribs = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Contrib.all({}, {includes: 'karma', limit: 300},
      function(err, contribs) {
        //geddy.log.debug(JSON.stringify(contribs[0].karmas.length))
        self.respondWith(contribs, {type:'Contrib'});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , contrib = geddy.model.Contrib.create(params);

    contrib.save(function(err, data) {
      if (err) {
        throw err;
      }
      self.respondWith(contrib, {status: err});
    });
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Contrib.first(params.id, function(err, contrib) {
      if (err) {
        throw err;
      }
      if (!contrib) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(contrib);
      }
    });
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

exports.Contribs = Contribs;
