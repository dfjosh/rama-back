define('rama-front/routes/admin/posts/edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model(params) {
      return this.store.findRecord('post', params.post_id);
    }
  });
});