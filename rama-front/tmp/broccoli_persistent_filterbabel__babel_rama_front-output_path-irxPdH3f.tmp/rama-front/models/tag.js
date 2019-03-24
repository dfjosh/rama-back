define('rama-front/models/tag', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    post: _emberData.default.belongsTo('post', { async: true }),
    postTags: _emberData.default.hasMany('post-tag', { async: true }),

    name: _emberData.default.attr(),
    createdAt: _emberData.default.attr('date'),
    updatedAt: _emberData.default.attr('date')
  });
});