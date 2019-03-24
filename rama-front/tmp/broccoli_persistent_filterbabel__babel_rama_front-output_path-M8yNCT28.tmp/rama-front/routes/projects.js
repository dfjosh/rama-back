define('rama-front/routes/projects', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    queryParams: {
      page: {
        refreshModel: true
      }
    },

    model: function model(params) {
      var _this = this;

      return this.get('store').query('category', {
        filter: {
          name: 'Projects'
        }
      }).then(function (categories) {
        var categoryIds = categories.map(function (c) {
          return c.id;
        });
        return _this.get('store').query('post', {
          filter: {
            categories: categoryIds
          }
        });
      });
    }
  });
});