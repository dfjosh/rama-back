define('rama-front/components/header-comp', ['exports', 'rama-front/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ['header-comp'],
    classNameBindings: ['adminToolbarMargin'],
    tagName: 'header',
    ENV: _environment.default,

    session: Ember.inject.service(),

    adminToolbarMargin: Ember.computed('session', function () {
      return this.session.isAuthenticated;
    })
  });
});