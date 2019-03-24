define('rama-front/routes/posts', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    queryParams: {
      page: {
        refreshModel: true
      }
    },

    model: function model(params) {
      // return this.store.findAll('post');

      // Add .query() if you want to add params to your request

      // return this.store.query('post', {
      //   sort: '-created_at'
      // });

      // return this.store.query('post', {
      //   filter: {
      //     author: 'wetjosh'
      //   }
      // });

      // return this.get('store').query('post', {
      //   page: {
      //     number: 1
      //   }
      // });

      return this.get('store').query('post', {
        page: {
          number: params.page
        }
      });
    }

  });
});