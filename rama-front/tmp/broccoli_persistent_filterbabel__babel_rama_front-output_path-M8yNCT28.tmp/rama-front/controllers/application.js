define('rama-front/controllers/application', ['exports', 'ember', 'rama-front/config/environment'], function (exports, _ember, _ramaFrontConfigEnvironment) {
  exports['default'] = _ember['default'].Controller.extend({
    ENV: _ramaFrontConfigEnvironment['default']
  });
});