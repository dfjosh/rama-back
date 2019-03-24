'use strict';



;define('rama-front/adapters/application', ['exports', 'ember-data', 'rama-front/config/environment', 'ember-inflector'], function (exports, _emberData, _environment, _emberInflector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.JSONAPIAdapter.extend({
    host: _environment.default.apiURL,
    init() {
      this._super(...arguments);
      this.set('headers', {
        'Content-Type': 'application/json'
      });
    },
    pathForType(type) {
      return (0, _emberInflector.pluralize)(Ember.String.underscore(type));
    }
  });
});
;define('rama-front/app', ['exports', 'rama-front/resolver', 'ember-load-initializers', 'rama-front/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
;define('rama-front/components/admin-toolbar-comp', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ['admin-toolbar-comp'],

    store: Ember.inject.service(),

    newPost: Ember.computed(function () {
      return this.store.createRecord('post');
    })
  });
});
;define('rama-front/components/haiku-comp', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    didInsertElement: function () {
      this._super(...arguments);
      this.$(window).scroll(function () {
        var a = Ember.$(document).scrollTop();
        var b = Ember.$('.haiku').offset().top / 2; // divided by two just to make it fade more quickly
        var delta = b - a;

        var ratio = delta / b;
        if (ratio < 0) {
          ratio = 0;
        }

        var ratioBuffered = delta / b;
        if (ratioBuffered < 0.1) {
          ratioBuffered = 0.1;
        }

        var ratioDefined = delta / b;
        if (ratioDefined <= 0) {
          ratioDefined = 0.001;
        }

        Ember.$('.haiku pre span').css('opacity', ratioBuffered);
        Ember.$('.haiku pre em').css('opacity', 1 - ratioBuffered);

        var x = Ember.$('.haiku').get(0).scrollWidth;
        var y = Ember.$('.haiku').width();
        var diff = x - y;

        if (x > y) {
          Ember.$('.haiku').scrollLeft(diff * (1 - ratio));
        }
      });
    },

    willDestroy() {
      Ember.$(window).unbind('scroll');
    }
  });
});
;define('rama-front/components/header-comp', ['exports', 'rama-front/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ['header-comp'],
    tagName: 'header',
    ENV: _environment.default
  });
});
;define('rama-front/components/modal-comp', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ['modal-comp'],
    modalId: null,
    // in: false, // using isRoute instead
    isRoute: false,
    size: null,

    didInsertElement() {
      if (this.isRoute === true) {
        Ember.$(`#${this.modalId}`).modal('show');
        Ember.$(`#${this.modalId}`).on('hide.bs.modal', function () {
          history.back();
        });
      }
    }
  });
});
;define('rama-front/components/nav-comp', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ['nav-comp'],
    tagName: 'nav'
  });
});
;define('rama-front/components/pagination-comp', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    limit: null,
    page: null,
    total: null,

    prevPage: Ember.computed('page', function () {
      return this.page - 1;
    }),

    nextPage: Ember.computed('page', function () {
      return this.page + 1;
    }),

    isFirstPage: Ember.computed('page', function () {
      return this.page === 1;
    }),

    isLastPage: Ember.computed('limit', 'page', 'total', function () {
      return this.page * this.limit >= this.total;
    })
  });
});
;define('rama-front/components/post-comp', ['exports', 'rama-front/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ['post-comp'],

    ENV: _environment.default,

    showAsterisk: true,
    showFeatureImage: true,
    showTaxonomy: true,
    showAttribution: true,
    showHorizontalRule: true,
    gutterColumns: 2,

    contentColumns: Ember.computed('gutterColumns', function () {
      return 12 - this.gutterColumns * 2;
    })
  });
});
;define('rama-front/components/post-modal-comp', ['exports'], function (exports) {
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
          debugger;
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
      }
    }
  });
});
;define('rama-front/components/post/attribution-comp', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ['inline']
  });
});
;define('rama-front/components/post/comments-comp', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ['comments-comp']
  });
});
;define('rama-front/components/post/taxonomy-comp', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ['taxonomy-comp']
  });
});
;define('rama-front/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define('rama-front/controllers/admin/posts/edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    preserveScrollPosition: true
  });
});
;define('rama-front/controllers/admin/taxonomies/taxonomy', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({});
});
;define('rama-front/controllers/admin/taxonomies/taxonomy/edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    preserveScrollPosition: true,

    // use a proxy so the model doesn't get updated behind the modal while we're editing
    proxy: Ember.computed('model', function () {
      return Ember.ObjectProxy.create({ name: this.model.name });
    }),

    actions: {
      editTaxonomy() {
        let taxonomy = this.model;
        taxonomy.set('name', this.proxy.name);
        taxonomy.save().then(() => {
          this.transitionToRoute('admin.taxonomies.taxonomy');
        });
      },
      deleteTaxonomy() {
        this.model.destroyRecord().then(() => {
          this.transitionToRoute('admin.taxonomies.taxonomy');
        });
      }
    }
  });
});
;define('rama-front/controllers/admin/taxonomies/taxonomy/new', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    actions: {
      createTaxonomy() {
        this.model.save().then(() => {
          this.transitionToRoute('admin.taxonomies.taxonomy');
        });
      }
    }
  });
});
;define('rama-front/controllers/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({});
});
;define('rama-front/controllers/posts', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    queryParams: ['limit', 'page'],
    limit: 10,
    page: 1,

    total: Ember.computed('model', function () {
      return this.model.meta.total;
    })
  });
});
;define('rama-front/helpers/app-version', ['exports', 'rama-front/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
;define('rama-front/helpers/capitalize', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.capitalize = capitalize;
  function capitalize(params /*, hash*/) {
    let string = params[0];
    return Ember.String.capitalize(string);
  }

  exports.default = Ember.Helper.helper(capitalize);
});
;define('rama-front/helpers/ellipsis', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ellipsis = ellipsis;
  function ellipsis(params /*, hash*/) {
    var str = params[0];
    let targetLength = params[1];

    if (targetLength === undefined || targetLength >= str.length) {
      return str;
    } else {
      return Ember.String.htmlSafe(str.slice(0, targetLength) + "&hellip;");
    }
  }

  exports.default = Ember.Helper.helper(ellipsis);
});
;define('rama-front/helpers/formatted-date', ['exports', 'moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.formattedDate = formattedDate;
  function formattedDate(params /*, hash*/) {
    let date = params[0];
    let format = params[1] || "YYYY-MM-DD HH:mm:ss";

    var result = (0, _moment.default)(date).format(format);
    return result;
  }

  exports.default = Ember.Helper.helper(formattedDate);
});
;define('rama-front/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
;define('rama-front/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
;define('rama-front/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'rama-front/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define('rama-front/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
;define('rama-front/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
;define('rama-front/initializers/export-application-global', ['exports', 'rama-front/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
;define('rama-front/instance-initializers/ember-data', ['exports', 'ember-data/initialize-store-service'], function (exports, _initializeStoreService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
});
;define('rama-front/locations/router-scroll', ['exports', 'ember-router-scroll/locations/router-scroll'], function (exports, _routerScroll) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _routerScroll.default;
    }
  });
});
;define('rama-front/models/category', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    posts: _emberData.default.hasMany('post', { async: true }),
    postCategories: _emberData.default.hasMany('post-category', { aysnc: true }),

    name: _emberData.default.attr(),
    createdAt: _emberData.default.attr('date'),
    updatedAt: _emberData.default.attr('date')
  });
});
;define('rama-front/models/comment', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    post: _emberData.default.belongsTo('post', { async: true }),

    author: _emberData.default.attr(),
    email: _emberData.default.attr(),
    content: _emberData.default.attr(),
    approved: _emberData.default.attr('number'),
    parent: _emberData.default.attr('number'),
    createdAt: _emberData.default.attr('date'),
    updatedAt: _emberData.default.attr('date')
  });
});
;define('rama-front/models/post-category', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    post: _emberData.default.belongsTo('post', { async: true }),
    category: _emberData.default.belongsTo('category', { async: true })
  });
});
;define('rama-front/models/post-tag', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    post: _emberData.default.belongsTo('post', { async: true }),
    tag: _emberData.default.belongsTo('tag', { async: true })
  });
});
;define('rama-front/models/post', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data/relationships'], function (exports, _model, _attr, _relationships) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _model.default.extend({
    comments: (0, _relationships.hasMany)('comment', { async: true }),
    categories: (0, _relationships.hasMany)('category', { async: true }),
    postCategories: (0, _relationships.hasMany)('post-category', { async: true }),
    tags: (0, _relationships.hasMany)('tag', { async: true }),
    postTags: (0, _relationships.hasMany)('post-tag', { async: true }),

    title: (0, _attr.default)(),
    author: (0, _attr.default)(),
    body: (0, _attr.default)(),
    featureImage: (0, _attr.default)(),
    featureLink: (0, _attr.default)(),
    createdAt: (0, _attr.default)('date'),
    updatedAt: (0, _attr.default)('date'),

    htmlBody: Ember.computed('body', function () {
      return Ember.String.htmlSafe(this.body);
    })
  });
});
;define('rama-front/models/tag', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    post: _emberData.default.belongsTo('post', { async: true }),
    postTags: _emberData.default.hasMany('post-tag', { async: true }),

    name: _emberData.default.attr(),
    createdAt: _emberData.default.attr('date'),
    updatedAt: _emberData.default.attr('date')
  });
});
;define('rama-front/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
;define('rama-front/router', ['exports', 'rama-front/config/environment', 'ember-router-scroll'], function (exports, _environment, _emberRouterScroll) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend(_emberRouterScroll.default, {
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    // arg1 is the route name (what you will use to refer to the route in link-to's). arg2 is what you'll see in the address bar
    // only nest routes if you want one template to render inside another (thru the outlet)
    this.route('posts');
    this.route('post', { path: 'posts/:post_id' });
    this.route('projects');
    this.route('about');
    this.route('admin', function () {
      this.route('taxonomies', function () {
        this.route('taxonomy', { path: ':taxonomy' }, function () {
          this.route('new');
          this.route('edit', { path: ':taxonomy_id/edit' });
        });
      });
      this.route('posts', function () {
        this.route('edit', { path: ':post_id/edit' });
      });
    });
  });

  exports.default = Router;
});
;define('rama-front/routes/about', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
;define('rama-front/routes/admin', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
;define('rama-front/routes/admin/posts', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      return this.get('store').query('post', {});
    }
  });
});
;define('rama-front/routes/admin/posts/edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model(params) {
      return this.store.findRecord('post', params.post_id);
    }
  });
});
;define('rama-front/routes/admin/taxonomies/taxonomy', ['exports', 'ember-inflector'], function (exports, _emberInflector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model(params) {
      let taxonomy = (0, _emberInflector.singularize)(params.taxonomy);
      // this.set('taxonomy', taxonomy);
      return this.store.findAll(taxonomy);
    }
  } // 
  // setupController(controller, model) {
  //   this._super(controller, model);
  // 
  //   controller.set('modelName', this.taxonomy);
  // }
  );
});
;define('rama-front/routes/admin/taxonomies/taxonomy/edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    // NOTE the model hook won't run if accessed via the link-to in taxonomy.hbs since I supply a model,
    // but this is necessary if you want it to work by manually typing the url i.e. /admin/taxonomies/tags/3/edit
    model(params) {
      let taxonomy = this.modelFor('admin.taxonomies.taxonomy').modelName;
      return this.store.findRecord(taxonomy, params.taxonomy_id);
    }
  });
});
;define('rama-front/routes/admin/taxonomies/taxonomy/new', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      let taxonomy = this.modelFor('admin.taxonomies.taxonomy').modelName;
      return this.store.createRecord(taxonomy);
    }
  });
});
;define('rama-front/routes/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    // Route Hooks: beforeModel(), model(), afterModel(), setupController()
    // Route Actions: actions: { willTransition(), didTransition() }

    beforeModel: function () {
      this.transitionTo('projects');
    }
  });
});
;define('rama-front/routes/post', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model(params) {
      return this.store.findRecord('post', params.post_id);
    }
  });
});
;define('rama-front/routes/posts', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
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
        includes: ["tags", "categories"]
        // "categories": ["Projects"]
      });
    }

    // model: function(params) {
    //   return this.get('store').query('post', {
    //     page: {
    //       number: params.page
    //     }
    //   });
    // },

    // model: function(params) {
    //   return this.store.query('category', {
    //     filter: {
    //       'name': 'Projects'
    //     }
    //   }).then(categories => {
    //     let categoryIds = categories.map(c => { return c.id; });
    //     return this.store.query('post', {
    //       filter: {
    //         '!categories': categoryIds
    //       },
    //       page: {
    //         number: params.page
    //       }
    //     });
    //   });
    // }

  });
});
;define('rama-front/routes/projects', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    // queryParams: {
    //   page: {
    //     refreshModel: true
    //   }
    // },

    model() {
      return this.store.query('post', {
        filter: {
          name: "categories.name",
          op: "=",
          val: "Projects"
        }
      });
    }

    // model() {     // params
    //   return this.store.query('category', {
    //     filter: {
    //       name: 'Projects'
    //     }
    //   }).then(categories => {
    //     let categoryIds = categories.map(c => { return c.id; });
    //     return this.store.query('post', {
    //       filter: {
    //         categories: categoryIds
    //       }
    //     });
    //   });
    // }
  });
});
;define('rama-front/serializers/application', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.JSONAPISerializer.extend({
    keyForAttribute(attr) {
      return Ember.String.underscore(attr);
    }
  });
});
;define('rama-front/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define('rama-front/services/router-scroll', ['exports', 'ember-router-scroll/services/router-scroll'], function (exports, _routerScroll) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _routerScroll.default;
    }
  });
});
;define("rama-front/templates/about", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "MEcjBVvP", "block": "{\"symbols\":[],\"statements\":[[1,[21,\"header-comp\"],false],[0,\"\\n\\n\"],[1,[21,\"nav-comp\"],false],[0,\"\\n\\n\"],[1,[21,\"haiku-comp\"],false]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/about.hbs" } });
});
;define("rama-front/templates/admin", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "AmVOi9ba", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"container-fluid admin\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"col-sm-2\"],[9],[0,\"\\n      \"],[7,\"ul\"],[11,\"class\",\"nav nav-pills nav-stacked\"],[9],[0,\"\\n        \"],[7,\"li\"],[9],[0,\"\\n          \"],[4,\"link-to\",[\"admin.posts\"],null,{\"statements\":[[0,\"Posts\"]],\"parameters\":[]},null],[0,\"\\n        \"],[10],[0,\"\\n        \"],[7,\"li\"],[9],[0,\"\\n          \"],[4,\"link-to\",[\"admin.taxonomies.taxonomy\",\"categories\"],null,{\"statements\":[[0,\"Categories\"]],\"parameters\":[]},null],[0,\"\\n        \"],[10],[0,\"\\n        \"],[7,\"li\"],[9],[0,\"\\n          \"],[4,\"link-to\",[\"admin.taxonomies.taxonomy\",\"tags\"],null,{\"statements\":[[0,\"Tags\"]],\"parameters\":[]},null],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"col-sm-10\"],[9],[0,\"\\n      \\n      \"],[1,[21,\"outlet\"],false],[0,\"\\n      \\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/admin.hbs" } });
});
;define("rama-front/templates/admin/posts", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "UTgMwYQ+", "block": "{\"symbols\":[\"post\"],\"statements\":[[7,\"table\"],[11,\"class\",\"table table-striped table-hover\"],[9],[0,\"\\n  \"],[7,\"thead\"],[9],[0,\"\\n    \"],[7,\"tr\"],[9],[0,\"\\n      \"],[7,\"th\"],[9],[0,\"id\"],[10],[0,\"\\n      \"],[7,\"th\"],[9],[0,\"title\"],[10],[0,\"\\n      \"],[7,\"th\"],[9],[0,\"author\"],[10],[0,\"\\n      \"],[7,\"th\"],[9],[0,\"createdAt\"],[10],[0,\"\\n      \"],[7,\"th\"],[9],[0,\"project\"],[10],[0,\"\\n      \"],[7,\"th\"],[9],[0,\"edit\"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"tbody\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\"]]],null,{\"statements\":[[0,\"      \"],[7,\"tr\"],[9],[0,\"\\n        \"],[7,\"td\"],[9],[1,[22,1,[\"id\"]],false],[10],[0,\"\\n        \"],[7,\"td\"],[9],[1,[22,1,[\"title\"]],false],[10],[0,\"\\n        \"],[7,\"td\"],[9],[1,[22,1,[\"author\"]],false],[10],[0,\"\\n        \"],[7,\"td\"],[9],[1,[27,\"formatted-date\",[[22,1,[\"createdAt\"]],\"YYYY-MM-DD HH:mm:ss\"],null],false],[10],[0,\"\\n        \"],[7,\"td\"],[9],[7,\"span\"],[12,\"class\",[27,\"if\",[[22,1,[\"featureImage\"]],\"glyphicon glyphicon-ok\"],null]],[9],[10],[10],[0,\"\\n        \"],[7,\"td\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"admin.posts.edit\",[22,1,[]]],null,{\"statements\":[[0,\"            \"],[7,\"span\"],[11,\"class\",\"glyphicon glyphicon-pencil\"],[9],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[1,[21,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/admin/posts.hbs" } });
});
;define("rama-front/templates/admin/posts/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "/W8OADWF", "block": "{\"symbols\":[],\"statements\":[[1,[27,\"post-modal-comp\",null,[[\"model\",\"modalId\",\"isRoute\"],[[23,[\"model\"]],\"editPostModal\",true]]],false]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/admin/posts/edit.hbs" } });
});
;define("rama-front/templates/admin/taxonomies/taxonomy", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gAWmvNoh", "block": "{\"symbols\":[\"taxonomy\"],\"statements\":[[7,\"div\"],[11,\"class\",\"row taxonomies-toolbar\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-sm-12\"],[9],[0,\"\\n    \"],[4,\"link-to\",[\"admin.taxonomies.taxonomy.new\"],[[\"class\"],[\"btn btn-primary pull-right\"]],{\"statements\":[[1,[27,\"concat\",[\"New \",[27,\"capitalize\",[[23,[\"model\",\"modelName\"]]],null]],null],false]],\"parameters\":[]},null],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"],[7,\"table\"],[11,\"class\",\"table table-striped table-hover\"],[9],[0,\"\\n  \"],[7,\"thead\"],[9],[0,\"\\n    \"],[7,\"tr\"],[9],[0,\"\\n      \"],[7,\"th\"],[9],[0,\"id\"],[10],[0,\"\\n      \"],[7,\"th\"],[9],[0,\"name\"],[10],[0,\"\\n      \"],[7,\"th\"],[9],[0,\"created\"],[10],[0,\"\\n      \"],[7,\"th\"],[9],[0,\"updated\"],[10],[0,\"\\n      \"],[7,\"th\"],[9],[0,\"edit\"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"tbody\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\"]]],null,{\"statements\":[[0,\"      \"],[7,\"tr\"],[9],[0,\"\\n        \"],[7,\"td\"],[9],[1,[22,1,[\"id\"]],false],[10],[0,\"\\n        \"],[7,\"td\"],[9],[1,[22,1,[\"name\"]],false],[10],[0,\"\\n        \"],[7,\"td\"],[9],[1,[27,\"formatted-date\",[[22,1,[\"createdAt\"]]],null],false],[10],[0,\"\\n        \"],[7,\"td\"],[9],[1,[27,\"formatted-date\",[[22,1,[\"updatedAt\"]]],null],false],[10],[0,\"\\n        \"],[7,\"td\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"admin.taxonomies.taxonomy.edit\",[22,1,[]]],null,{\"statements\":[[0,\"            \"],[7,\"span\"],[11,\"class\",\"glyphicon glyphicon-pencil\"],[9],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[1,[21,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/admin/taxonomies/taxonomy.hbs" } });
});
;define("rama-front/templates/admin/taxonomies/taxonomy/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "6UKoeJbg", "block": "{\"symbols\":[],\"statements\":[[4,\"modal-comp\",null,[[\"modalId\",\"isRoute\"],[\"admin_taxonomies_taxonomoy_edit_modal\",true]],{\"statements\":[[0,\"  \"],[7,\"div\"],[11,\"class\",\"modal-header\"],[9],[0,\"\\n    \"],[7,\"button\"],[11,\"class\",\"close\"],[11,\"data-dismiss\",\"modal\"],[11,\"type\",\"button\"],[9],[7,\"span\"],[9],[0,\"×\"],[10],[10],[0,\"\\n    \"],[7,\"h4\"],[11,\"class\",\"modal-title\"],[9],[0,\"Edit \"],[1,[27,\"capitalize\",[[23,[\"model\",\"_internalModel\",\"modelName\"]]],null],false],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"modal-body\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"form-group\"],[9],[0,\"\\n      \"],[7,\"label\"],[11,\"for\",\"nameInput\"],[9],[0,\"Name\"],[10],[0,\"\\n      \"],[1,[27,\"input\",null,[[\"type\",\"class\",\"id\",\"value\"],[\"text\",\"form-control\",\"nameInput\",[23,[\"proxy\",\"name\"]]]]],false],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"modal-footer\"],[9],[0,\"\\n    \"],[7,\"button\"],[11,\"class\",\"btn btn-danger pull-left\"],[11,\"data-dismiss\",\"modal\"],[11,\"type\",\"button\"],[3,\"action\",[[22,0,[]],\"deleteTaxonomy\"]],[9],[0,\"Delete\"],[10],[0,\"\\n    \"],[7,\"button\"],[11,\"class\",\"btn btn-default\"],[11,\"data-dismiss\",\"modal\"],[11,\"type\",\"button\"],[9],[0,\"Close\"],[10],[0,\"\\n    \"],[7,\"button\"],[11,\"class\",\"btn btn-primary\"],[11,\"data-dismiss\",\"modal\"],[11,\"type\",\"button\"],[3,\"action\",[[22,0,[]],\"editTaxonomy\"]],[9],[0,\"Save Changes\"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/admin/taxonomies/taxonomy/edit.hbs" } });
});
;define("rama-front/templates/admin/taxonomies/taxonomy/new", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "vMUp5Dvr", "block": "{\"symbols\":[],\"statements\":[[4,\"modal-comp\",null,[[\"id\",\"modalId\",\"isRoute\",\"size\"],[\"admin_taxonomies_taxonomy_new_modal\",\"newTaxonomy\",true,\"sm\"]],{\"statements\":[[0,\"  \"],[7,\"div\"],[11,\"class\",\"modal-header\"],[9],[0,\"\\n    \"],[7,\"button\"],[11,\"class\",\"close\"],[11,\"data-dismiss\",\"modal\"],[11,\"type\",\"button\"],[9],[7,\"span\"],[9],[0,\"×\"],[10],[10],[0,\"\\n    \"],[7,\"h4\"],[11,\"class\",\"modal-title\"],[9],[0,\"New \"],[1,[27,\"capitalize\",[[23,[\"model\",\"_internalModel\",\"modelName\"]]],null],false],[10],[0,\" \"],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"modal-body\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"form-group\"],[9],[0,\"\\n      \"],[7,\"label\"],[11,\"for\",\"nameInput\"],[9],[0,\"Name\"],[10],[0,\"\\n      \"],[1,[27,\"input\",null,[[\"type\",\"class\",\"id\",\"value\"],[\"text\",\"form-control\",\"nameInput\",[23,[\"model\",\"name\"]]]]],false],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"modal-footer\"],[9],[0,\"\\n    \"],[7,\"button\"],[11,\"class\",\"btn btn-default\"],[11,\"data-dismiss\",\"modal\"],[11,\"type\",\"button\"],[9],[0,\"Close\"],[10],[0,\"\\n    \"],[7,\"button\"],[11,\"class\",\"btn btn-primary\"],[11,\"data-dismiss\",\"modal\"],[11,\"type\",\"button\"],[3,\"action\",[[22,0,[]],\"createTaxonomy\"]],[9],[0,\"Create\"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/admin/taxonomies/taxonomy/new.hbs" } });
});
;define("rama-front/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "tnt7h5fa", "block": "{\"symbols\":[],\"statements\":[[1,[21,\"admin-toolbar-comp\"],false],[0,\"\\n\\n\"],[1,[21,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/application.hbs" } });
});
;define("rama-front/templates/components/admin-toolbar-comp", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "RfxkOaB+", "block": "{\"symbols\":[],\"statements\":[[7,\"nav\"],[11,\"class\",\"navbar navbar-default\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"container-fluid\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"btn-group\"],[9],[0,\"\\n      \"],[4,\"link-to\",[\"posts\"],[[\"class\",\"current-when\"],[\"btn btn-default btn-xs\",\"projects posts about\"]],{\"statements\":[[0,\"DistantFutureJOSH\"]],\"parameters\":[]},null],[0,\"\\n      \"],[4,\"link-to\",[\"admin\"],[[\"class\"],[\"btn btn-default btn-xs\"]],{\"statements\":[[0,\"Admin\"]],\"parameters\":[]},null],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"button\"],[11,\"class\",\"btn btn-success btn-xs pull-right\"],[11,\"data-toggle\",\"modal\"],[11,\"data-target\",\"#newPostModal\"],[9],[0,\"New Post\"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[1,[27,\"post-modal-comp\",null,[[\"model\",\"modalId\"],[[23,[\"newPost\"]],\"newPostModal\"]]],false]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/components/admin-toolbar-comp.hbs" } });
});
;define("rama-front/templates/components/haiku-comp", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "oBpey9oe", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"haiku\"],[9],[0,\"\\n  \"],[7,\"pre\"],[9],[0,\"    \"],[7,\"span\"],[9],[0,\"\\n      function aboutMe($name) {\\n\\n          var $haiku = \\\"\\\";\\n\\n          $haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"Call me \"],[10],[7,\"span\"],[9],[0,\"\\\" + $name;\"],[10],[7,\"em\"],[9],[0,\"Joshua\\\"\"],[10],[0,\"\\n          \"],[7,\"span\"],[9],[0,\"$haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"But J. Arthur Wetenkamp\"],[10],[0,\"\\\"\"],[7,\"span\"],[9],[0,\";\"],[10],[0,\"\\n          \"],[7,\"span\"],[9],[0,\"$haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"Has a ring to it\"],[10],[0,\"\\\"\"],[7,\"span\"],[9],[0,\";\"],[10],[0,\"\\n\\n          \"],[7,\"span\"],[9],[0,\"$haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"I think about space\"],[10],[0,\"\\\"\"],[7,\"span\"],[9],[0,\";\"],[10],[0,\"\\n          \"],[7,\"span\"],[9],[0,\"$haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"Sometimes, more than I ought to\"],[10],[0,\"\\\"\"],[7,\"span\"],[9],[0,\";\"],[10],[0,\"\\n          \"],[7,\"span\"],[9],[0,\"$haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"Even this moment\"],[10],[0,\"\\\"\"],[7,\"span\"],[9],[0,\";\"],[10],[0,\"\\n\\n          \"],[7,\"span\"],[9],[0,\"$haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"The websites I build\"],[10],[0,\"\\\"\"],[7,\"span\"],[9],[0,\";\"],[10],[0,\"\\n          \"],[7,\"span\"],[9],[0,\"$haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"I build with my brain, fingers,\"],[10],[0,\"\\\"\"],[7,\"span\"],[9],[0,\";\"],[10],[0,\"\\n          \"],[7,\"span\"],[9],[0,\"$haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"Hot bean beverages\"],[10],[0,\"\\\"\"],[7,\"span\"],[9],[0,\";\"],[10],[0,\"\\n\\n          \"],[7,\"span\"],[9],[0,\"$haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"A dog at my side\"],[10],[0,\"\\\"\"],[7,\"span\"],[9],[0,\";\"],[10],[0,\"\\n          \"],[7,\"span\"],[9],[0,\"$haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"Furry, lazy, sun-sleeper\"],[10],[0,\"\\\"\"],[7,\"span\"],[9],[0,\";\"],[10],[0,\"\\n          \"],[7,\"span\"],[9],[0,\"$haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"Cat malevolent\"],[10],[0,\"\\\"\"],[7,\"span\"],[9],[0,\";\"],[10],[0,\"\\n\\n          \"],[7,\"span\"],[9],[0,\"$haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"Often my two thumbs\"],[10],[0,\"\\\"\"],[7,\"span\"],[9],[0,\";\"],[10],[0,\"\\n          \"],[7,\"span\"],[9],[0,\"$haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"Seek adventure far away\"],[10],[0,\"\\\"\"],[7,\"span\"],[9],[0,\";\"],[10],[0,\"\\n          \"],[7,\"span\"],[9],[0,\"$haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"In search of rupees\"],[10],[0,\"\\\"\"],[7,\"span\"],[9],[0,\";\"],[10],[0,\"\\n\\n          \"],[7,\"span\"],[9],[0,\"$haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"An olive skinned girl\"],[10],[0,\"\\\"\"],[7,\"span\"],[9],[0,\";\"],[10],[0,\"\\n          \"],[7,\"span\"],[9],[0,\"$haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"Takes tea with sugar and milk\"],[10],[0,\"\\\"\"],[7,\"span\"],[9],[0,\";\"],[10],[0,\"\\n          \"],[7,\"span\"],[9],[0,\"$haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"Flowers in her hair\"],[10],[0,\"\\\"\"],[7,\"span\"],[9],[0,\";\"],[10],[0,\"\\n\\n          \"],[7,\"span\"],[9],[0,\"$haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"California farm,\"],[10],[0,\"\\\"\"],[7,\"span\"],[9],[0,\";\"],[10],[0,\"\\n          \"],[7,\"span\"],[9],[0,\"$haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"Ecuador, San Diego\"],[10],[0,\"\\\"\"],[7,\"span\"],[9],[0,\";\"],[10],[0,\"\\n          \"],[7,\"span\"],[9],[0,\"$haiku += \"],[10],[0,\"\\\"\"],[7,\"strong\"],[9],[0,\"San Francisco bay\"],[10],[0,\"\\\"\"],[7,\"span\"],[9],[0,\";\"],[10],[0,\"\\n\\n          \"],[7,\"span\"],[9],[0,\"return $haiku;\\n\\n      }\\n\\n      aboutMe(\\\"Joshua\\\");\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/components/haiku-comp.hbs" } });
});
;define("rama-front/templates/components/header-comp", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "QXgOFKYw", "block": "{\"symbols\":[],\"statements\":[[4,\"link-to\",[\"projects\"],null,{\"statements\":[[0,\"  \"],[7,\"div\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"title\"],[9],[0,\"\\n      \"],[7,\"h1\"],[9],[0,\"DistantFutureJOSH\"],[10],[0,\"\\n      \"],[7,\"h2\"],[9],[0,\"A Present Day Web Log\"],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"img\"],[12,\"src\",[28,[[23,[\"ENV\",\"apiURL\"]],\"/uploads/2014/01/dfjHeader_2160x622_grey_transparent.png\"]]],[9],[10],[0,\"\\n  \"],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/components/header-comp.hbs" } });
});
;define("rama-front/templates/components/modal-comp", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "2WFGCfQf", "block": "{\"symbols\":[\"&default\"],\"statements\":[[7,\"div\"],[11,\"class\",\"modal fade\"],[12,\"id\",[21,\"modalId\"]],[11,\"tabindex\",\"-1\"],[11,\"role\",\"dialog\"],[9],[0,\"\\n  \"],[7,\"div\"],[12,\"class\",[28,[\"modal-dialog \",[27,\"if\",[[23,[\"size\"]],[27,\"concat\",[\"modal-\",[23,[\"size\"]]],null]],null]]]],[11,\"role\",\"document\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"modal-content\"],[9],[0,\"\\n      \"],[14,1],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/components/modal-comp.hbs" } });
});
;define("rama-front/templates/components/nav-comp", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "naldzp6U", "block": "{\"symbols\":[],\"statements\":[[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    \"],[4,\"link-to\",[\"projects\"],null,{\"statements\":[[0,\"Projects\"]],\"parameters\":[]},null],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    \"],[4,\"link-to\",[\"posts\",[27,\"query-params\",null,[[\"page\"],[1]]]],[[\"current-when\"],[\"posts\"]],{\"statements\":[[0,\"Posts\"]],\"parameters\":[]},null],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"li\"],[9],[0,\"\\n    \"],[4,\"link-to\",[\"about\"],null,{\"statements\":[[0,\"About\"]],\"parameters\":[]},null],[0,\"\\n  \"],[10],[0,\"\\n\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/components/nav-comp.hbs" } });
});
;define("rama-front/templates/components/pagination-comp", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "BuDfhbLJ", "block": "{\"symbols\":[],\"statements\":[[7,\"footer\"],[11,\"class\",\"row\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-sm-2\"],[9],[10],[0,\"\\n  \"],[7,\"nav\"],[11,\"class\",\"col-sm-8\"],[9],[0,\"\\n    \"],[7,\"ul\"],[11,\"class\",\"pager\"],[9],[0,\"\\n      \"],[7,\"li\"],[12,\"class\",[28,[\"previous \",[27,\"if\",[[23,[\"isFirstPage\"]],\"hidden\",\"\"],null]]]],[9],[0,\"\\n        \"],[4,\"link-to\",[[27,\"query-params\",null,[[\"limit\",\"page\"],[[23,[\"limit\"]],[23,[\"prevPage\"]]]]]],null,{\"statements\":[[7,\"span\"],[9],[0,\"←\"],[10],[0,\" Newer\"]],\"parameters\":[]},null],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"li\"],[12,\"class\",[28,[\"next \",[27,\"if\",[[23,[\"isLastPage\"]],\"hidden\",\"\"],null]]]],[9],[0,\"\\n        \"],[4,\"link-to\",[[27,\"query-params\",null,[[\"limit\",\"page\"],[[23,[\"limit\"]],[23,[\"nextPage\"]]]]]],null,{\"statements\":[[0,\"Older \"],[7,\"span\"],[9],[0,\"→\"],[10]],\"parameters\":[]},null],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-sm-2\"],[9],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/components/pagination-comp.hbs" } });
});
;define("rama-front/templates/components/post-comp", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "hI9hXkL/", "block": "{\"symbols\":[],\"statements\":[[7,\"article\"],[11,\"class\",\"row\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-sm-12\"],[9],[0,\"\\n\\n    \"],[7,\"div\"],[11,\"class\",\"row title\"],[9],[0,\"\\n      \"],[7,\"div\"],[12,\"class\",[28,[\"col-sm-\",[21,\"gutterColumns\"]]]],[9],[10],[0,\"\\n      \"],[7,\"div\"],[12,\"class\",[28,[\"col-sm-\",[21,\"contentColumns\"]]]],[9],[0,\"\\n        \"],[7,\"h1\"],[9],[0,\"\\n\"],[4,\"if\",[[23,[\"post\",\"featureLink\"]]],null,{\"statements\":[[0,\"            \"],[7,\"a\"],[11,\"href\",\"\"],[9],[0,\"\\n\"],[4,\"if\",[[23,[\"showAsterisk\"]]],null,{\"statements\":[[0,\"                \"],[7,\"span\"],[11,\"class\",\"glyphicon glyphicon-asterisk\"],[9],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"              \"],[1,[23,[\"post\",\"title\"]],false],[0,\"\\n            \"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"link-to\",[\"post\",[23,[\"post\"]]],null,{\"statements\":[[4,\"if\",[[23,[\"showAsterisk\"]]],null,{\"statements\":[[0,\"                \"],[7,\"span\"],[11,\"class\",\"glyphicon glyphicon-asterisk\"],[9],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"              \"],[1,[23,[\"post\",\"title\"]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]}],[0,\"        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"div\"],[12,\"class\",[28,[\"col-sm-\",[21,\"gutterColumns\"]]]],[9],[10],[0,\"\\n    \"],[10],[0,\"\\n    \\n\"],[4,\"if\",[[23,[\"showFeatureImage\"]]],null,{\"statements\":[[0,\"      \"],[7,\"div\"],[11,\"class\",\"row feature-image\"],[9],[0,\"\\n        \"],[7,\"a\"],[12,\"href\",[23,[\"post\",\"featureLink\"]]],[9],[0,\"\\n          \"],[7,\"img\"],[12,\"src\",[27,\"concat\",[[23,[\"ENV\",\"apiURL\"]],[23,[\"post\",\"featureImage\"]]],null]],[9],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"row content\"],[9],[0,\"\\n      \"],[7,\"div\"],[12,\"class\",[28,[\"col-sm-\",[21,\"gutterColumns\"],\" taxonomy\"]]],[9],[0,\"\\n\"],[4,\"if\",[[23,[\"showTaxonomy\"]]],null,{\"statements\":[[0,\"          \"],[1,[27,\"post/taxonomy-comp\",null,[[\"post\"],[[23,[\"post\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[10],[0,\"\\n      \"],[7,\"div\"],[12,\"class\",[28,[\"col-sm-\",[21,\"contentColumns\"]]]],[9],[0,\"\\n        \"],[7,\"p\"],[9],[1,[23,[\"post\",\"htmlBody\"]],false],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"showAttribution\"]]],null,{\"statements\":[[0,\"          \"],[7,\"p\"],[9],[0,\"— by \"],[1,[27,\"post/attribution-comp\",null,[[\"post\"],[[23,[\"post\"]]]]],false],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[7,\"hr\"],[12,\"class\",[27,\"if\",[[23,[\"showHorizontalRule\"]],\"\",\"invisible\"],null]],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"div\"],[12,\"class\",[28,[\"col-sm-\",[21,\"gutterColumns\"]]]],[9],[10],[0,\"\\n    \"],[10],[0,\"\\n\\n  \"],[10],[0,\"\\n\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/components/post-comp.hbs" } });
});
;define("rama-front/templates/components/post-modal-comp", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ULmXv3rY", "block": "{\"symbols\":[\"postTag\",\"tag\",\"postCategory\",\"category\"],\"statements\":[[4,\"modal-comp\",null,[[\"modalId\",\"size\",\"isRoute\"],[[23,[\"modalId\"]],\"lg\",[23,[\"isRoute\"]]]],{\"statements\":[[0,\"  \"],[7,\"div\"],[11,\"class\",\"modal-header\"],[9],[0,\"\\n    \"],[7,\"button\"],[11,\"class\",\"close\"],[11,\"data-dismiss\",\"modal\"],[11,\"type\",\"button\"],[9],[7,\"span\"],[9],[0,\"×\"],[10],[10],[0,\"\\n    \"],[7,\"h4\"],[9],[0,\"New Post\"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"modal-body\"],[9],[0,\"\\n\\n    \"],[7,\"div\"],[11,\"class\",\"row title\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"col-sm-10 col-sm-offset-2\"],[9],[0,\"\\n        \"],[7,\"div\"],[11,\"class\",\"form-group form-group-lg\"],[9],[0,\"\\n          \"],[1,[27,\"input\",null,[[\"class\",\"value\",\"type\",\"placeholder\"],[\"form-control input-lg\",[23,[\"model\",\"title\"]],\"text\",\"Title\"]]],false],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n\\n    \"],[7,\"div\"],[11,\"class\",\"row content\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"col-sm-2 taxonomy\"],[9],[0,\"\\n        \"],[7,\"ul\"],[11,\"class\",\"list-unstyled\"],[9],[0,\"\\n          \"],[7,\"li\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"dropdown\"],[9],[0,\"\\n              \"],[7,\"button\"],[11,\"id\",\"categroyButton\"],[11,\"data-toggle\",\"dropdown\"],[11,\"class\",\"btn btn-xs btn-success\"],[11,\"type\",\"button\"],[9],[0,\"\\n                Add Categories\\n                \"],[7,\"span\"],[11,\"class\",\"caret\"],[9],[10],[0,\"\\n              \"],[10],[0,\"\\n              \"],[7,\"ul\"],[11,\"class\",\"dropdown-menu pull-right\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"categories\"]]],null,{\"statements\":[[0,\"                  \"],[7,\"li\"],[9],[0,\"\\n                    \"],[7,\"a\"],[11,\"href\",\"#\"],[3,\"action\",[[22,0,[]],\"addCategory\",[22,4,[]]]],[9],[1,[22,4,[\"name\"]],false],[10],[0,\"\\n                  \"],[10],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"              \"],[10],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"ul\"],[11,\"class\",\"list-unstyled\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\",\"postCategories\"]]],null,{\"statements\":[[0,\"                \"],[7,\"li\"],[9],[0,\"\\n                  \"],[7,\"button\"],[11,\"class\",\"btn btn-xs btn-success\"],[11,\"type\",\"button\"],[9],[0,\"\\n                    \"],[1,[22,3,[\"category\",\"name\"]],false],[0,\"\\n                  \"],[10],[0,\"\\n                \"],[10],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n          \"],[7,\"li\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"dropdown\"],[9],[0,\"\\n              \"],[7,\"button\"],[11,\"id\",\"tagButton\"],[11,\"data-toggle\",\"dropdown\"],[11,\"class\",\"btn btn-xs btn-info\"],[11,\"type\",\"button\"],[9],[0,\"\\n                Add Tags\\n                \"],[7,\"span\"],[11,\"class\",\"caret\"],[9],[10],[0,\"\\n              \"],[10],[0,\"\\n              \"],[7,\"ul\"],[11,\"class\",\"dropdown-menu pull-right\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"tags\"]]],null,{\"statements\":[[0,\"                  \"],[7,\"li\"],[9],[0,\"\\n                    \"],[7,\"a\"],[11,\"href\",\"#\"],[3,\"action\",[[22,0,[]],\"addTag\",[22,2,[]]]],[9],[1,[22,2,[\"name\"]],false],[10],[0,\"\\n                  \"],[10],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"              \"],[10],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"ul\"],[11,\"class\",\"list-unstyled\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\",\"postTags\"]]],null,{\"statements\":[[0,\"                \"],[7,\"li\"],[9],[0,\"\\n                  \"],[7,\"button\"],[11,\"class\",\"btn btn-xs btn-info\"],[11,\"type\",\"button\"],[9],[0,\"\\n                    \"],[1,[22,1,[\"tag\",\"name\"]],false],[0,\"\\n                  \"],[10],[0,\"\\n                \"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"col-sm-10\"],[9],[0,\"\\n        \"],[7,\"div\"],[11,\"class\",\"form-group form-group-lg\"],[9],[0,\"\\n          \"],[1,[27,\"textarea\",null,[[\"class\",\"value\",\"rows\",\"placeholder\"],[\"form-control input-lg\",[23,[\"model\",\"body\"]],\"10\",\"What's happening?\"]]],false],[0,\"\\n        \"],[10],[0,\"\\n        \"],[7,\"div\"],[11,\"class\",\"form-group form-group-lg\"],[9],[0,\"\\n          \"],[7,\"button\"],[11,\"class\",\"btn btn-lg btn-primary pull-right\"],[11,\"type\",\"button\"],[3,\"action\",[[22,0,[]],\"publishPost\"]],[9],[0,\"Publish\"],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n\\n  \"],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/components/post-modal-comp.hbs" } });
});
;define("rama-front/templates/components/post/attribution-comp", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "qCvrdLhu", "block": "{\"symbols\":[],\"statements\":[[7,\"em\"],[9],[7,\"strong\"],[9],[1,[27,\"if\",[[23,[\"post\",\"author\"]],[23,[\"post\",\"author\"]],\"Unknown\"],null],false],[10],[10],[0,\"\\nat \"],[7,\"em\"],[9],[7,\"strong\"],[9],[1,[27,\"formatted-date\",[[23,[\"post\",\"createdAt\"]],\"h:mm a\"],null],false],[10],[10],[0,\"\\non \"],[7,\"em\"],[9],[7,\"strong\"],[9],[1,[27,\"formatted-date\",[[23,[\"post\",\"createdAt\"]],\"MMMM D, YYYY\"],null],false],[10],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/components/post/attribution-comp.hbs" } });
});
;define("rama-front/templates/components/post/comments-comp", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8Q2slNy+", "block": "{\"symbols\":[\"comment\"],\"statements\":[[7,\"div\"],[11,\"class\",\"row content\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-sm-2\"],[9],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-sm-8\"],[9],[0,\"\\n    \"],[7,\"ul\"],[11,\"class\",\"list-unstyled\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"post\",\"comments\"]]],null,{\"statements\":[[0,\"        \"],[7,\"li\"],[9],[0,\"\\n          \"],[7,\"p\"],[9],[1,[27,\"post/attribution-comp\",null,[[\"post\"],[[22,1,[]]]]],false],[0,\" said:\"],[10],[0,\"\\n          \"],[7,\"p\"],[11,\"class\",\"bg-disabled\"],[9],[1,[22,1,[\"content\"]],false],[10],[0,\"\\n        \"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"col-sm-2\"],[9],[10],[0,\"\\n\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/components/post/comments-comp.hbs" } });
});
;define("rama-front/templates/components/post/taxonomy-comp", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "IqZQK9XN", "block": "{\"symbols\":[\"tag\",\"category\"],\"statements\":[[4,\"if\",[[23,[\"post\",\"categories\"]]],null,{\"statements\":[[0,\"  \"],[7,\"ul\"],[11,\"class\",\"list-unstyled\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"post\",\"categories\"]]],null,{\"statements\":[[0,\"      \"],[7,\"li\"],[9],[0,\"\\n        \"],[7,\"button\"],[11,\"class\",\"btn btn-xs btn-success\"],[11,\"type\",\"button\"],[9],[0,\"\\n          \"],[1,[22,2,[\"name\"]],false],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"  \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[23,[\"post\",\"tags\"]]],null,{\"statements\":[[0,\"  \"],[7,\"ul\"],[11,\"class\",\"list-unstyled\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"post\",\"tags\"]]],null,{\"statements\":[[0,\"      \"],[7,\"li\"],[9],[0,\"\\n        \"],[7,\"button\"],[11,\"class\",\"btn btn-xs btn-info\"],[11,\"type\",\"button\"],[9],[0,\"\\n          \"],[1,[22,1,[\"name\"]],false],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/components/post/taxonomy-comp.hbs" } });
});
;define("rama-front/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "yD/TaV/S", "block": "{\"symbols\":[],\"statements\":[[1,[21,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/index.hbs" } });
});
;define("rama-front/templates/post", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1I0Lvr/q", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"container-fluid\"],[9],[0,\"\\n  \"],[1,[27,\"post-comp\",null,[[\"post\",\"showFeatureImage\"],[[23,[\"model\"]],false]]],false],[0,\"\\n  \"],[1,[27,\"post/comments-comp\",null,[[\"post\"],[[23,[\"model\"]]]]],false],[0,\"\\n\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/post.hbs" } });
});
;define("rama-front/templates/posts", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "0MMdG1Xd", "block": "{\"symbols\":[\"post\"],\"statements\":[[1,[21,\"header-comp\"],false],[0,\"\\n\\n\"],[1,[21,\"nav-comp\"],false],[0,\"\\n\\n\"],[7,\"main\"],[11,\"class\",\"container-fluid\"],[9],[0,\"\\n\\n\"],[4,\"each\",[[23,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[1,[27,\"post-comp\",null,[[\"post\",\"showFeatureImage\"],[[22,1,[]],false]]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\n  \"],[1,[27,\"pagination-comp\",null,[[\"store\",\"limit\",\"page\",\"total\"],[[23,[\"store\"]],[23,[\"limit\"]],[23,[\"page\"]],[23,[\"total\"]]]]],false],[0,\" \"],[0,\"\\n\\n\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/posts.hbs" } });
});
;define("rama-front/templates/projects", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "YnWQ2uyd", "block": "{\"symbols\":[\"post\"],\"statements\":[[1,[21,\"header-comp\"],false],[0,\"\\n\\n\"],[1,[21,\"nav-comp\"],false],[0,\"\\n\\n\"],[7,\"main\"],[11,\"class\",\"container-fluid\"],[9],[0,\"\\n  \\n\"],[4,\"each\",[[23,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[1,[27,\"post-comp\",null,[[\"post\",\"showAsterisk\",\"showFeatureImage\",\"showTaxonomy\",\"showAttribution\",\"showHorizontalRule\",\"gutterColumns\"],[[22,1,[]],false,true,false,false,false,1]]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \\n\"],[0,\"\\n\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "rama-front/templates/projects.hbs" } });
});
;

;define('rama-front/config/environment', [], function() {
  var prefix = 'rama-front';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("rama-front/app")["default"].create({"name":"rama-front","version":"0.0.0+060667cd"});
          }
        
//# sourceMappingURL=rama-front.map
