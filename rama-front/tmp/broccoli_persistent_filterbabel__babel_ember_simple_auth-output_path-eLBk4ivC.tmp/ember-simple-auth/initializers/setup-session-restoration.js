define('ember-simple-auth/initializers/setup-session-restoration', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = setupSessionRestoration;
  function setupSessionRestoration(registry) {
    const ApplicationRoute = registry.resolveRegistration ? registry.resolveRegistration('route:application') : registry.resolve('route:application');

    ApplicationRoute.reopen({
      init() {
        this._super(...arguments);

        const originalBeforeModel = this.beforeModel;
        this.beforeModel = function () {
          const session = Ember.getOwner(this).lookup('session:main');

          return session.restore().then(() => originalBeforeModel.apply(this, arguments), () => originalBeforeModel.apply(this, arguments));
        };
      }
    });
  }
});