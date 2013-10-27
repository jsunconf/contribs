
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

var testVoting = require('./_shared.js').testVoting;

tests = {

  'before': function (next) {
    s.start(next);
  },

  'after': function (next) {
    s.stop(next);
  },

  'Interests have votes and when I vote the vote is saved, after that I can not vote again': function (next) {
    browser.init({browserName: 'firefox'})
      .get(s.url)
      .elementByLinkText('JS as compilation target')
      .click()
      .eval('window.location.href')
      .then(function (href) {
        return assert.ok(href.indexOf('interests') !== -1);
      })
      .then(testVoting(browser))
      .fin(function () {
        browser.quit();
        next();
      }).done();
  },


};
module.exports = tests;
