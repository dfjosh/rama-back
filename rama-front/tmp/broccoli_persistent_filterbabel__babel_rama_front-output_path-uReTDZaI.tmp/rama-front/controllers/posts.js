define('rama-front/controllers/posts', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    queryParams: ['page'],

    page: 1,

    prevPage: _ember['default'].computed('page', function () {
      return this.get('page') - 1;
    }),

    nextPage: _ember['default'].computed('page', function () {
      return this.get('page') + 1;
    }),

    lastPage: _ember['default'].computed(function () {
      return this.store.query('post', {}).then(function (result) {
        var params = result.get('links.last').split("?")[1].split("&");
        var page = params.filter(function (param) {
          return param.startsWith('page%5Bnumber%5D=');
        })[0];
        return parseInt(page.split("=")[1]);
      });
    }),

    isFirstPage: _ember['default'].computed('page', function () {
      return this.get('page') === 1;
    }),

    isLastPage: _ember['default'].computed('page', 'lastPage', function () {
      var _this = this;

      var promise = this.get('lastPage').then(function (lastPage) {
        return _this.get('page') === lastPage;
      });
      return DS.PromiseObject.create({
        promise: promise
      });
    })
  });
});