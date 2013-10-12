var Main = function () {
  this.canRespondTo(['html']);

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Contrib.all(function(err, contribs) {
      self.respondWith(contribs, {type:'Contrib'});
    });
  };
};

exports.Main = Main;
