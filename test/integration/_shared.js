var assert = require('assert');

exports.createContrib = createContrib;
exports.testVoting = testVoting;


function createContrib (browser, title, person, desc) {
  return function() {
    return browser
      .elementByName('title')
        .sendKeys(title)
      .elementByName('contributor')
        .sendKeys(person)
      .elementByTagName('textarea')
        .sendKeys(desc)
      .elementByClassName('btn-primary')
        .click();
  };
};

function testVoting (browser) {
  var voteCount;
  return function() {
    return browser
      .elementById('votes')
      .text()
      .then(function (text) {
        voteCount = +text;
        return assert.ok(voteCount !== 0);
      })
      .elementById('vote-for-link')
      .click()
      .refresh()
      .elementById('votes')
      .text()
      .then(function (text) {
        return assert.equal(+text, voteCount + 1);
      })
      .elementById('vote-for-link')
      .click()
      .refresh()
      .elementById('votes')
      .text()
      .then(function (text) {
        return assert.equal(+text, voteCount + 1);
      });
  };
};
