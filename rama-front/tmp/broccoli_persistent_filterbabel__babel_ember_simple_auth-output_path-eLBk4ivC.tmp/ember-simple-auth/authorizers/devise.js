define('ember-simple-auth/authorizers/devise', ['exports', 'ember-simple-auth/authorizers/base'], function (exports, _base) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _base.default.extend({
    /**
      The token attribute name.
       @property tokenAttributeName
      @type String
      @default 'token'
      @public
    */
    tokenAttributeName: 'token',

    /**
      The identification attribute name.
       @property identificationAttributeName
      @type String
      @default 'email'
      @public
    */
    identificationAttributeName: 'email',

    /**
      Includes the user's token (see
      {{#crossLink "DeviseAuthenticator/tokenAttributeName:property"}}{{/crossLink}})
      and identification (see
      {{#crossLink "DeviseAuthenticator/identificationAttributeName:property"}}{{/crossLink}})
      in the `Authorization` header.
       @method authorize
      @param {Object} data The data that the session currently holds
      @param {Function} block(headerName,headerContent) The callback to call with the authorization data; will receive the header name and header content as arguments.
      @public
    */
    authorize(data, block) {
      const { tokenAttributeName, identificationAttributeName } = this.getProperties('tokenAttributeName', 'identificationAttributeName');
      const userToken = data[tokenAttributeName];
      const userIdentification = data[identificationAttributeName];

      if (!Ember.isEmpty(userToken) && !Ember.isEmpty(userIdentification)) {
        const authData = `${tokenAttributeName}="${userToken}", ${identificationAttributeName}="${userIdentification}"`;
        block('Authorization', `Token ${authData}`);
      }
    }
  });
});