var AlterKarmasInterestId = function () {
  this.up = function (next) {
    this.addColumn('karmas', 'interest_id', 'string', function (err, data) {
    console.log(err)
      next();
    });
  };

  this.down = function (next) {
    next();
  };
};

exports.AlterKarmasInterestId = AlterKarmasInterestId;
