(function () {
  'use strict';

  class Emitter {
    constructor() {
      this.listeners = {};
    }
    addEventListener(type, callback) {
      if (!(type in this.listeners)) {
        this.listeners[type] = [];
      }
      this.listeners[type].push(callback);
    }
    removeEventListener(type, callback) {
      if (!(type in this.listeners)) {
        return;
      }
      const stack = this.listeners[type];
      for (let i = 0, l = stack.length; i < l; i++) {
        if (stack[i] === callback) {
          stack.splice(i, 1);
          return;
        }
      }
    }
    dispatchEvent(event) {
      if (!(event.type in this.listeners)) {
        return;
      }
      const debounce = callback => {
        setTimeout(() => callback.call(this, event));
      };
      const stack = this.listeners[event.type];
      for (let i = 0, l = stack.length; i < l; i++) {
        debounce(stack[i]);
      }
      return !event.defaultPrevented;
    }
  }

  class AbortSignal extends Emitter {
    constructor() {
      super();

      this.aborted = false;
      this.onabort = null;
    }
    toString() {
      return '[object AbortSignal]';
    }
    dispatchEvent(event) {
      if (event.type === 'abort') {
        this.aborted = true;
        if (typeof this.onabort === 'function') {
          this.onabort.call(this, event);
        }
      }

      super.dispatchEvent(event);
    }
  }

  class AbortController {
    constructor() {
      this.signal = new AbortSignal();
    }
    abort() {
      let event;
      try {
        event = new Event('abort');
      } catch (e) {
        if (typeof document !== 'undefined') {
          // For Internet Explorer 11:
          event = document.createEvent('Event');
          event.initEvent('abort', false, false);
        } else {
          // Fallback where document isn't available:
          event = {
            type: 'abort',
            bubbles: false,
            cancelable: false
          };
        }
      }
      this.signal.dispatchEvent(event);
    }
    toString() {
      return '[object AbortController]';
    }
  }

  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    // These are necessary to make sure that we get correct output for:
    // Object.prototype.toString.call(new AbortController())
    AbortController.prototype[Symbol.toStringTag] = 'AbortController';
    AbortSignal.prototype[Symbol.toStringTag] = 'AbortSignal';
  }

  function nativeAbortControllerIsBroken(self) {
    return self.navigator && (
      (self.navigator.vendor && self.navigator.vendor.startsWith('Apple Computer')) ||
      (self.navigator.userAgent && self.navigator.userAgent.match(/ (crios|gsa|fxios)\//i))
    );
  }

  (function(self) {

    if (self.AbortController && !nativeAbortControllerIsBroken(self)) {
      return;
    }

    self.AbortController = AbortController;
    self.AbortSignal = AbortSignal;

  })(typeof self !== 'undefined' ? self : global);

}());