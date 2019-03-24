import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  queryParams: ['limit', 'page'],
  limit: 10,
  page: 1,
  
  total: computed('model', function() {
    return this.model.meta.total;
  })
});
