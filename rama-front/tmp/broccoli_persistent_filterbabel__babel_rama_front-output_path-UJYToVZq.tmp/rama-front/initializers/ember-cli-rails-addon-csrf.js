define('rama-front/initializers/ember-cli-rails-addon-csrf', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const { $ } = Ember;

  exports.default = {
    name: 'ember-cli-rails-addon-csrf',

    initialize() {
      $.ajaxPrefilter((options, originalOptions, xhr) => {
        const token = $('meta[name="csrf-token"]').attr('content');
        xhr.setRequestHeader('X-CSRF-Token', token);
      });
    }
  };
});