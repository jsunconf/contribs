var AlterInterestsContribsId = function () {
  this.up = function (next) {
    this.addColumn('interests', 'contrib_id', 'string', function (err, data) {
      next();
    });
    next();
  };

  this.down = function (next) {
    next();
  };
};

exports.AlterInterestsContribsId = AlterInterestsContribsId;
