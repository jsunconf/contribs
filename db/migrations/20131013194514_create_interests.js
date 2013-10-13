var CreateInterests = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('title', 'string');
          t.column('prospect', 'string');
          t.column('description', 'string');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('interest', def, callback);
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
    this.dropTable('interest', callback);
  };
};

exports.CreateInterests = CreateInterests;
