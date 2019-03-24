define('rama-front/models/post-tag', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    post: _emberData.default.belongsTo('post', { async: true }),
    tag: _emberData.default.belongsTo('tag', { async: true })
  });
});