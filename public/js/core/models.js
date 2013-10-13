(function () {
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
}());

(function () {
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
}());

(function () {
var Karma = function () {

  this.defineProperties({
    date: {type: 'date'}
  });

};

Karma = geddy.model.register('Karma', Karma);
}());