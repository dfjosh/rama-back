import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({  
  limit: null,
  page: null,
  total: null,

  prevPage: computed('page', function() {
    return this.page - 1;
  }),

  nextPage: computed('page', function() {
    return this.page + 1;
  }),

  isFirstPage: computed('page', function() {
    return this.page === 1;
  }),

  isLastPage: computed('limit', 'page', 'total', function() {
    return this.page * this.limit >= this.total;
  })
});
