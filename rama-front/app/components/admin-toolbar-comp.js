import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['admin-toolbar-comp'],
  
  store: service(),
  session: service(),
  
  actions: {
    logout() {
      this.session.invalidate();
    }
  }
});