
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

  'Feeds are working and link to contribs': function (next) {
    browser.init({
        browserName: 'firefox'
      , name: 'test'
    }).then(function () {
        return browser.get(s.url + '/contribs.xml');
    }).then(function () {
        return browser.elementByLinkText('My life as JS Dev');
    }).then(function (el) {
        return browser.clickElement(el);
    }).then(function () {
        return browser.eval('window.location.href');
    }).then(function (href) {
        assert.ok(href.indexOf('contribs') !== -1);
    }).then(function () {
        return browser.elementByTagName('h2');
    }).then(function (el) {
        return el.text();
    }).then(function (text) {
      assert.equal(text, 'My life as JS Dev');
    }).fin(function () {
        browser.quit();
        next();
    }).done();
  },

};
module.exports = tests;
