define('rama-front/routes/projects', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    // queryParams: {
    //   page: {
    //     refreshModel: true
    //   }
    // },

    model() {
      return this.store.query('post', {
        filter: {
          name: "categories.name",
          op: "=",
          val: "Projects"
        }
      });
    }

    // model() {     // params
    //   return this.store.query('category', {
    //     filter: {
    //       name: 'Projects'
    //     }
    //   }).then(categories => {
    //     let categoryIds = categories.map(c => { return c.id; });
    //     return this.store.query('post', {
    //       filter: {
    //         categories: categoryIds
    //       }
    //     });
    //   });
    // }
  });
});