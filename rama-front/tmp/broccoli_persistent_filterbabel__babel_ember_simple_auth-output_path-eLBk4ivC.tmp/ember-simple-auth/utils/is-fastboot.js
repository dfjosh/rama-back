define('ember-simple-auth/utils/is-fastboot', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isFastBootCPM;
  exports.isFastBoot = isFastBoot;


  /**
   * @return {ComputedProperty<boolean>}
   */
  /* eslint-disable no-unused-vars */
  // @ts-check
  function isFastBootCPM() {
    return Ember.computed(function () {
      return isFastBoot(Ember.getOwner(this));
    });
  }

  /**
   *
   * @param {ApplicationInstance} owner
   * @return {boolean}
   */
  function isFastBoot(owner) {
    (true && !(owner && typeof owner.lookup === 'function') && Ember.assert('You may only use isFastBoot() on a container-aware object', owner && typeof owner.lookup === 'function'));

    const fastboot = owner.lookup('service:fastboot');
    return fastboot ? fastboot.get('isFastBoot') : false;
  }
});