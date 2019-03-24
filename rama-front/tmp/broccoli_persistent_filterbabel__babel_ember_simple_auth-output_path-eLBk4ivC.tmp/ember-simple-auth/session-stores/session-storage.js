define('ember-simple-auth/session-stores/session-storage', ['exports', 'ember-simple-auth/session-stores/base', 'ember-simple-auth/utils/objects-are-equal', 'ember-simple-auth/utils/is-fastboot'], function (exports, _base, _objectsAreEqual, _isFastboot) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _base.default.extend({
    _isFastBoot: (0, _isFastboot.default)(),

    /**
      The `sessionStorage` key the store persists data in.
       @property key
      @type String
      @default 'ember_simple_auth-session'
      @public
    */
    key: 'ember_simple_auth-session',

    init() {
      this._super(...arguments);

      if (!this.get('_isFastBoot')) {
        window.addEventListener('storage', Ember.run.bind(this, this._handleStorageEvent));
      }
    },

    willDestroy() {
      if (!this.get('_isFastBoot')) {
        window.removeEventListener('storage', Ember.run.bind(this, this._handleStorageEvent));
      }
    },

    /**
      Persists the `data` in the `sessionStorage`.
       @method persist
      @param {Object} data The data to persist
      @return {Ember.RSVP.Promise} A promise that resolves when the data has successfully been persisted and rejects otherwise.
      @public
    */
    persist(data) {
      this._lastData = data;
      data = JSON.stringify(data || {});
      sessionStorage.setItem(this.key, data);

      return Ember.RSVP.resolve();
    },

    /**
      Returns all data currently stored in the `sessionStorage` as a plain object.
       @method restore
      @return {Ember.RSVP.Promise} A promise that resolves with the data currently persisted in the store when the data has been restored successfully and rejects otherwise.
      @public
    */
    restore() {
      let data = sessionStorage.getItem(this.key);

      return Ember.RSVP.resolve(JSON.parse(data) || {});
    },

    /**
      Clears the store by deleting the
      {{#crossLink "sessionStorageStore/key:property"}}{{/crossLink}} from
      `sessionStorage`.
       @method clear
      @return {Ember.RSVP.Promise} A promise that resolves when the store has been cleared successfully and rejects otherwise.
      @public
    */
    clear() {
      sessionStorage.removeItem(this.key);
      this._lastData = {};

      return Ember.RSVP.resolve();
    },

    _handleStorageEvent(e) {
      if (e.key === this.get('key')) {
        this.restore().then(data => {
          if (!(0, _objectsAreEqual.default)(data, this._lastData)) {
            this._lastData = data;
            this.trigger('sessionDataUpdated', data);
          }
        });
      }
    }
  });
});