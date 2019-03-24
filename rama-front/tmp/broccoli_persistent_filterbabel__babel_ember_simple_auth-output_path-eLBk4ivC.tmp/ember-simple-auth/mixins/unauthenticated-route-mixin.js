define('ember-simple-auth/mixins/unauthenticated-route-mixin', ['exports', 'ember-simple-auth/configuration', 'ember-simple-auth/utils/is-fastboot'], function (exports, _configuration, _isFastboot) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  /**
   *
   * @param {ApplicationInstance} owner The ApplicationInstance that owns the session service
   * @param {(...args: [any]) => any} callback Callback that will be invoked if the user is authenticated
   */
  function runIfAuthenticated(owner, callback) {
    const sessionSvc = owner.lookup('service:session');
    if (sessionSvc.get('isAuthenticated')) {
      callback();
      return true;
    }
  }

  /**
    __This mixin is used to make routes accessible only if the session is
    not authenticated__ (e.g., login and registration routes). It defines a
    `beforeModel` method that aborts the current transition and instead
    transitions to the
    {{#crossLink "Configuration/routeIfAlreadyAuthenticated:property"}}{{/crossLink}}
    if the session is authenticated.
  
    ```js
    // app/routes/login.js
    import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
  
    export default Ember.Route.extend(UnauthenticatedRouteMixin);
    ```
  
    @class UnauthenticatedRouteMixin
    @module ember-simple-auth/mixins/unauthenticated-route-mixin
    @extends Ember.Mixin
    @public
  */
  exports.default = Ember.Mixin.create({
    /**
      The session service.
       @property session
      @readOnly
      @type SessionService
      @public
    */
    session: Ember.inject.service('session'),

    _isFastBoot: (0, _isFastboot.default)(),

    /**
      The route to transition to if a route that implements the
      {{#crossLink "UnauthenticatedRouteMixin"}}{{/crossLink}} is accessed when
      the session is authenticated.
       @property routeIfAlreadyAuthenticated
      @type String
      @default 'index'
      @public
    */
    routeIfAlreadyAuthenticated: Ember.computed(function () {
      return _configuration.default.routeIfAlreadyAuthenticated;
    }),

    /**
      Checks whether the session is authenticated and if it is aborts the current
      transition and instead transitions to the
      {{#crossLink "Configuration/routeIfAlreadyAuthenticated:property"}}{{/crossLink}}.
       __If `beforeModel` is overridden in a route that uses this mixin, the route's
     implementation must call `this._super(...arguments)`__ so that the mixin's
     `beforeModel` method is actually executed.
       @method beforeModel
      @public
    */
    beforeModel() {
      const didRedirect = runIfAuthenticated(Ember.getOwner(this), () => {
        let routeIfAlreadyAuthenticated = this.get('routeIfAlreadyAuthenticated');
        (true && !(this.get('routeName') !== routeIfAlreadyAuthenticated) && Ember.assert('The route configured as Configuration.routeIfAlreadyAuthenticated cannot implement the UnauthenticatedRouteMixin mixin as that leads to an infinite transitioning loop!', this.get('routeName') !== routeIfAlreadyAuthenticated));


        this.transitionTo(routeIfAlreadyAuthenticated);
      });
      if (!didRedirect) {
        return this._super(...arguments);
      }
    }
  });
});