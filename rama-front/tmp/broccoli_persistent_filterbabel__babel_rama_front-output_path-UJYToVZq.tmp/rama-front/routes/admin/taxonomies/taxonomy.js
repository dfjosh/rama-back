define('rama-front/routes/admin/taxonomies/taxonomy', ['exports', 'ember-inflector'], function (exports, _emberInflector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model(params) {
      let taxonomy = (0, _emberInflector.singularize)(params.taxonomy);
      // this.set('taxonomy', taxonomy);
      return this.store.findAll(taxonomy);
    }
  } // 
  // setupController(controller, model) {
  //   this._super(controller, model);
  // 
  //   controller.set('modelName', this.taxonomy);
  // }
  );
});