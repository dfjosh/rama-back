define('rama-front/components/rama-pagination', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    page: null,

    prevPage: _ember['default'].computed('page', function () {
      return this.get('page') - 1;
    }),

    nextPage: _ember['default'].computed('page', function () {
      return this.get('page') + 1;
    }),

    isFirstPage: _ember['default'].computed('page', function () {
      return this.get('page') === 1;
    }),

    isLastPage: _ember['default'].computed('model', function () {
      return this.get('page') === this.get('model.meta.page-count');
    })
  });
});