define('ember-simple-auth-token/authenticators/token', ['exports', 'fetch', 'ember-simple-auth/authenticators/base', 'ember-get-config'], function (exports, _fetch, _base, _emberGetConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _base.default.extend({
    /**
      @method init
      @private
    */
    init() {
      this._super(...arguments);
      const conf = _emberGetConfig.default['ember-simple-auth-token'] || {};
      this.serverTokenEndpoint = conf.serverTokenEndpoint || '/api/token-auth/';
      this.tokenPropertyName = conf.tokenPropertyName || 'token';
      this.headers = conf.headers || {};
    },

    /**
      Restores the session from a set of session properties; __will return a
      resolving promise when there's a non-empty `token` in the
      `properties`__ and a rejecting promise otherwise.
       @method restore
      @param {Object} properties The properties to restore the session from
      @return {Promise} A promise that when it resolves results in the session being authenticated
    */
    restore(properties) {
      const propertiesObject = Ember.Object.create(properties);

      return new Ember.RSVP.Promise((resolve, reject) => {
        if (!Ember.isEmpty(propertiesObject.get(this.tokenPropertyName))) {
          return resolve(properties);
        } else {
          return reject();
        }
      });
    },

    /**
      Authenticates the session with the specified `credentials`; the credentials
      are `POST`ed to the
      [`Authenticators.Token#serverTokenEndpoint`](#SimpleAuth-Authenticators-Token-serverTokenEndpoint)
      and if they are valid the server returns an auth token in
      response. __If the credentials are valid and authentication succeeds, a
      promise that resolves with the server's response is returned__, otherwise a
      promise that rejects with the server error is returned.
       @method authenticate
      @param {Object} credentials The credentials to authenticate the session with
      @param {Object} headers Optional headers to send with the authentication request
      @return {Promise} A promise that resolves when an auth token is successfully acquired from the server and rejects otherwise
    */
    authenticate(credentials, headers) {
      return this.makeRequest(this.serverTokenEndpoint, credentials, Ember.assign({}, this.headers, headers)).then(response => response.json);
    },

    /**
      Does nothing
       @method invalidate
      @return {Promise} A resolving promise
    */
    invalidate() {
      return Ember.RSVP.resolve();
    },

    /**
      @method makeRequest
      @param {Object} url Server endpoint
      @param {Object} data Object that will be sent to server
      @param {Object} headers Additional headers that will be sent to server
      @private
    */
    makeRequest(url, data, headers) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        return (0, _fetch.default)(url, {
          method: 'POST',
          headers: Ember.assign({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }, headers),
          body: JSON.stringify(data)
        }).then(response => {
          const res = {
            statusText: response.statusText,
            status: response.status,
            headers: response.headers
          };

          response.text().then(text => {
            res.text = text;
            try {
              res.json = JSON.parse(text);
            } catch (e) {
              return reject(res);
            }

            if (response.ok) {
              resolve(res);
            } else {
              reject(res);
            }
          }).catch(() => reject(res));
        }).catch(reject);
      });
    }
  });
});