define('rama-front/components/admin-toolbar-comp', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ['admin-toolbar-comp'],

    store: Ember.inject.service(),
    session: Ember.inject.service(),

    actions: {
      logout() {
        this.session.invalidate();
      }
    }
  });
});