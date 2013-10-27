
var assert = require('assert');

var wd = require('wd')
  , colors = require('colors')
  , browser = wd.remote();

var testhelper = require(__dirname + '/../test-helper.js');
var s = testhelper.selenium;

var browser = wd.promiseChainRemote();

browser.on('status', function (info) {
  console.log(info.cyan);
});

browser.on('command', function (meth, path, data) {
  console.log(' > ' + meth.yellow, path.grey, data || '');
});

var createContrib = require('./_shared.js').createContrib;

tests = {

  'before': function (next) {
    s.start(next);
  },

  'after': function (next) {
    s.stop(next);
  },

  'I can respond to an interest with a Contribution': function (next) {
    var voteCount;
    browser.init({browserName: 'firefox'})
      .get(s.url)
      .elementByLinkText('This interest gets a response')
      .click()
      .elementByCss('#form-respond button')
      .click()
      .elementByTagName('legend')
      .text()
      .then(function (text) {
        return assert.equal(text, 'Submit a new Contribution as response to This interest gets a response');
      })
      .then(createContrib(browser, 'i am a response', 'i am a responder', 'this is a response to an interest i found on the internetz.'))
      .elementByClassName('response-info')
      .text()
      .then(function (text) {
        return assert.equal(text, 'This is a response to the request This interest gets a response from Peter');
      })
      .elementByClassName('response-link')
      .click()
      .eval('window.location.href')
      .then(function (href) {
        assert.ok(href.indexOf('interests') !== -1);
      })
      .textPresent('i am a response by i am a responder', 'body')
      .then(function (textIsPresent) {
        return assert.ok(textIsPresent);
      })
      .fin(function () {
        browser.quit();
        next();
      }).done();
  },


};
module.exports = tests;
