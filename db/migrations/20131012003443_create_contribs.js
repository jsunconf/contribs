var CreateContribs = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('title', 'string');
          t.column('contributor', 'string');
          t.column('description', 'text');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('contrib', def, callback);
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
    this.dropTable('contrib', callback);
  };
};

exports.CreateContribs = CreateContribs;
