define('rama-front/models/session', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _model, _attr) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _model.default.extend({
    email: (0, _attr.default)(),
    password: (0, _attr.default)()
  });
});