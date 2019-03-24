define('rama-front/components/haiku-comp', ['exports'], function (exports) {
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