define('rama-front/routes/admin/taxonomies/taxonomy/new', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      let taxonomy = this.modelFor('admin.taxonomies.taxonomy').modelName;
      return this.store.createRecord(taxonomy);
    }
  });
});