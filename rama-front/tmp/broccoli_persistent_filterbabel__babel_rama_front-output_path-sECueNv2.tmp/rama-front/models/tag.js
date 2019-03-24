define('rama-front/models/tag', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    post: _emberData['default'].belongsTo('post', { async: true }),

    name: _emberData['default'].attr()
  });
});