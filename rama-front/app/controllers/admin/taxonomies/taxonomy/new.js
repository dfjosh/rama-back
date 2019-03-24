import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    createTaxonomy() {
      this.model.save().then(() => {
        this.transitionToRoute('admin.taxonomies.taxonomy'); 
      });
    }
  }
});
