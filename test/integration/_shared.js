exports.createContrib = createContrib;

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
