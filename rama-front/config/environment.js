'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'rama-front',
    environment,
    rootURL: '/',
    locationType: 'router-scroll', // 'auto'
    historySupportMiddleware: true,
    apiURL: 'http://localhost:3000/api',
    cdnURL: 'http://localhost:3000',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };
  
  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: `${ENV.apiURL}/user_token/`,
    tokenPropertyName: 'token', // "token" is the default
    refreshTokenPropertyName: 'token' // "refresh_token" is the default, but setting to "token" to use the same token for both access and refresh requests
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    ENV.apiURL = 'https://distant-future-josh.herokuapp.com/api';
    ENV.cdnURL = 'https://s3-us-west-1.amazonaws.com/lazy-rama';
  }

  return ENV;
};
