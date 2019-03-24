define('rama-front/helpers/is-between', ['exports', 'ember', 'rama-front/config/environment', 'ember-moment/helpers/is-between'], function (exports, _ember, _ramaFrontConfigEnvironment, _emberMomentHelpersIsBetween) {
  exports['default'] = _emberMomentHelpersIsBetween['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ramaFrontConfigEnvironment['default'], 'moment.allowEmpty')
  });
});