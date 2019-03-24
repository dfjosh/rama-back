import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    page: {
      refreshModel: true
    },
    limit: {
      refreshModel: true
    }
  },
  
  model(params) {
    return this.store.query('post', {
      filter: {
        name: "categories.name",
        op: "!=",
        val: "Projects"
      },
      limit: params.limit,
      page: params.page,
      includes: [
        "tags",
        "categories"
      ]
    });
  }
});
