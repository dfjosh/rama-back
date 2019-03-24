import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import RSVP from 'rsvp';
import $ from 'jquery';

export default Component.extend({
  classNames: ['post-modal-comp'],
  store: service(),
  router: service(),
  
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
  
  categories: computed(function() {
    return this.store.findAll('category');
  }),
  
  tags: computed(function() {
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
        return RSVP.all([
          post.postCategories.map(postCategory => postCategory.save()),
          post.postTags.map(postTag => postTag.save())
        ]);
      }).then(() => {
        $(`#${this.modalId}`).modal('hide');
        this.model.reload();
        this.router.transitionTo('posts', {queryParams: {page: 1}}); // queryParams so that the model reloads
      });
    },
    deletePost() {
      this.model.destroyRecord();
    }
  }
});
