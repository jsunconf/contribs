
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
var tweetButtonId = '#tweet-contrib';

tests = {

  'before': function (next) {
    s.start(next);
  },

  'after': function (next) {
    s.stop(next);
  },

  'Just the Contribs I have created will get a tweet link': function (next) {
    browser.init({browserName: 'firefox'})
      .get(s.url)
      .elementByLinkText('My life as JS Dev')
      .click()
      .elementByCssSelectorOrNull(tweetButtonId)
      .then(function (el) {
        return assert.ok(el === null);
      })
      .get(s.url + '/contribs/add')
      .then(createContrib(browser, 'My tweetTalk', 'Rocko', 'I will create a talk to tweet about it'))
      .elementByCssSelectorOrNull(tweetButtonId)
      .then(function (el) {
        return assert.ok(el !== null);
      })
      .fin(function () {
        browser.quit();
        next();
      }).done();
  },

};
module.exports = tests;
