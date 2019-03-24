import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  classNames: ['modal-comp'],
  modalId: null,
  // in: false, // using isRoute instead
  isRoute: false,
  size: null,
  
  didInsertElement() {
    if (this.isRoute === true) {
      $(`#${this.modalId}`).modal('show');
      $(`#${this.modalId}`).on('hide.bs.modal', function() {
        history.back();
      });
    }
  },
});
