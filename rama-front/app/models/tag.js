import DS from 'ember-data';

export default DS.Model.extend({
  post: DS.belongsTo('post', {async: true}),
  postTags: DS.hasMany('post-tag', {async: true}),

  name: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});
