var AlterKarmas = function () {
  this.up = function (next) {
    this.addColumn('karmas', 'contrib_id', 'string', function (err, data) {
      next();
    });
  };

  this.down = function (next) {
    next();
  };
};

exports.AlterKarmas = AlterKarmas;
