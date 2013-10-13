var Interest = function () {

  this.defineProperties({
    title: {type: 'string', required: true},
    prospect: {type: 'string'},
    description: {type: 'text'}
  });

  this.validatesPresent('title');
  this.validatesLength('title', {min: 3});

  this.validatesPresent('prospect');

  this.validatesPresent('description');
  this.validatesLength('description', {min: 10});

  this.hasMany('Karmas');

};


exports.Interest = Interest;
