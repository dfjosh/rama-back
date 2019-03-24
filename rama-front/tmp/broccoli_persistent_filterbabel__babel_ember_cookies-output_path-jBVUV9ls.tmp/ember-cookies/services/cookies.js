define('ember-cookies/services/cookies', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const { keys } = Object;
  const assign = Object.assign || Ember.assign || Ember.merge;
  const DEFAULTS = { raw: false };
  const MAX_COOKIE_BYTE_LENGTH = 4096;

  exports.default = Ember.Service.extend({
    _isFastBoot: Ember.computed.reads('_fastBoot.isFastBoot'),

    _fastBoot: Ember.computed(function () {
      let owner = Ember.getOwner(this);

      return owner.lookup('service:fastboot');
    }),

    _document: Ember.computed(function () {
      return document;
    }),

    _documentCookies: Ember.computed(function () {
      let all = this.get('_document.cookie').split(';');
      let filtered = this._filterDocumentCookies(Ember.A(all));

      return filtered.reduce((acc, cookie) => {
        if (!Ember.isEmpty(cookie)) {
          let [key, value] = cookie;
          acc[key.trim()] = (value || '').trim();
        }
        return acc;
      }, {});
    }).volatile(),

    _fastBootCookies: Ember.computed(function () {
      let fastBootCookies = this.get('_fastBoot.request.cookies');
      fastBootCookies = Ember.A(keys(fastBootCookies)).reduce((acc, name) => {
        let value = fastBootCookies[name];
        acc[name] = { value };
        return acc;
      }, {});

      let fastBootCookiesCache = this._fastBootCookiesCache || {};
      fastBootCookies = assign({}, fastBootCookies, fastBootCookiesCache);
      this._fastBootCookiesCache = fastBootCookies;

      return this._filterCachedFastBootCookies(fastBootCookies);
    }).volatile(),

    read(name, options = {}) {
      options = assign({}, DEFAULTS, options || {});
      (true && !(Ember.isEmpty(options.domain) && Ember.isEmpty(options.expires) && Ember.isEmpty(options.maxAge) && Ember.isEmpty(options.path)) && Ember.assert('Domain, Expires, Max-Age, and Path options cannot be set when reading cookies', Ember.isEmpty(options.domain) && Ember.isEmpty(options.expires) && Ember.isEmpty(options.maxAge) && Ember.isEmpty(options.path)));


      let all;
      if (this.get('_isFastBoot')) {
        all = this.get('_fastBootCookies');
      } else {
        all = this.get('_documentCookies');
      }

      if (name) {
        return this._decodeValue(all[name], options.raw);
      } else {
        Ember.A(keys(all)).forEach(name => all[name] = this._decodeValue(all[name], options.raw));
        return all;
      }
    },

    write(name, value, options = {}) {
      options = assign({}, DEFAULTS, options || {});
      (true && !(!options.httpOnly) && Ember.assert('Cookies cannot be set to be HTTP-only as those cookies would not be accessible by the Ember.js application itself when running in the browser!', !options.httpOnly));
      (true && !(!options.signed) && Ember.assert("Cookies cannot be set as signed as signed cookies would not be modifyable in the browser as it has no knowledge of the express server's signing key!", !options.signed));
      (true && !(Ember.isEmpty(options.expires) || Ember.isEmpty(options.maxAge)) && Ember.assert('Cookies cannot be set with both maxAge and an explicit expiration time!', Ember.isEmpty(options.expires) || Ember.isEmpty(options.maxAge)));


      value = this._encodeValue(value, options.raw);

      (true && !(this._isCookieSizeAcceptable(value)) && Ember.assert(`Cookies larger than ${MAX_COOKIE_BYTE_LENGTH} bytes are not supported by most browsers!`, this._isCookieSizeAcceptable(value)));


      if (this.get('_isFastBoot')) {
        this._writeFastBootCookie(name, value, options);
      } else {
        this._writeDocumentCookie(name, value, options);
      }
    },

    clear(name, options = {}) {
      options = assign({}, options || {});
      (true && !(Ember.isEmpty(options.expires) && Ember.isEmpty(options.maxAge) && Ember.isEmpty(options.raw)) && Ember.assert('Expires, Max-Age, and raw options cannot be set when clearing cookies', Ember.isEmpty(options.expires) && Ember.isEmpty(options.maxAge) && Ember.isEmpty(options.raw)));


      options.expires = new Date('1970-01-01');
      this.write(name, null, options);
    },

    exists(name) {
      let all;
      if (this.get('_isFastBoot')) {
        all = this.get('_fastBootCookies');
      } else {
        all = this.get('_documentCookies');
      }

      return all.hasOwnProperty(name);
    },

    _writeDocumentCookie(name, value, options = {}) {
      let serializedCookie = this._serializeCookie(name, value, options);
      this.set('_document.cookie', serializedCookie);
    },

    _writeFastBootCookie(name, value, options = {}) {
      let responseHeaders = this.get('_fastBoot.response.headers');
      let serializedCookie = this._serializeCookie(...arguments);

      if (!Ember.isEmpty(options.maxAge)) {
        options.maxAge *= 1000;
      }

      this._cacheFastBootCookie(...arguments);

      responseHeaders.append('set-cookie', serializedCookie);
    },

    _cacheFastBootCookie(name, value, options = {}) {
      let fastBootCache = this._fastBootCookiesCache || {};
      let cachedOptions = Ember.merge({}, options);

      if (cachedOptions.maxAge) {
        let expires = new Date();
        expires.setSeconds(expires.getSeconds() + options.maxAge);
        cachedOptions.expires = expires;
        delete cachedOptions.maxAge;
      }

      fastBootCache[name] = { value, options: cachedOptions };
      this._fastBootCookiesCache = fastBootCache;
    },

    _filterCachedFastBootCookies(fastBootCookies) {
      let { path: requestPath, protocol } = this.get('_fastBoot.request');

      // cannot use deconstruct here
      let host = this.get('_fastBoot.request.host');

      return Ember.A(keys(fastBootCookies)).reduce((acc, name) => {
        let { value, options } = fastBootCookies[name];
        options = options || {};

        let { path: optionsPath, domain, expires, secure } = options;

        if (optionsPath && requestPath.indexOf(optionsPath) !== 0) {
          return acc;
        }

        if (domain && host.indexOf(domain) + domain.length !== host.length) {
          return acc;
        }

        if (expires && expires < new Date()) {
          return acc;
        }

        if (secure && !(protocol || '').match(/^https/)) {
          return acc;
        }

        acc[name] = value;
        return acc;
      }, {});
    },

    _encodeValue(value, raw) {
      if (Ember.isNone(value)) {
        return '';
      } else if (raw) {
        return value;
      } else {
        return encodeURIComponent(value);
      }
    },

    _decodeValue(value, raw) {
      if (Ember.isNone(value) || raw) {
        return value;
      } else {
        return decodeURIComponent(value);
      }
    },

    _filterDocumentCookies(unfilteredCookies) {
      return unfilteredCookies.map(c => c.split('=')).filter(c => c.length === 2 && Ember.isPresent(c[0]));
    },

    _serializeCookie(name, value, options = {}) {
      let cookie = `${name}=${value}`;

      if (!Ember.isEmpty(options.domain)) {
        cookie = `${cookie}; domain=${options.domain}`;
      }
      if (Ember.typeOf(options.expires) === 'date') {
        cookie = `${cookie}; expires=${options.expires.toUTCString()}`;
      }
      if (!Ember.isEmpty(options.maxAge)) {
        cookie = `${cookie}; max-age=${options.maxAge}`;
      }
      if (options.secure) {
        cookie = `${cookie}; secure`;
      }
      if (!Ember.isEmpty(options.path)) {
        cookie = `${cookie}; path=${options.path}`;
      }

      return cookie;
    },

    _isCookieSizeAcceptable(value) {
      // Counting bytes varies Pre-ES6 and in ES6
      // This snippet counts the bytes in the value
      // about to be stored as the cookie:
      // See https://stackoverflow.com/a/25994411/6657064
      let _byteCount = 0;
      let i = 0;
      let c;
      while (c = value.charCodeAt(i++)) {
        /* eslint-disable no-bitwise */
        _byteCount += c >> 11 ? 3 : c >> 7 ? 2 : 1;
        /* eslint-enable no-bitwise */
      }

      return _byteCount < MAX_COOKIE_BYTE_LENGTH;
    }

  });
});