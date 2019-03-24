import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export function ellipsis(params/*, hash*/) {
  var str = params[0];
  let targetLength = params[1];
  
  if (targetLength === undefined || targetLength >= str.length) {
    return str;
  } else {
    return htmlSafe(str.slice(0, targetLength) + "&hellip;");
  }
}

export default helper(ellipsis);
