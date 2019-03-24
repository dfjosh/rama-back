define("ember-router-scroll/locations/router-scroll", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : r & 3 | 8;
    return v.toString(16);
  });

  var _default = Ember.HistoryLocation.extend({
    pushState(path) {
      const state = {
        path,
        uuid: uuid()
      };
      Ember.get(this, 'history').pushState(state, null, path);
      Ember.set(this, '_previousURL', this.getURL());
    },

    replaceState(path) {
      const state = {
        path,
        uuid: uuid()
      };
      Ember.get(this, 'history').replaceState(state, null, path);
      Ember.set(this, '_previousURL', this.getURL());
    }

  });

  _exports.default = _default;
});