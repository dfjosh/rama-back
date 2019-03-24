define('rama-front/helpers/is-before', ['exports', 'ember', 'rama-front/config/environment', 'ember-moment/helpers/is-before'], function (exports, _ember, _ramaFrontConfigEnvironment, _emberMomentHelpersIsBefore) {
  exports['default'] = _emberMomentHelpersIsBefore['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ramaFrontConfigEnvironment['default'], 'moment.allowEmpty')
  });
});