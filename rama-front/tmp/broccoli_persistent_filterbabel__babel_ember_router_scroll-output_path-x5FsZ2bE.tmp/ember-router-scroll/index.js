define("ember-router-scroll/index", ["exports", "ember-app-scheduler"], function (_exports, _emberAppScheduler) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Mixin.create({
    service: Ember.inject.service('router-scroll'),
    isFastBoot: Ember.computed(function () {
      const fastboot = Ember.getOwner(this).lookup('service:fastboot');
      return fastboot ? fastboot.get('isFastBoot') : false;
    }),

    init() {
      this._super(...arguments);

      (0, _emberAppScheduler.setupRouter)(this);
    },

    destroy() {
      (0, _emberAppScheduler.reset)();

      this._super(...arguments);
    },

    willTransition(...args) {
      this._super(...args);

      if (Ember.get(this, 'isFastBoot')) {
        return;
      }

      Ember.get(this, 'service').update();
    },

    didTransition(transitions, ...args) {
      this._super(transitions, ...args);

      if (Ember.get(this, 'isFastBoot')) {
        return;
      }

      const delayScrollTop = Ember.get(this, 'service.delayScrollTop');

      if (!delayScrollTop) {
        Ember.run.scheduleOnce('render', this, () => this.updateScrollPosition(transitions));
      } else {
        // as described in ember-app-scheduler, this addon can be used to delay rendering until after First Meaningful Paint.
        // If you loading your routes progressively, this may be a good option to delay scrollTop until the remaining DOM elements are painted.
        (0, _emberAppScheduler.whenRouteIdle)().then(() => {
          this.updateScrollPosition(transitions);
        });
      }
    },

    updateScrollPosition(transitions) {
      const url = Ember.get(this, 'currentURL');
      const hashElement = url ? document.getElementById(url.split('#').pop()) : null;

      if (Ember.get(this, 'service.isFirstLoad')) {
        Ember.get(this, 'service').unsetFirstLoad();
        return;
      }

      let scrollPosition;

      if (url && url.indexOf('#') > -1 && hashElement) {
        scrollPosition = {
          x: hashElement.offsetLeft,
          y: hashElement.offsetTop
        };
      } else {
        scrollPosition = Ember.get(this, 'service.position');
      }

      const preserveScrollPosition = transitions.some(transition => Ember.get(transition, 'handler.controller.preserveScrollPosition'));

      if (!preserveScrollPosition) {
        const scrollElement = Ember.get(this, 'service.scrollElement');
        const targetElement = Ember.get(this, 'service.targetElement');

        if (targetElement) {
          window.scrollTo(scrollPosition.x, scrollPosition.y);
        } else if ('window' === scrollElement) {
          window.scrollTo(scrollPosition.x, scrollPosition.y);
        } else if ('#' === scrollElement.charAt(0)) {
          const element = document.getElementById(scrollElement.substring(1));

          if (element) {
            element.scrollLeft = scrollPosition.x;
            element.scrollTop = scrollPosition.y;
          }
        }
      }
    }

  });

  _exports.default = _default;
});