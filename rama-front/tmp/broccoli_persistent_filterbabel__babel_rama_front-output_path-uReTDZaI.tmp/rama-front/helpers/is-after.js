define('rama-front/helpers/is-after', ['exports', 'ember', 'rama-front/config/environment', 'ember-moment/helpers/is-after'], function (exports, _ember, _ramaFrontConfigEnvironment, _emberMomentHelpersIsAfter) {
  exports['default'] = _emberMomentHelpersIsAfter['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ramaFrontConfigEnvironment['default'], 'moment.allowEmpty')
  });
});