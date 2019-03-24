define('ember-simple-auth/test-support/index', ['exports', '@ember/test-helpers', 'ember-simple-auth/authenticators/test'], function (exports, _testHelpers, _test) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.authenticateSession = authenticateSession;
  exports.currentSession = currentSession;
  exports.invalidateSession = invalidateSession;


  const SESSION_SERVICE_KEY = 'service:session';
  const TEST_CONTAINER_KEY = 'authenticator:test';

  function ensureAuthenticator(owner) {
    const authenticator = owner.lookup(TEST_CONTAINER_KEY);
    if (!authenticator) {
      owner.register(TEST_CONTAINER_KEY, _test.default);
    }
  }

  /**
   * Authenticates the session.
   *
   * @param {Object} sessionData Optional argument used to mock an authenticator
   * response (e.g. a token or user).
   * @return {Promise}
   * @public
   */
  function authenticateSession(sessionData) {
    const { owner } = (0, _testHelpers.getContext)();
    const session = owner.lookup(SESSION_SERVICE_KEY);
    ensureAuthenticator(owner);
    return session.authenticate(TEST_CONTAINER_KEY, sessionData).then(() => {
      return (0, _testHelpers.settled)();
    });
  }

  /**
   * Returns the current session.
   *
   * @return {Object} a session service.
   * @public
   */
  function currentSession() {
    const { owner } = (0, _testHelpers.getContext)();
    return owner.lookup(SESSION_SERVICE_KEY);
  }

  /**
   * Invalidates the session.
   *
   * @return {Promise}
   * @public
   */
  function invalidateSession() {
    const { owner } = (0, _testHelpers.getContext)();
    const session = owner.lookup(SESSION_SERVICE_KEY);
    const isAuthenticated = Ember.get(session, 'isAuthenticated');
    return Ember.RSVP.resolve().then(() => {
      if (isAuthenticated) {
        return session.invalidate();
      }
    }).then(() => (0, _testHelpers.settled)());
  }
});