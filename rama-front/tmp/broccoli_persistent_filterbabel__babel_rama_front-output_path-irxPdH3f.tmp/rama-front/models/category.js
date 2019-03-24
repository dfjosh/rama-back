define('rama-front/models/category', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    posts: _emberData.default.hasMany('post', { async: true }),
    postCategories: _emberData.default.hasMany('post-category', { aysnc: true }),

    name: _emberData.default.attr(),
    createdAt: _emberData.default.attr('date'),
    updatedAt: _emberData.default.attr('date')
  });
});