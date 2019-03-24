define('rama-front/controllers/admin/taxonomies/taxonomy/new', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    actions: {
      createTaxonomy() {
        this.model.save().then(() => {
          this.transitionToRoute('admin.taxonomies.taxonomy');
        });
      }
    }
  });
});