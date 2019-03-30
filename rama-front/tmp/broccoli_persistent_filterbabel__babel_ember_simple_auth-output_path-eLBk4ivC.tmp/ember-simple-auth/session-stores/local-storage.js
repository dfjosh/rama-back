define('ember-simple-auth/session-stores/local-storage', ['exports', 'ember-simple-auth/session-stores/base', 'ember-simple-auth/utils/objects-are-equal', 'ember-simple-auth/utils/is-fastboot'], function (exports, _base, _objectsAreEqual, _isFastboot) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _base.default.extend({
    _isFastBoot: (0, _isFastboot.default)(),

    /**
      The `localStorage` key the store persists data in.
       @property key
      @type String
      @default 'ember_simple_auth-session'
      @public
    */
    key: 'ember_simple_auth-session',

    init() {
      this._super(...arguments);

      this._boundHandler = Ember.run.bind(this, this._handleStorageEvent);
      if (!this.get('_isFastBoot')) {
        window.addEventListener('storage', this._boundHandler);
      }
    },

    willDestroy() {
      if (!this.get('_isFastBoot')) {
        window.removeEventListener('storage', this._boundHandler);
      }
    },

    /**
      Persists the `data` in the `localStorage`.
       @method persist
      @param {Object} data The data to persist
      @return {Ember.RSVP.Promise} A promise that resolves when the data has successfully been persisted and rejects otherwise.
      @public
    */
    persist(data) {
      this._lastData = data;
      data = JSON.stringify(data || {});
      localStorage.setItem(this.key, data);

      return Ember.RSVP.resolve();
    },

    /**
      Returns all data currently stored in the `localStorage` as a plain object.
       @method restore
      @return {Ember.RSVP.Promise} A promise that resolves with the data currently persisted in the store when the data has been restored successfully and rejects otherwise.
      @public
    */
    restore() {
      let data = localStorage.getItem(this.key);

      return Ember.RSVP.resolve(JSON.parse(data) || {});
    },

    /**
      Clears the store by deleting the
      {{#crossLink "LocalStorageStore/key:property"}}{{/crossLink}} from
      `localStorage`.
       @method clear
      @return {Ember.RSVP.Promise} A promise that resolves when the store has been cleared successfully and rejects otherwise.
      @public
    */
    clear() {
      localStorage.removeItem(this.key);
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