"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseProvider = void 0;
Object.defineProperty(exports, "IResultError", {
  enumerable: true,
  get: function () {
    return _onResponseError.IResultError;
  }
});

var _axios = _interopRequireDefault(require("axios"));

var _camelcaseKeys = _interopRequireDefault(require("camelcase-keys"));

var _decamelcase = require("../../helpers/decamelcase");

var _onResponseError = require("./onResponseError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BaseProvider {
  constructor(options) {
    const {
      baseURL,
      timeout,
      loggingPrefix,
      debug
    } = options;
    this.debug = !!debug;
    this.loggingPrefix = loggingPrefix;
    this.cancelSources = [];
    this.Api = _axios.default.create({
      baseURL,
      timeout
    });
  }

  log(...args) {
    if (!!this.debug) {
      // eslint-disable-next-line no-console
      console.log(this.loggingPrefix, ...args, '\n');
    }
  }

  buildError(message) {
    return {
      status: false,
      message
    };
  }

  getCancelToken() {
    return _axios.default.CancelToken.source();
  }

  addCancelSource(source) {
    this.cancelSources.push({
      idToken: source.token,
      source
    });
  }

  removeCancelSource(idTokenSource) {
    if (idTokenSource) {
      const newList = this.cancelSources.filter(({
        idToken
      }) => idToken !== idTokenSource);
      this.cancelSources = newList || [];
      return this;
    }

    this.cancelSources = [];
  }

  configureResponses() {
    this.Api.interceptors.response.use(response => {
      const data = (response === null || response === void 0 ? void 0 : response.data) || response;
      this.log(`RESPONSE: (${response === null || response === void 0 ? void 0 : response.statusText})`, typeof data, data);

      if (data && typeof data === 'string') {
        return (0, _camelcaseKeys.default)((0, _onResponseError.convertStringResponseData)(data), {
          deep: true
        });
      }

      return (0, _camelcaseKeys.default)(data, {
        deep: true
      });
    }, _onResponseError.onResponseError);
    return this;
  }

  configureRequests(token) {
    this.Api.interceptors.request.use(config => {
      var _this$tokenStore;

      config.headers = {
        'User-Agent': `wa-node-api/v1 (+https://github.com/leguass7/wa-node-api.git) axios/${_axios.default.VERSION}`,
        'Content-Type': 'application/json'
      };
      const sendToken = token || ((_this$tokenStore = this.tokenStore) === null || _this$tokenStore === void 0 ? void 0 : _this$tokenStore.token);
      if (sendToken) config.headers['authorization'] = sendToken;
      config.data = (0, _decamelcase.decamelcase)(config.data);
      this.log('REQUEST:', config.data);
      return config;
    });
    return this;
  }

  configureAxios(token) {
    return this.configureRequests(token).configureResponses();
  }

  setApiToken(token) {
    if (typeof token === 'string') {
      this.tokenStore = {
        token
      };
    } else {
      this.tokenStore = token;
    }

    this.Api.defaults.headers['authorization'] = this.tokenStore.token;
  }

  getApiToken() {
    return this.tokenStore;
  }
  /**
   * Cancel all requests to `Maxbot` server
   * @method cancelAll
   */


  cancelAll() {
    this.cancelSources.forEach(({
      source
    }) => source && source.cancel());
    this.removeCancelSource();
  }

}

exports.BaseProvider = BaseProvider;