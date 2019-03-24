define('rama-front/adapters/application', ['exports', 'ember-data', 'rama-front/config/environment', 'ember-inflector', 'ember-simple-auth-token/mixins/token-authorizer'], function (exports, _emberData, _environment, _emberInflector, _tokenAuthorizer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.JSONAPIAdapter.extend(_tokenAuthorizer.default, {
    host: _environment.default.apiURL,
    init() {
      this._super(...arguments);
      this.set('headers', {
        'Content-Type': 'application/vnd.api+json'
      });
    },
    pathForType(type) {
      return (0, _emberInflector.pluralize)(Ember.String.underscore(type));
    }
  });
});