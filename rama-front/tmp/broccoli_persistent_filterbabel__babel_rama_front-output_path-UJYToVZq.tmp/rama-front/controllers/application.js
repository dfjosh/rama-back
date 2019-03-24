define('rama-front/controllers/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    session: Ember.inject.service(),

    newPost: Ember.computed(function () {
      return this.store.createRecord('post');
    })

    // actions: {
    //   invalidateSession() {
    //     this.get('session').invalidate();
    //   }
    // }
  });
});