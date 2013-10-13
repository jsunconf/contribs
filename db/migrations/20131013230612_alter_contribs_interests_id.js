var AlterContribsInterestsId = function () {
  this.up = function (next) {
    this.addColumn('contribs', 'interest_id', 'string', function (err, data) {
      next();
    });
    next();
  };

  this.down = function (next) {
    next();
  };
};

exports.AlterContribsInterestsId = AlterContribsInterestsId;
