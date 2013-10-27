
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

  'Contribs are created and listed on the main page': function (next) {
    browser.init({browserName: 'firefox'})
      .get(s.url + '/contribs/add')
      .then(createContrib(browser, 'node core - an opera in five acts', 'node developer', 'A workshop how to get started with helping on node core'))
      .elementByTagName('h2')
      .text()
      .then(function (value) {
        return assert.equal(value, 'node core - an opera in five acts');
      })
      .get(s.url)
      .elementByLinkText('node core - an opera in five acts')
      .click()
      .elementById('votes')
      .text()
      .then(function (text) {
        assert.ok(+text === 0);
      })
      .fin(function () {
        browser.quit();
        next();
      }).done();
  },

};
module.exports = tests;
