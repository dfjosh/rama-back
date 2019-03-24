define('rama-front/routes/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    // Route Hooks: beforeModel(), model(), afterModel(), setupController()
    // Route Actions: actions: { willTransition(), didTransition() }

    beforeModel: function () {
      this.transitionTo('projects');
    }
  });
});