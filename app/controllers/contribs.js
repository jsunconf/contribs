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

    geddy.model.Contrib.first(params.id, {includes: ['karmas']}, function(err, contrib) {
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
