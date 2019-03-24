define('rama-front/components/post-comp', ['exports', 'rama-front/config/environment'], function (exports, _environment) {
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