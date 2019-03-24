define('rama-front/helpers/is-same-or-after', ['exports', 'ember', 'rama-front/config/environment', 'ember-moment/helpers/is-same-or-after'], function (exports, _ember, _ramaFrontConfigEnvironment, _emberMomentHelpersIsSameOrAfter) {
  exports['default'] = _emberMomentHelpersIsSameOrAfter['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ramaFrontConfigEnvironment['default'], 'moment.allowEmpty')
  });
});