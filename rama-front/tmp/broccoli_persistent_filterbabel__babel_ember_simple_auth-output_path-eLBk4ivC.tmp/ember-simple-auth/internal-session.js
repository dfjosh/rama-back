define('ember-simple-auth/internal-session', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const assign = Ember.assign || Ember.merge;

  exports.default = Ember.ObjectProxy.extend(Ember.Evented, {
    authenticator: null,
    store: null,
    isAuthenticated: false,
    attemptedTransition: null,

    init() {
      this._super(...arguments);
      this.set('content', { authenticated: {} });
      this._busy = false;
      this._bindToStoreEvents();
    },

    authenticate(authenticatorFactory, ...args) {
      this._busy = true;
      (true && !(!Ember.isEmpty(authenticatorFactory)) && Ember.assert(`Session#authenticate requires the authenticator to be specified, was "${authenticatorFactory}"!`, !Ember.isEmpty(authenticatorFactory)));

      const authenticator = this._lookupAuthenticator(authenticatorFactory);
      (true && !(!Ember.isNone(authenticator)) && Ember.assert(`No authenticator for factory "${authenticatorFactory}" could be found!`, !Ember.isNone(authenticator)));


      return authenticator.authenticate(...args).then(content => {
        this._busy = false;
        return this._setup(authenticatorFactory, content, true);
      }, error => {
        const rejectWithError = () => Ember.RSVP.Promise.reject(error);

        this._busy = false;
        return this._clear().then(rejectWithError, rejectWithError);
      });
    },

    invalidate() {
      this._busy = true;

      if (!this.get('isAuthenticated')) {
        this._busy = false;
        return Ember.RSVP.Promise.resolve();
      }

      let authenticator = this._lookupAuthenticator(this.authenticator);
      return authenticator.invalidate(this.content.authenticated, ...arguments).then(() => {
        authenticator.off('sessionDataUpdated', this, this._onSessionDataUpdated);
        this._busy = false;
        return this._clear(true);
      }, error => {
        this.trigger('sessionInvalidationFailed', error);
        this._busy = false;
        return Ember.RSVP.Promise.reject(error);
      });
    },

    restore() {
      this._busy = true;
      const reject = () => Ember.RSVP.Promise.reject();

      return this._callStoreAsync('restore').then(restoredContent => {
        let { authenticator: authenticatorFactory } = restoredContent.authenticated || {};
        if (authenticatorFactory) {
          delete restoredContent.authenticated.authenticator;
          const authenticator = this._lookupAuthenticator(authenticatorFactory);
          return authenticator.restore(restoredContent.authenticated).then(content => {
            this.set('content', restoredContent);
            this._busy = false;
            return this._setup(authenticatorFactory, content);
          }, err => {
            Ember.debug(`The authenticator "${authenticatorFactory}" rejected to restore the session - invalidating…`);
            if (err) {
              Ember.debug(err);
            }
            this._busy = false;
            return this._clearWithContent(restoredContent).then(reject, reject);
          });
        } else {
          delete (restoredContent || {}).authenticated;
          this._busy = false;
          return this._clearWithContent(restoredContent).then(reject, reject);
        }
      }, () => {
        this._busy = false;
        return this._clear().then(reject, reject);
      });
    },

    _callStoreAsync(method, ...params) {
      const result = this.store[method](...params);

      if (typeof result === 'undefined' || typeof result.then === 'undefined') {
        Ember.deprecate(`Ember Simple Auth: Synchronous stores have been deprecated. Make sure your custom store's ${method} method returns a promise.`, false, {
          id: `ember-simple-auth.session-store.synchronous-${method}`,
          until: '2.0.0'
        });
        return Ember.RSVP.Promise.resolve(result);
      } else {
        return result;
      }
    },

    _setup(authenticator, authenticatedContent, trigger) {
      trigger = Boolean(trigger) && !this.get('isAuthenticated');
      this.setProperties({
        isAuthenticated: true,
        authenticator,
        'content.authenticated': authenticatedContent
      });
      this._bindToAuthenticatorEvents();

      return this._updateStore().then(() => {
        if (trigger) {
          this.trigger('authenticationSucceeded');
        }
      }, () => {
        this.setProperties({
          isAuthenticated: false,
          authenticator: null,
          'content.authenticated': {}
        });
      });
    },

    _clear(trigger) {
      trigger = Boolean(trigger) && this.get('isAuthenticated');
      this.setProperties({
        isAuthenticated: false,
        authenticator: null,
        'content.authenticated': {}
      });

      return this._updateStore().then(() => {
        if (trigger) {
          this.trigger('invalidationSucceeded');
        }
      });
    },

    _clearWithContent(content, trigger) {
      this.set('content', content);
      return this._clear(trigger);
    },

    setUnknownProperty(key, value) {
      (true && !(key !== 'authenticated') && Ember.assert('"authenticated" is a reserved key used by Ember Simple Auth!', key !== 'authenticated'));

      let result = this._super(key, value);
      if (!/^_/.test(key)) {
        this._updateStore();
      }
      return result;
    },

    _updateStore() {
      let data = this.content;
      if (!Ember.isEmpty(this.authenticator)) {
        Ember.set(data, 'authenticated', assign({ authenticator: this.authenticator }, data.authenticated || {}));
      }
      return this._callStoreAsync('persist', data);
    },

    _bindToAuthenticatorEvents() {
      const authenticator = this._lookupAuthenticator(this.authenticator);
      authenticator.off('sessionDataUpdated', this, this._onSessionDataUpdated);
      authenticator.off('sessionDataInvalidated', this, this._onSessionDataInvalidated);
      authenticator.on('sessionDataUpdated', this, this._onSessionDataUpdated);
      authenticator.on('sessionDataInvalidated', this, this._onSessionDataInvalidated);
    },

    _onSessionDataUpdated(content) {
      this._setup(this.authenticator, content);
    },

    _onSessionDataInvalidated() {
      this._clear(true);
    },

    _bindToStoreEvents() {
      this.store.on('sessionDataUpdated', content => {
        if (!this._busy) {
          this._busy = true;
          let { authenticator: authenticatorFactory } = content.authenticated || {};
          if (authenticatorFactory) {
            delete content.authenticated.authenticator;
            const authenticator = this._lookupAuthenticator(authenticatorFactory);
            authenticator.restore(content.authenticated).then(authenticatedContent => {
              this.set('content', content);
              this._busy = false;
              this._setup(authenticatorFactory, authenticatedContent, true);
            }, err => {
              Ember.debug(`The authenticator "${authenticatorFactory}" rejected to restore the session - invalidating…`);
              if (err) {
                Ember.debug(err);
              }
              this._busy = false;
              this._clearWithContent(content, true);
            });
          } else {
            this._busy = false;
            this._clearWithContent(content, true);
          }
        }
      });
    },

    _lookupAuthenticator(authenticator) {
      return Ember.getOwner(this).lookup(authenticator);
    }
  });
});