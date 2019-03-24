define('rama-front/services/moment', ['exports', 'ember', 'rama-front/config/environment', 'ember-moment/services/moment'], function (exports, _ember, _ramaFrontConfigEnvironment, _emberMomentServicesMoment) {
  exports['default'] = _emberMomentServicesMoment['default'].extend({
    defaultFormat: _ember['default'].get(_ramaFrontConfigEnvironment['default'], 'moment.outputFormat')
  });
});