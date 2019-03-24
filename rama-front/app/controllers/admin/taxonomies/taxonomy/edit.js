import Controller from '@ember/controller';
import ObjectProxy from '@ember/object/proxy';
import { computed } from '@ember/object';

export default Controller.extend({
  preserveScrollPosition: true,
  
  // use a proxy so the model doesn't get updated behind the modal while we're editing
  proxy: computed('model', function() {
    return ObjectProxy.create({name: this.model.name});
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
