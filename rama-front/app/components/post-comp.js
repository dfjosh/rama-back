import { computed } from '@ember/object';
import Component from '@ember/component';
import ENV from '../config/environment';

export default Component.extend({
  classNames: ['post-comp'],
  
  ENV: ENV,
  
  showAsterisk: true,
  showFeatureImage: true,
  showTaxonomy: true,
  showAttribution: true,
  showHorizontalRule: true,
  gutterColumns: 2,
  
  contentColumns: computed('gutterColumns', function() {
    return 12 - this.gutterColumns * 2;
  })
});
