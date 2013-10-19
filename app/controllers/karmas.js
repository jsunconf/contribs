var Karmas = function () {
  this.respondsWith = ['json'];

  this.create = function (req, resp, params) {
    params.date = new Date();
    var self = this
      , karma = geddy.model.Karma.create(params);

    var controller = geddy.inflection.pluralize(params.type);
    karma.save(function (err, data) {
      self.redirect({controller: controller, id: params[params.type + '_id']});
    });
  };

};

exports.Karmas = Karmas;
