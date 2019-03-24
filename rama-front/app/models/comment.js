import DS from 'ember-data';

export default DS.Model.extend({
  post: DS.belongsTo('post', { async: true }),

  author: DS.attr(),
  email: DS.attr(),
  content: DS.attr(),
  approved: DS.attr('number'),
  parent: DS.attr('number'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});
