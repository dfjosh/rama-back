define('moment/index', ['exports', 'ember'], function (exports, _ember) {
  /* globals self */

  'use strict';

  var moment = self.moment;

  var ComparableMoment = _ember['default'].Object.extend(_ember['default'].Comparable, moment.fn, {
    compare: function compare(a, b) {
      if (moment.isMoment(a) && moment.isMoment(b)) {
        if (a.isBefore(b)) {
          return -1;
        } else if (a.isSame(b)) {
          return 0;
        } else {
          return 1;
        }
      }

      throw new Error('Arguments provided to `compare` are not moment objects');
    },

    clone: function clone() {
      return comparableMoment(this);
    }
  });

  function comparableMoment() {
    return ComparableMoment.create(moment.apply(undefined, arguments));
  };

  // Wrap global moment methods that return a full moment object
  ['utc', 'unix'].forEach(function (methodName) {
    comparableMoment[methodName] = function () {
      return ComparableMoment.create(moment[methodName].apply(moment, arguments));
    };
  });

  var _loop = function _loop(momentProp) {
    if (moment.hasOwnProperty(momentProp) && !comparableMoment.hasOwnProperty(momentProp)) {
      Object.defineProperty(comparableMoment, momentProp, {
        enumerable: true,
        configurable: true,
        get: function get() {
          return moment[momentProp];
        },
        set: function set(newValue) {
          moment[momentProp] = newValue;
        }
      });
    }
  };

  for (var momentProp in moment) {
    _loop(momentProp);
  }

  exports['default'] = comparableMoment;
});