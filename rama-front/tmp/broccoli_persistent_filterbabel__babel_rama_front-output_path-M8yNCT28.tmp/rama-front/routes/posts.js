define('rama-front/routes/posts', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    queryParams: {
      page: {
        refreshModel: true
      }
    },

    model: function model(params) {
      return this.get('store').query('post', {
        page: {
          number: params.page
        }
      });
    }
  });
});