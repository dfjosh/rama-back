define('rama-front/tests/helpers/resolver', ['exports', 'rama-front/resolver', 'rama-front/config/environment'], function (exports, _ramaFrontResolver, _ramaFrontConfigEnvironment) {

  var resolver = _ramaFrontResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _ramaFrontConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _ramaFrontConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});