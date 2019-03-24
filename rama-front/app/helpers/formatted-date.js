import { helper } from '@ember/component/helper';
import moment from 'moment';

export function formattedDate(params/*, hash*/) {
  let date = params[0];
  let format = params[1] || "YYYY-MM-DD HH:mm:ss";
  
  var result = moment(date).format(format);
  return result;
}

export default helper(formattedDate);
