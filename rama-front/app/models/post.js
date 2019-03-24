import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';
import ENV from '../config/environment';

export default Model.extend({
  comments: hasMany('comment', {async: true}),
  categories: hasMany('category', {async: true}),
  postCategories: hasMany('post-category', {async: true}),
  tags: hasMany('tag', {async: true}),
  postTags: hasMany('post-tag', {async: true}),

  title: attr(),
  author: attr(),
  body: attr(),
  featureImage: attr(),
  featureLink: attr(),
  createdAt: attr('date'),
  updatedAt: attr('date'),

  htmlBody: computed('body', function() {
    let placeholder = /&cdnURL&/g;
    let body = this.body.replace(placeholder, ENV.cdnURL);
    return htmlSafe(body);
  })
});
