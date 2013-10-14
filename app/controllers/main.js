var Main = function () {
  this.canRespondTo(['html']);

  this.index = function (req, resp, params) {
    var self = this,
        Contrib = geddy.model.Contrib,
        Interest = geddy.model.Interest;

    Contrib.all(function(err, contribs) {
      Interest.all(function(err, interests) {
        self.respond({contribs: contribs,  interests: interests});
      });
    });
  };
};

exports.Main = Main;
