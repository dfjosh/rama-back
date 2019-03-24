define('rama-front/models/post', ['exports', 'ember-data', 'ember'], function (exports, _emberData, _ember) {
  exports['default'] = _emberData['default'].Model.extend({
    comments: _emberData['default'].hasMany('comment', { async: true }),
    categories: _emberData['default'].hasMany('category', { async: true }),
    tags: _emberData['default'].hasMany('tag', { async: true }),

    title: _emberData['default'].attr(),
    author: _emberData['default'].attr(),
    body: _emberData['default'].attr(),
    createdAt: _emberData['default'].attr('date'),
    updatedAt: _emberData['default'].attr('date'),

    htmlBody: _ember['default'].computed('body', function () {
      var body = this.get('body');
      return _ember['default'].String.htmlSafe(body);
    })
  });
});