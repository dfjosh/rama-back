define('rama-front/routes/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({

    // Route Hooks: beforeModel(), model(), afterModel(), setupController()
    // Route Actions: actions: { willTransition(), didTransition() }

    beforeModel: function beforeModel() {
      this.transitionTo('projects');
    }
  });
});