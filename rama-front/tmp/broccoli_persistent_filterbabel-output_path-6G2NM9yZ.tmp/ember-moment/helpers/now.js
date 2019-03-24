define('ember-moment/helpers/now', ['exports', 'moment', 'ember-moment/helpers/-base'], function (exports, _moment, _emberMomentHelpersBase) {
  'use strict';

  exports['default'] = _emberMomentHelpersBase['default'].extend({
    compute: function compute() {
      this._super.apply(this, arguments);

      return _moment['default'].now();
    }
  });
});