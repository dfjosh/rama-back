define('rama-front/authenticators/oauth2', ['exports', 'ember-simple-auth/authenticators/oauth2-password-grant', 'rama-front/config/environment'], function (exports, _oauth2PasswordGrant, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _oauth2PasswordGrant.default.extend({
    serverTokenEndpoint: `${_environment.default.apiURL}/sessions`
  });
});