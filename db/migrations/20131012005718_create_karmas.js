var CreateKarmas = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('date', 'date');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('karma', def, callback);
  };

  this.down = function (next) {
    var callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.dropTable('karma', callback);
  };
};

exports.CreateKarmas = CreateKarmas;
