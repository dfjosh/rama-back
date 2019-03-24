import DS from 'ember-data';
import ENV from '../config/environment';
import { underscore } from '@ember/string';
import { pluralize } from 'ember-inflector';
import TokenAuthorizerMixin from 'ember-simple-auth-token/mixins/token-authorizer';

export default DS.JSONAPIAdapter.extend(TokenAuthorizerMixin, {
  host: ENV.apiURL,
  init() {
    this._super(...arguments);
    this.set('headers', {
      'Content-Type': 'application/vnd.api+json'
    });
  },
  pathForType(type) {
    return pluralize(underscore(type));
  }
});
