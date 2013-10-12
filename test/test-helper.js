var Contrib = geddy.model.Contrib
  , Karma = geddy.model.Karma;

exports.createContrib = createContrib;
exports.createContribAndSave = createContribAndSave;

function createContrib (cb) {
  c = Contrib.create({
    title: 'What\'s wrong with php?',
    contributor: 'Ole Michaelis',
    description: 'These days, it often feels like php is an old, creepy piece of code - it seems that all the cool code kids are using ruby or node.\n\nBut is this actually the truth? I believe we as a community are on the right way to take our tools and the community to a new level. Composer and PSR are just a first step in the right direction. Each of us can do their part!\n\n'
  });
  return c;
}

function createContribAndSave (cb) {
  c = createContrib();
  c.save(cb);
}
