
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

  'I can respond to an interest with a Contribution': function (next) {
    var voteCount;
    browser.init({
        browserName: 'firefox'
      , name: 'test'
    }).then(function () {
        return browser.get(s.url);
    }).then(function () {
        return browser.elementByLinkText('This interest gets a response');
    }).then(function (el) {
        return browser.clickElement(el);
    }).then(function () {
      return browser.elementByCss('#form-respond button');
    }).then(function (el) {
        return browser.clickElement(el);
    }).then(function () {
        return browser.elementsByTagName('legend');
    }).then(function (el) {
        return el[0].text();
    }).then(function (text) {
      assert.equal(text, 'Submit a new Contribution as response to This interest gets a response');
    }).then(function () {
      return browser.elementByName('title');
    }).then(function (el) {
        return el.sendKeys('i am a response');
    }).then(function () {
      return browser.elementByName('contributor');
    }).then(function (el) {
        return el.sendKeys('i am a responder');
    }).then(function () {
      return browser.elementByTagName('textarea');
    }).then(function (el) {
        return el.sendKeys('this is a response to an interest i found on the internetz.');
    }).then(function () {
        return browser.elementByClassName('btn-primary');
    }).then(function (el) {
        return browser.clickElement(el);
    }).then(function () {
        return browser.elementByClassName('response-info');
    }).then(function (el) {
        return el.text();
    }).then(function (text) {
        return assert.equal(text, 'This is a response to the request This interest gets a response from Peter')
    }).then(function () {
        return browser.elementByClassName('response-link');
    }).then(function (el) {
        return browser.clickElement(el);
    }).then(function () {
        return browser.eval('window.location.href');
    }).then(function (href) {
        assert.ok(href.indexOf('interests') !== -1);
    }).then(function () {
        return browser.textPresent('i am a response by i am a responder', 'body');
    }).then(function (textIsPresent) {
        return assert.ok(textIsPresent);
    }).fin(function () {
        browser.quit();
        next();
    }).done();
  },


};
module.exports = tests;
