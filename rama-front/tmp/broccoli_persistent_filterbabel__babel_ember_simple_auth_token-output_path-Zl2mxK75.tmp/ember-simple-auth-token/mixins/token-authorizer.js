define('ember-simple-auth-token/mixins/token-authorizer', ['exports', 'ember-simple-auth/mixins/data-adapter-mixin', 'ember-get-config'], function (exports, _dataAdapterMixin, _emberGetConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Mixin.create(_dataAdapterMixin.default, {
    session: Ember.inject.service('session'),

    /**
      @method init
      @private
    */
    init() {
      this._super(...arguments);
      const conf = _emberGetConfig.default['ember-simple-auth-token'] || {};
      this.tokenPropertyName = conf.tokenPropertyName || 'token';
      this.authorizationHeaderName = conf.authorizationHeaderName || 'Authorization';
      this.authorizationPrefix = conf.authorizationPrefix === '' ? '' : conf.authorizationPrefix || 'Bearer ';
    },

    /**
      Authorizes an XHR request by sending the `token`
      properties from the session in the `Authorization` header:
       ```
      Authorization: Bearer <token>
      ```
       @method authorize
      @param {XMLHttpRequest} xhr
    */
    authorize(xhr) {
      const data = Ember.get(this, 'session.data.authenticated');
      const token = Ember.get(data, this.get('tokenPropertyName'));
      const prefix = this.get('authorizationPrefix');
      const header = this.get('authorizationHeaderName');

      if (this.get('session.isAuthenticated') && !Ember.isEmpty(token)) {
        xhr.setRequestHeader(header, prefix + token);
      }
    }
  });
});