define('rama-front/tests/helpers/start-app', ['exports', 'ember', 'rama-front/app', 'rama-front/config/environment'], function (exports, _ember, _ramaFrontApp, _ramaFrontConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _ramaFrontConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _ramaFrontApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});