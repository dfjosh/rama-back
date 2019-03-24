define('rama-front/helpers/moment-format', ['exports', 'ember', 'rama-front/config/environment', 'ember-moment/helpers/moment-format'], function (exports, _ember, _ramaFrontConfigEnvironment, _emberMomentHelpersMomentFormat) {
  exports['default'] = _emberMomentHelpersMomentFormat['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ramaFrontConfigEnvironment['default'], 'moment.allowEmpty')
  });
});