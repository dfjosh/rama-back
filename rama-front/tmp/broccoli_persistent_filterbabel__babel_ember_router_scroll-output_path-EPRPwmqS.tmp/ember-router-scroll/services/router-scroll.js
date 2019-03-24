define("ember-router-scroll/services/router-scroll", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Service.extend({
    isFastBoot: Ember.computed(function () {
      const fastboot = Ember.getOwner(this).lookup('service:fastboot');
      return fastboot ? fastboot.get('isFastBoot') : false;
    }),
    key: null,
    scrollElement: 'window',
    targetElement: null,
    delayScrollTop: false,
    isFirstLoad: true,

    init(...args) {
      this._super(...args);

      this._loadConfig();

      Ember.set(this, 'scrollMap', {
        default: {
          x: 0,
          y: 0
        }
      });
    },

    unsetFirstLoad() {
      Ember.set(this, 'isFirstLoad', false);
    },

    update() {
      if (Ember.get(this, 'isFastBoot') || Ember.get(this, 'isFirstLoad')) {
        return;
      }

      const scrollElement = Ember.get(this, 'scrollElement');
      const targetElement = Ember.get(this, 'targetElement');
      const scrollMap = Ember.get(this, 'scrollMap');
      const key = Ember.get(this, 'key');
      let x;
      let y;

      if (targetElement) {
        let element = document.querySelector(targetElement);

        if (element) {
          x = element.offsetLeft;
          y = element.offsetTop; // if we are looking to where to transition to next, we need to set the default to the position
          // of the targetElement on screen

          Ember.set(scrollMap, 'default', {
            x,
            y
          });
        }
      } else if ('window' === scrollElement) {
        x = window.scrollX;
        y = window.scrollY;
      } else if ('#' === scrollElement.charAt(0)) {
        let element = document.getElementById(scrollElement.substring(1));

        if (element) {
          x = element.scrollLeft;
          y = element.scrollTop;
        }
      } // only a `key` present after first load


      if (key && 'number' === Ember.typeOf(x) && 'number' === Ember.typeOf(y)) {
        Ember.set(scrollMap, key, {
          x,
          y
        });
      }
    },

    position: Ember.computed(function position() {
      const scrollMap = Ember.get(this, 'scrollMap');
      const stateUuid = Ember.get(window, 'history.state.uuid');
      Ember.set(this, 'key', stateUuid); // eslint-disable-line ember/no-side-effects

      const key = Ember.getWithDefault(this, 'key', '-1');
      return Ember.getWithDefault(scrollMap, key, scrollMap.default);
    }).volatile(),

    _loadConfig() {
      const config = Ember.getOwner(this).resolveRegistration('config:environment');

      if (config && config.routerScroll) {
        const scrollElement = config.routerScroll.scrollElement;
        const targetElement = config.routerScroll.targetElement;
        (true && !(!(scrollElement && targetElement)) && Ember.assert('You defined both scrollElement and targetElement in your config. We currently only support definining one of them', !(scrollElement && targetElement)));

        if ('string' === Ember.typeOf(scrollElement)) {
          Ember.set(this, 'scrollElement', scrollElement);
        }

        if ('string' === Ember.typeOf(targetElement)) {
          Ember.set(this, 'targetElement', targetElement);
        }

        const delayScrollTop = config.routerScroll.delayScrollTop;

        if (delayScrollTop === true) {
          Ember.set(this, 'delayScrollTop', true);
        }
      }
    }

  });

  _exports.default = _default;
});