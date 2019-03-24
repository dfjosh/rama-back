define('ember-app-scheduler/scheduler', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.beginTransition = beginTransition;
  exports.endTransition = endTransition;
  exports.setupRouter = setupRouter;
  exports.reset = reset;
  exports.didTransition = didTransition;
  exports.whenRoutePainted = whenRoutePainted;
  exports.whenRouteIdle = whenRouteIdle;
  exports.routeSettled = routeSettled;
  exports._getScheduleFn = _getScheduleFn;
  exports._setCapabilities = _setCapabilities;


  const APP_SCHEDULER_HAS_SETUP = '__APP_SCHEDULER_HAS_SETUP__';

  let _didTransition;
  let _whenRoutePainted;
  let _whenRoutePaintedScheduleFn;
  let _whenRouteIdle;
  let _whenRouteIdleScheduleFn;
  let _activeScheduledTasks = 0;
  const CAPABILITIES = {
    requestAnimationFrameEnabled: typeof requestAnimationFrame === 'function',
    requestIdleCallbackEnabled: typeof requestIdleCallback === 'function'
  };
  let _capabilities = CAPABILITIES;

  const USE_REQUEST_IDLE_CALLBACK = exports.USE_REQUEST_IDLE_CALLBACK = true;
  const SIMPLE_CALLBACK = exports.SIMPLE_CALLBACK = callback => callback();

  reset();

  function beginTransition() {
    if (_didTransition.isResolved) {
      _didTransition = _defer();
      _whenRoutePainted = _didTransition.promise.then(() => _afterNextPaint(_whenRoutePaintedScheduleFn));
      _whenRouteIdle = _whenRoutePainted.then(() => _afterNextPaint(_whenRouteIdleScheduleFn));
    }
  }

  function endTransition() {
    _didTransition.resolve();
  }

  function setupRouter(router) {
    if (router[APP_SCHEDULER_HAS_SETUP]) {
      return;
    }

    router[APP_SCHEDULER_HAS_SETUP] = true;
    router.on('willTransition', beginTransition);
    router.on('didTransition', endTransition);
  }

  function reset() {
    _didTransition = _defer();
    _whenRoutePainted = _didTransition.promise.then();
    _whenRouteIdle = _whenRoutePainted.then();
    _didTransition.resolve();
    _activeScheduledTasks = 0;
  }

  /**
   * Top level promise that represents the entry point for deferred work.
   * Subsequent promises are chained off this promise, successively composing
   * them together to approximate when painting has occurred.
   *
   * @public
   */
  function didTransition() {
    return _didTransition.promise;
  }

  /**
   * This promise, when resolved, approximates after the route is first painted.
   * This can be used to schedule work to occur that is lower priority than initial
   * work (content outside of the viewport, rendering non-critical content).
   *
   * @public
   */
  function whenRoutePainted() {
    return _whenRoutePainted;
  }

  /**
   * This promise, when resolved, approximates after content is painted.
   *
   * @public
   */
  function whenRouteIdle() {
    return _whenRouteIdle;
  }

  /**
   * Used for testing
   */
  function routeSettled() {
    return _whenRouteIdle;
  }

  function _getScheduleFn(useRequestIdleCallback = false) {
    if (useRequestIdleCallback && _capabilities.requestIdleCallbackEnabled) {
      return requestIdleCallback;
    } else if (_capabilities.requestAnimationFrameEnabled) {
      return requestAnimationFrame;
    } else {
      return SIMPLE_CALLBACK;
    }
  }

  function _setCapabilities(newCapabilities = CAPABILITIES) {
    _capabilities = newCapabilities;
  }

  _whenRoutePaintedScheduleFn = _getScheduleFn();
  _whenRouteIdleScheduleFn = _getScheduleFn(USE_REQUEST_IDLE_CALLBACK);

  function _afterNextPaint(scheduleFn) {
    let promise = new Ember.RSVP.Promise(resolve => {
      if (true) {
        _activeScheduledTasks++;
      }

      scheduleFn(() => {
        Ember.run.later(resolve, 0);
      });
    });

    if (true) {
      promise = promise.finally(() => {
        _activeScheduledTasks--;
      });
    }

    return promise;
  }

  if (true) {
    // wait until no active rafs
    Ember.Test.registerWaiter(() => _activeScheduledTasks === 0);
  }

  function _defer(label) {
    let deferred = { resolve: undefined, reject: undefined };

    deferred.isResolved = false;
    deferred.promise = new Ember.RSVP.Promise((resolve, reject) => {
      deferred.resolve = () => {
        deferred.isResolved = true;
        return resolve();
      };
      deferred.reject = reject;
    }, label);

    return deferred;
  }
});