define('rama-front/components/pagination-comp', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    limit: null,
    page: null,
    total: null,

    prevPage: Ember.computed('page', function () {
      return this.page - 1;
    }),

    nextPage: Ember.computed('page', function () {
      return this.page + 1;
    }),

    isFirstPage: Ember.computed('page', function () {
      return this.page === 1;
    }),

    isLastPage: Ember.computed('limit', 'page', 'total', function () {
      return this.page * this.limit >= this.total;
    })
  });
});