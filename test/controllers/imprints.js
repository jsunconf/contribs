var assert = require('assert')
  , tests
  , controller = geddy.controller.create('Imprint');

var MockRequest = function (format) {
  this.headers = {
    accept: '*/*'
  }
};

var createController = function () {
  controller.request = new MockRequest();
  controller.params = {};
  controller.canRespondTo(['html', 'json', 'js']);

  controller.renderTemplate = function (data, opts, callback) {
    callback('<div>' + JSON.stringify(data) + '</div>');
  };

  controller.flash = {
    set: function (type, msg) {
      c.flashMessage = {};
    }
  };

  return controller;
};

tests = {
  'basic integration test - test html response': function (next) {
    var controller = createController();
    controller.output = function (statusCode, headers, content) {
      assert.equal(200, statusCode);
      assert.equal('text/html', headers['Content-Type']);
      assert.equal('<div>{"foo":"bar"}</div>', content);
      next();
    };
    controller.respond({foo: 'bar'}, {format: 'html'});
  },

};

module.exports = tests;
