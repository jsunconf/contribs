
var assert = require('assert');

var wd = require('wd')
  , colors = require('colors')
  , browser = wd.remote();

var testhelper = require(__dirname + '/../test-helper.js');
var s = testhelper.selenium;

var browser = wd.promiseRemote();

browser.on('status', function (info) {
  console.log(info.cyan);
});

browser.on('command', function (meth, path, data) {
  console.log(' > ' + meth.yellow, path.grey, data || '');
});

tests = {

  'before': function (next) {
    s.start(next);
  },

  'after': function (next) {
    s.stop(next);
  },

  'Contribs have votes and when I vote the vote is saved': function (next) {
    var voteCount;
    browser.init({
        browserName: 'firefox'
      , name: 'test'
    }).then(function () {
        return browser.get(s.url);
    }).then(function () {
        return browser.elementByLinkText('My life as JS Dev');
    }).then(function (el) {
        return browser.clickElement(el);
    }).then(function () {
        return browser.eval('window.location.href');
    }).then(function (href) {
        assert.ok(href.indexOf('contribs') !== -1);
    }).then(function () {
        return browser.elementsById('votes');
    }).then(function (el) {
        return el[0].text();
    }).then(function (text) {
      voteCount = +text;
      assert.ok(voteCount !== 0);
    }).then(function () {
      return browser.elementsById('vote-for-link');
    }).then(function (el) {
        return browser.clickElement(el);
    }).then(function () {
        return browser.refresh();
    }).then(function () {
        return browser.elementsById('votes');
    }).then(function (el) {
        return el[0].text();
    }).then(function (text) {
      assert.equal(+text, voteCount + 1);
    }).fin(function () {
        browser.quit();
        next();
    }).done();
  },


};
module.exports = tests;
