define('rama-front/router', ['exports', 'ember', 'rama-front/config/environment'], function (exports, _ember, _ramaFrontConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _ramaFrontConfigEnvironment['default'].locationType,
    rootURL: _ramaFrontConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    // arg1 is the route name (what you will use to refer to the route in link-to's). arg2 is what you'll see in the address bar
    // only nest routes if you want one template to render inside another (thru the outlet)
    this.route('posts');
    this.route('posts.new', { path: 'posts/new' }); // I can't nest it because my template can't be nested because I don't want to render it inside the posts template! :(
    this.route('post', { path: 'posts/:post_id' });
    this.route('projects');
  });

  exports['default'] = Router;
});