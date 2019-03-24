define('rama-front/routes/posts/new', ['exports', 'ember', 'rsvp'], function (exports, _ember, _rsvp) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return _rsvp['default'].hash({
        categories: this.store.findAll('category'),
        tags: this.store.findAll('tag')
      });
    }
  });
});