define('rama-front/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'rama-front/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _ramaFrontConfigEnvironment) {

  var name = _ramaFrontConfigEnvironment['default'].APP.name;
  var version = _ramaFrontConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});