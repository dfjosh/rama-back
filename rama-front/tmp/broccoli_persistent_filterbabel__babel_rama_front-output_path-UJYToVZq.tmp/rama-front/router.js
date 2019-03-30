define('rama-front/router', ['exports', 'rama-front/config/environment', 'ember-router-scroll'], function (exports, _environment, _emberRouterScroll) {
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
    this.route('login');
  });

  exports.default = Router;
});