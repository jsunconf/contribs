var Imprint = function () {
  this.canRespondTo(['html']);

  this.index = function (req, resp, params) {
    this.respond({
      format: 'html'
    , template: 'app/views/imprints/index'
    });
  };
};

exports.Imprint = Imprint;
