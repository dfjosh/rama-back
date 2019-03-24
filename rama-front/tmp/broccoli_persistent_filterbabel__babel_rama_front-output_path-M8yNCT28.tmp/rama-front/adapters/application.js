define('rama-front/adapters/application', ['exports', 'ember-data', 'rama-front/config/environment'], function (exports, _emberData, _ramaFrontConfigEnvironment) {
  exports['default'] = _emberData['default'].JSONAPIAdapter.extend({
    host: _ramaFrontConfigEnvironment['default'].apiURL
  });
});