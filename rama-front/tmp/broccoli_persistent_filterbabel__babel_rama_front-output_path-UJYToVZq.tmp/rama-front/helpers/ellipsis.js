define('rama-front/helpers/ellipsis', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ellipsis = ellipsis;
  function ellipsis(params /*, hash*/) {
    var str = params[0];
    let targetLength = params[1];

    if (targetLength === undefined || targetLength >= str.length) {
      return str;
    } else {
      return Ember.String.htmlSafe(str.slice(0, targetLength) + "&hellip;");
    }
  }

  exports.default = Ember.Helper.helper(ellipsis);
});