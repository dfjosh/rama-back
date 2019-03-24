define('rama-front/controllers/posts', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    queryParams: ['limit', 'page'],
    limit: 10,
    page: 1,

    total: Ember.computed('model', function () {
      return this.model.meta.total;
    })
  });
});