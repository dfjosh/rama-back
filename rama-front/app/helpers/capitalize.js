import { helper } from '@ember/component/helper';
import { capitalize as cap } from '@ember/string';

export function capitalize(params/*, hash*/) {
  let string = params[0];
  return cap(string);
}

export default helper(capitalize);
