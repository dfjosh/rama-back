define('rama-front/helpers/formatted-date', ['exports', 'moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.formattedDate = formattedDate;
  function formattedDate(params /*, hash*/) {
    let date = params[0];
    let format = params[1] || "YYYY-MM-DD HH:mm:ss";

    var result = (0, _moment.default)(date).format(format);
    return result;
  }

  exports.default = Ember.Helper.helper(formattedDate);
});