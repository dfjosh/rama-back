import Component from '@ember/component';
import ENV from '../config/environment';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({  
  classNames: ['header-comp'],
  classNameBindings: ['adminToolbarMargin'],
  tagName: 'header',
  ENV: ENV,
  
  session: service(),
  
  adminToolbarMargin: computed('session', function() {
    return this.session.isAuthenticated;
  })
});
