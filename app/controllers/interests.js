var Interests = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Interest.all({}, {limit: 300},
      function(err, interests) {
        self.respondWith(interests, {type: 'Interest'});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , interest = geddy.model.Interest.create(params);

    interest.save(function(err, data) {
      if (err) {
        throw err;
      }
      self.respondWith(interest, {status: err});
    });
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Interest.first(params.id, {includes: ['contribs']}, function (err, interest) {
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

exports.Interests = Interests;

