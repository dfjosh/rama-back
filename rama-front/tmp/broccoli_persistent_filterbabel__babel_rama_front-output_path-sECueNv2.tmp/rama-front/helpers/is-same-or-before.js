define('rama-front/helpers/is-same-or-before', ['exports', 'ember', 'rama-front/config/environment', 'ember-moment/helpers/is-same-or-before'], function (exports, _ember, _ramaFrontConfigEnvironment, _emberMomentHelpersIsSameOrBefore) {
  exports['default'] = _emberMomentHelpersIsSameOrBefore['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ramaFrontConfigEnvironment['default'], 'moment.allowEmpty')
  });
});