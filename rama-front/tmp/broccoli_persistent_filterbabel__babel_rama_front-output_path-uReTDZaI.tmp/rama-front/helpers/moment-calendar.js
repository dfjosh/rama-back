define('rama-front/helpers/moment-calendar', ['exports', 'ember', 'rama-front/config/environment', 'ember-moment/helpers/moment-calendar'], function (exports, _ember, _ramaFrontConfigEnvironment, _emberMomentHelpersMomentCalendar) {
  exports['default'] = _emberMomentHelpersMomentCalendar['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ramaFrontConfigEnvironment['default'], 'moment.allowEmpty')
  });
});