define('rama-front/models/post-category', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    post: _emberData.default.belongsTo('post', { async: true }),
    category: _emberData.default.belongsTo('category', { async: true })
  });
});