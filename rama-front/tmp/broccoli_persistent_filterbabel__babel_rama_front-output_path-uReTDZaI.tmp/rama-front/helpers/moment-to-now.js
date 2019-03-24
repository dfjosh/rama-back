define('rama-front/helpers/moment-to-now', ['exports', 'ember', 'rama-front/config/environment', 'ember-moment/helpers/moment-to-now'], function (exports, _ember, _ramaFrontConfigEnvironment, _emberMomentHelpersMomentToNow) {
  exports['default'] = _emberMomentHelpersMomentToNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ramaFrontConfigEnvironment['default'], 'moment.allowEmpty')
  });
});