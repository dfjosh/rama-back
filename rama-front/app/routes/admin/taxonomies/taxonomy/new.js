import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    let taxonomy = this.modelFor('admin.taxonomies.taxonomy').modelName;
    return this.store.createRecord(taxonomy);
  }
});
