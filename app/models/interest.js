var Interest = function () {

  this.defineProperties({
    title: {type: 'string', required: true},
    prospect: {type: 'string'},
    description: {type: 'string'}
  });

  /*
  this.property('login', 'string', {required: true});
  this.property('password', 'string', {required: true});
  this.property('lastName', 'string');
  this.property('firstName', 'string');

  this.validatesPresent('login');
  this.validatesFormat('login', /[a-z]+/, {message: 'Subdivisions!'});
  this.validatesLength('login', {min: 3});
  // Use with the name of the other parameter to compare with
  this.validatesConfirmed('password', 'confirmPassword');
  // Use with any function that returns a Boolean
  this.validatesWithFunction('password', function (s) {
      return s.length > 0;
  });

  // Can define methods for instances like this
  this.someMethod = function () {
    // Do some stuff
  };
  */

};

/*
// Can also define them on the prototype
Interest.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
Interest.someStaticMethod = function () {
  // Do some other stuff
};
Interest.someStaticProperty = 'YYZ';
*/

exports.Interest = Interest;

