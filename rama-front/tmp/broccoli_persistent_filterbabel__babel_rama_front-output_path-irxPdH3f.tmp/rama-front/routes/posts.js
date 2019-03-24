define('rama-front/routes/posts', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    queryParams: {
      page: {
        refreshModel: true
      },
      limit: {
        refreshModel: true
      }
    },

    model(params) {
      return this.store.query('post', {
        filter: {
          name: "categories.name",
          op: "!=",
          val: "Projects"
        },
        limit: params.limit,
        page: params.page,
        includes: ["tags", "categories"]
        // "categories": ["Projects"]
      });
    }

    // model: function(params) {
    //   return this.get('store').query('post', {
    //     page: {
    //       number: params.page
    //     }
    //   });
    // },

    // model: function(params) {
    //   return this.store.query('category', {
    //     filter: {
    //       'name': 'Projects'
    //     }
    //   }).then(categories => {
    //     let categoryIds = categories.map(c => { return c.id; });
    //     return this.store.query('post', {
    //       filter: {
    //         '!categories': categoryIds
    //       },
    //       page: {
    //         number: params.page
    //       }
    //     });
    //   });
    // }

  });
});