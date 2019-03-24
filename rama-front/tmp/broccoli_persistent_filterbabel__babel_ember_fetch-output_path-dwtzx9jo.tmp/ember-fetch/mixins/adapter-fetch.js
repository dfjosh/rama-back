define('ember-fetch/mixins/adapter-fetch', ['exports', 'fetch', 'ember-fetch/utils/mung-options-for-fetch', 'ember-fetch/utils/determine-body-promise'], function (exports, _fetch, _mungOptionsForFetch, _determineBodyPromise) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.headersToObject = headersToObject;


  /**
   * Helper function to create a plain object from the response's Headers.
   * Consumed by the adapter's `handleResponse`.
   * @param {Headers} headers
   * @returns {Object}
   */
  function headersToObject(headers) {
    let headersObject = {};

    if (headers) {
      headers.forEach((value, key) => headersObject[key] = value);
    }

    return headersObject;
  }

  exports.default = Ember.Mixin.create({
    /**
     * @param {String} url
     * @param {String} type
     * @param {Object} _options
     * @returns {Object}
     * @override
    */
    ajaxOptions(url, type, options = {}) {
      options.url = url;
      options.type = type;

      // Add headers set on the Adapter
      let adapterHeaders = this.get('headers');
      if (adapterHeaders) {
        options.headers = Ember.assign(options.headers || {}, adapterHeaders);
      }

      const mungedOptions = (0, _mungOptionsForFetch.default)(options);

      // Mimics the default behavior in Ember Data's `ajaxOptions`, namely to set the
      // 'Content-Type' header to application/json if it is not a GET request and it has a body.
      if (mungedOptions.method !== 'GET' && mungedOptions.body && (mungedOptions.headers === undefined || !(mungedOptions.headers['Content-Type'] || mungedOptions.headers['content-type']))) {
        mungedOptions.headers = mungedOptions.headers || {};
        mungedOptions.headers['Content-Type'] = 'application/json; charset=utf-8';
      }

      return mungedOptions;
    },

    /**
     * @param {String} url
     * @param {String} type
     * @param {Object} options
     * @override
     */
    ajax(url, type, options) {
      const requestData = {
        url,
        method: type
      };

      const hash = this.ajaxOptions(url, type, options);

      return this._ajaxRequest(hash).catch((error, response, requestData) => {
        throw this.ajaxError(this, response, null, requestData, error);
      }).then(response => {
        return Ember.RSVP.hash({
          response,
          payload: (0, _determineBodyPromise.default)(response, requestData)
        });
      }).then(({ response, payload }) => {
        if (response.ok) {
          return this.ajaxSuccess(this, response, payload, requestData);
        } else {
          throw this.ajaxError(this, response, payload, requestData);
        }
      });
    },

    /**
     * Overrides the `_ajaxRequest` method to use `fetch` instead of jQuery.ajax
     * @param {Object} options
     * @override
     */
    _ajaxRequest(options) {
      return this._fetchRequest(options.url, options);
    },

    /**
     * A hook into where `fetch` is called.
     * Useful if you want to override this behavior, for example to multiplex requests.
     * @param {String} url
     * @param {Object} options
     */
    _fetchRequest(url, options) {
      return (0, _fetch.default)(url, options);
    },

    /**
     * @param {Object} adapter
     * @param {Object} response
     * @param {Object} payload
     * @param {Object} requestData
     * @override
     */
    ajaxSuccess(adapter, response, payload, requestData) {
      const returnResponse = adapter.handleResponse(response.status, headersToObject(response.headers), payload, requestData);

      if (returnResponse && returnResponse.isAdapterError) {
        return Ember.RSVP.Promise.reject(returnResponse);
      } else {
        return returnResponse;
      }
    },

    /**
     * Allows for the error to be selected from either the
     * response object, or the response data.
     * @param {Object} response
     * @param {Object} payload
     */
    parseFetchResponseForError(response, payload) {
      return payload || response.statusText;
    },

    /**
     * @param {Object} adapter
     * @param {Object} response
     * @param {String|Object} payload
     * @param {Object} requestData
     * @param {Error} error
     * @override
     */
    ajaxError(adapter, response, payload, requestData, error) {
      if (error) {
        return error;
      } else {
        const parsedResponse = adapter.parseFetchResponseForError(response, payload);
        return adapter.handleResponse(response.status, headersToObject(response.headers), adapter.parseErrorResponse(parsedResponse) || payload, requestData);
      }
    }
  });
});