import Route from '@ember/routing/route';
import { singularize } from 'ember-inflector';

export default Route.extend({
  model(params) {
    let taxonomy = singularize(params.taxonomy);
    // this.set('taxonomy', taxonomy);
    return this.store.findAll(taxonomy);
  },
  // 
  // setupController(controller, model) {
  //   this._super(controller, model);
  // 
  //   controller.set('modelName', this.taxonomy);
  // }
});
