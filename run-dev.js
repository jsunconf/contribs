var spawn = require('child_process').spawn;
var q = require('async-minihelper');

var childs = [];
process.on('exit', function () {
  for (child in childs) {
    child.kill();
  }
});

var opts = {stdio: 'inherit'};
q([
  function (cb) {
    childs.push(spawn('grunt', ['less:development'], opts));
    cb();
  },
  function (cb) {
    childs.push(spawn('geddy', ['-e', 'development'], opts));
    cb();
  },
  function () {
    childs.push(spawn('grunt', ['watch'], opts));
  }
]);

