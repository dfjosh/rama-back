define('rama-front/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'rama-front/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _ramaFrontConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_ramaFrontConfigEnvironment['default'].APP.name, _ramaFrontConfigEnvironment['default'].APP.version)
  };
});