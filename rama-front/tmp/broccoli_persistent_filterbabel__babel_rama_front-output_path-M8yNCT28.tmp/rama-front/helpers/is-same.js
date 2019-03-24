define('rama-front/helpers/is-same', ['exports', 'ember', 'rama-front/config/environment', 'ember-moment/helpers/is-same'], function (exports, _ember, _ramaFrontConfigEnvironment, _emberMomentHelpersIsSame) {
  exports['default'] = _emberMomentHelpersIsSame['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ramaFrontConfigEnvironment['default'], 'moment.allowEmpty')
  });
});