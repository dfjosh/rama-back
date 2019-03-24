define('ember-simple-auth/authenticators/test', ['exports', 'ember-simple-auth/authenticators/base'], function (exports, _base) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _base.default.extend({
    restore(data) {
      return Ember.RSVP.resolve(data);
    },

    authenticate(data) {
      return Ember.RSVP.resolve(data);
    },

    invalidate() {
      return Ember.RSVP.resolve();
    }
  });
});