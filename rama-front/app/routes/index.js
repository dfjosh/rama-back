import Route from '@ember/routing/route';

export default Route.extend({

  // Route Hooks: beforeModel(), model(), afterModel(), setupController()
  // Route Actions: actions: { willTransition(), didTransition() }

  beforeModel: function() {
    this.transitionTo('projects');
  }
});
