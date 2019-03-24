define('rama-front/adapters/application', ['exports', 'ember-data', 'rama-front/config/environment', 'ember-inflector'], function (exports, _emberData, _environment, _emberInflector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.JSONAPIAdapter.extend({
    host: _environment.default.apiURL,
    init() {
      this._super(...arguments);
      this.set('headers', {
        'Content-Type': 'application/json'
      });
    },
    pathForType(type) {
      return (0, _emberInflector.pluralize)(Ember.String.underscore(type));
    }
  });
});