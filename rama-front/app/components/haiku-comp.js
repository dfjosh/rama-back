import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  didInsertElement: function() {
    this._super(...arguments);
    this.$(window).scroll(function() {
      var a = $(document).scrollTop();
      var b = $('.haiku').offset().top / 2; // divided by two just to make it fade more quickly
      var delta = b - a;
      
      var ratio = delta / b;
      if ( ratio < 0 ) {
        ratio = 0;
      }
      
      var ratioBuffered = delta / b;
      if ( ratioBuffered < 0.1 ) {
        ratioBuffered = 0.1;
      }
      
      var ratioDefined = delta / b;
      if ( ratioDefined <= 0 ) {
        ratioDefined = 0.001;
      }
      
      $('.haiku pre span').css('opacity', ratioBuffered);
      $('.haiku pre em').css('opacity', 1 - ratioBuffered);
      
      var x = $('.haiku').get(0).scrollWidth;
      var y = $('.haiku').width();
      var diff = x - y;
      
      if( x > y ) {
         $('.haiku').scrollLeft(diff * (1 - ratio));
      }
      
    });
  },
  
  willDestroy() {
    $(window).unbind('scroll');
  }
});
