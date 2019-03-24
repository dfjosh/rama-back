define('rama-front/models/comment', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    post: _emberData['default'].belongsTo('post', { async: true }),

    author: _emberData['default'].attr(),
    email: _emberData['default'].attr(),
    content: _emberData['default'].attr(),
    approved: _emberData['default'].attr('number'),
    parent: _emberData['default'].attr('number'),
    createdAt: _emberData['default'].attr('date'),
    updatedAt: _emberData['default'].attr('date')
  });
});