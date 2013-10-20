
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

  'Contribs are created and listed on the main page': function (next) {
    browser.init({
        browserName: 'firefox'
      , name: 'test'
    }).then(function () {
        return browser.get(s.url + '/contribs/add');
    }).then(function () {
      return browser.elementByName('title');
    }).then(function (el) {
        return el.sendKeys('node core - an opera in five acts');
    }).then(function () {
      return browser.elementByName('contributor');
    }).then(function (el) {
        return el.sendKeys('node developer');
    }).then(function () {
      return browser.elementByTagName('textarea');
    }).then(function (el) {
        return el.sendKeys('A workshop how to get started with helping on node core');
    }).then(function () {
        return browser.elementByClassName('btn-primary');
    }).then(function (el) {
        return browser.clickElement(el);
    }).then(function () {
        return browser.elementsByTagName('h2');
    }).then(function (el) {
        return el[0].text();
    }).then(function (value) {
        return assert.equal(value, 'node core - an opera in five acts');
    }).then(function () {
        return browser.get(s.url);
    }).then(function () {
        return browser.elementByLinkText('node core - an opera in five acts');
    }).then(function (el) {
        return browser.clickElement(el);
    }).then(function () {
        return browser.elementsById('votes');
    }).then(function (el) {
        return el[0].text();
    }).then(function (text) {
        assert.ok(+text === 0);
    }).fin(function () {
        browser.quit();
        next();
    }).done();
  },

};
module.exports = tests;
