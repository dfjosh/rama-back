define('ember-cookies/clear-all-cookies', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    let cookies = document.cookie.split(';');

    cookies.forEach(cookie => {
      let cookieName = cookie.split('=')[0];

      document.cookie = `${cookieName}=; expires=${new Date(0).toUTCString()}`;
    });
  };
});