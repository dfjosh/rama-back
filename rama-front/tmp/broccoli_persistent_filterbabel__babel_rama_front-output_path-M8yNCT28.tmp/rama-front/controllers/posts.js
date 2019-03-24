define('rama-front/controllers/posts', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    queryParams: ['page'],
    page: 1
  });
});