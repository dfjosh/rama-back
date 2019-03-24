define('rama-front/components/posts/rama-new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ["rama-new"],

    title: null,
    body: null,

    actions: {
      publishPost: function publishPost() {
        var _this = this;

        var post = this.store.createRecord('post', {
          title: this.get('title'),
          body: this.get('body')
        });
        post.save().then(function (post) {
          _this.setProperties({
            title: null,
            body: null
          });
          // this.controller.transitionToRoute('posts');
          // return this.controller.get('post').reload().then(model => {
          //   this.transitionTo('posts');
          // });
        });
      }
    }
  });
});