define('rama-front/components/modal-comp', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ['modal-comp'],
    modalId: null,
    // in: false, // using isRoute instead
    isRoute: false,
    size: null,

    didInsertElement() {
      if (this.isRoute === true) {
        Ember.$(`#${this.modalId}`).modal('show');
        Ember.$(`#${this.modalId}`).on('hide.bs.modal', function () {
          history.back();
        });
      }
    }
  });
});