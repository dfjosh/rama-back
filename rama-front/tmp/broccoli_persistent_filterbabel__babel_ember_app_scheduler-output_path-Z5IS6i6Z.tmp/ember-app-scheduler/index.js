define('ember-app-scheduler/index', ['exports', 'ember-app-scheduler/scheduler'], function (exports, _scheduler) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'beginTransition', {
    enumerable: true,
    get: function () {
      return _scheduler.beginTransition;
    }
  });
  Object.defineProperty(exports, 'endTransition', {
    enumerable: true,
    get: function () {
      return _scheduler.endTransition;
    }
  });
  Object.defineProperty(exports, 'routeSettled', {
    enumerable: true,
    get: function () {
      return _scheduler.routeSettled;
    }
  });
  Object.defineProperty(exports, 'setupRouter', {
    enumerable: true,
    get: function () {
      return _scheduler.setupRouter;
    }
  });
  Object.defineProperty(exports, 'reset', {
    enumerable: true,
    get: function () {
      return _scheduler.reset;
    }
  });
  Object.defineProperty(exports, 'didTransition', {
    enumerable: true,
    get: function () {
      return _scheduler.didTransition;
    }
  });
  Object.defineProperty(exports, 'whenRoutePainted', {
    enumerable: true,
    get: function () {
      return _scheduler.whenRoutePainted;
    }
  });
  Object.defineProperty(exports, 'whenRouteIdle', {
    enumerable: true,
    get: function () {
      return _scheduler.whenRouteIdle;
    }
  });
  Object.defineProperty(exports, 'TRANSITION_INTERUPTED', {
    enumerable: true,
    get: function () {
      return _scheduler.TRANSITION_INTERUPTED;
    }
  });
});