import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  session: service(),
  
  newPost: computed(function() {
    return this.store.createRecord('post');
  }),
  
  // actions: {
  //   invalidateSession() {
  //     this.get('session').invalidate();
  //   }
  // }
});
