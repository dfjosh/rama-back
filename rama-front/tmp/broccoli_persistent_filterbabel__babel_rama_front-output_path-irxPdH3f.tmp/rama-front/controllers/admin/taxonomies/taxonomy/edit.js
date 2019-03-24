define('rama-front/controllers/admin/taxonomies/taxonomy/edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    preserveScrollPosition: true,

    // use a proxy so the model doesn't get updated behind the modal while we're editing
    proxy: Ember.computed('model', function () {
      return Ember.ObjectProxy.create({ name: this.model.name });
    }),

    actions: {
      editTaxonomy() {
        let taxonomy = this.model;
        taxonomy.set('name', this.proxy.name);
        taxonomy.save().then(() => {
          this.transitionToRoute('admin.taxonomies.taxonomy');
        });
      },
      deleteTaxonomy() {
        this.model.destroyRecord().then(() => {
          this.transitionToRoute('admin.taxonomies.taxonomy');
        });
      }
    }
  });
});