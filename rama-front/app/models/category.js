import DS from 'ember-data';

export default DS.Model.extend({
  posts: DS.hasMany('post', {async: true}),
  postCategories: DS.hasMany('post-category', {aysnc: true}),

  name: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});
