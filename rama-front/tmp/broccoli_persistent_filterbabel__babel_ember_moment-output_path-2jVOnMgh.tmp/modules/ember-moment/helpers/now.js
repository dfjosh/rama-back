import moment from 'moment';
import BaseHelper from './-base';

export default BaseHelper.extend({
  compute: function compute() {
    this._super.apply(this, arguments);

    return moment.now();
  }
});