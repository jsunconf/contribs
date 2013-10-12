var Contrib = function () {

  this.defineProperties({
    title: {type: 'string', required: true},
    contributor: {type: 'string'},
    description: {type: 'text'}
  });

  this.validatesPresent('title');
  this.validatesLength('title', {min: 3});

  this.validatesPresent('contributor');

  this.validatesPresent('description');
  this.validatesLength('description', {min: 10});

  this.hasMany('Karmas');
};

Contrib = geddy.model.register('Contrib', Contrib);
