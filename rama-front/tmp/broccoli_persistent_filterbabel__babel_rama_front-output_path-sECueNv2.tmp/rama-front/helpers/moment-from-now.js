define('rama-front/helpers/moment-from-now', ['exports', 'ember', 'rama-front/config/environment', 'ember-moment/helpers/moment-from-now'], function (exports, _ember, _ramaFrontConfigEnvironment, _emberMomentHelpersMomentFromNow) {
  exports['default'] = _emberMomentHelpersMomentFromNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ramaFrontConfigEnvironment['default'], 'moment.allowEmpty')
  });
});