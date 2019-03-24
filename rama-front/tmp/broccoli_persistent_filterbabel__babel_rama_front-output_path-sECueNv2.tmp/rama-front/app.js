define('rama-front/app', ['exports', 'ember', 'rama-front/resolver', 'ember-load-initializers', 'rama-front/config/environment'], function (exports, _ember, _ramaFrontResolver, _emberLoadInitializers, _ramaFrontConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _ramaFrontConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _ramaFrontConfigEnvironment['default'].podModulePrefix,
    Resolver: _ramaFrontResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _ramaFrontConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});