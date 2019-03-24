define('rama-front/controllers/login', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    session: Ember.inject.service(),

    actions: {
      // login() {
      //   let session = this.store.createRecord('session', {
      //     email: this.email,
      //     password: this.password
      //   });
      //   session.save().then(resp => {
      //     console.log(resp);
      //     this.transitionToRoute('posts');
      //   });
      // },
      authenticate() {
        const credentials = this.getProperties('email', 'password');
        // this.get('session').authenticate('authenticator:jwt', this.email, this.password)
        this.get('session').authenticate('authenticator:jwt', { auth: credentials }); // Knock requires the "auth" key

        // try chaining this to authenticate
        // .catch((reason)=>{
        //   this.set('errorMessage', reason.error || reason);
        // });
      }
    }
  });
});