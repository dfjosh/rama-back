define('rama-front/models/post', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data/relationships'], function (exports, _model, _attr, _relationships) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _model.default.extend({
    comments: (0, _relationships.hasMany)('comment', { async: true }),
    categories: (0, _relationships.hasMany)('category', { async: true }),
    postCategories: (0, _relationships.hasMany)('post-category', { async: true }),
    tags: (0, _relationships.hasMany)('tag', { async: true }),
    postTags: (0, _relationships.hasMany)('post-tag', { async: true }),

    title: (0, _attr.default)(),
    author: (0, _attr.default)(),
    body: (0, _attr.default)(),
    featureImage: (0, _attr.default)(),
    featureLink: (0, _attr.default)(),
    createdAt: (0, _attr.default)('date'),
    updatedAt: (0, _attr.default)('date'),

    htmlBody: Ember.computed('body', function () {
      return Ember.String.htmlSafe(this.body);
    })
  });
});