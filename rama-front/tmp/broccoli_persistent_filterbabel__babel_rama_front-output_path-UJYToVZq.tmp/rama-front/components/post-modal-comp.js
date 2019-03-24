define('rama-front/components/post-modal-comp', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ['post-modal-comp'],
    store: Ember.inject.service(),
    router: Ember.inject.service(),

    init() {
      this._super(...arguments);
      if (!this.model.isNew) {
        console.log(this.model.title);
        return this.model.get('postTags').then(postTags => {
          console.log(postTags.length);
          return postTags;
        });
      }
    },

    categories: Ember.computed(function () {
      return this.store.findAll('category');
    }),

    tags: Ember.computed(function () {
      return this.store.findAll('tag');
    }),

    actions: {
      addCategory(category) {
        let postCategory = this.store.createRecord('post-category', {
          category: category,
          post: this.model
        });
        this.model.postCategories.pushObject(postCategory);
      },
      addTag(tag) {
        let postTag = this.store.createRecord('post-tag', {
          tag: tag,
          post: this.model
        });
        this.model.postTags.pushObject(postTag);
      },
      publishPost() {
        this.model.save().then(post => {
          return Ember.RSVP.all([post.postCategories.map(postCategory => postCategory.save()), post.postTags.map(postTag => postTag.save())]);
        }).then(() => {
          Ember.$(`#${this.modalId}`).modal('hide');
          this.model.reload();
          this.router.transitionTo('posts', { queryParams: { page: 1 } }); // queryParams so that the model reloads
        });
      },
      deletePost() {
        this.model.destroyRecord();
      }
    }
  });
});