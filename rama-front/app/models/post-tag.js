import DS from 'ember-data';

export default DS.Model.extend({
  post: DS.belongsTo('post', {async: true}),
  tag: DS.belongsTo('tag', {async: true})
});
