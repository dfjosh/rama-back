define('rama-front/routes/admin/taxonomies/taxonomy/edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    // NOTE the model hook won't run if accessed via the link-to in taxonomy.hbs since I supply a model,
    // but this is necessary if you want it to work by manually typing the url i.e. /admin/taxonomies/tags/3/edit
    model(params) {
      let taxonomy = this.modelFor('admin.taxonomies.taxonomy').modelName;
      return this.store.findRecord(taxonomy, params.taxonomy_id);
    }
  });
});