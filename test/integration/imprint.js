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

  'Imprint is reachable from the Index and has a Ust-Id': function (next) {
    browser.init({
        browserName: 'firefox'
      , name: 'Impressum'
    }).then(function () {
        return browser.get(s.url);
    }).then(function () {
        return browser.elementByLinkText('Imprint');
    }).then(function (el) {
        return browser.clickElement(el);
    }).then(function () {
        return browser.eval('window.location.href');
    }).then(function (href) {
        assert.ok(href.indexOf('imprint') !== -1);
    }).then(function () {
        return browser.elementsByTagName('section')
    }).then(function (sections) {
        assert.ok(sections[0].textPresent('Ust. IdNr.:'));
    }).fin(function () {
        browser.quit();
        next();
    }).done();
  },


};
module.exports = tests;

