import DS from 'ember-data';

export default DS.Model.extend({
  post: DS.belongsTo('post', {async: true}),
  category: DS.belongsTo('category', {async: true})
});
