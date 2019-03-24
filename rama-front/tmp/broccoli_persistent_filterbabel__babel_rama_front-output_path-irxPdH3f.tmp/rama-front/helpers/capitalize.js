define('rama-front/helpers/capitalize', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.capitalize = capitalize;
  function capitalize(params /*, hash*/) {
    let string = params[0];
    return Ember.String.capitalize(string);
  }

  exports.default = Ember.Helper.helper(capitalize);
});