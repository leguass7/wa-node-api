"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SacDigital = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _camelcaseKeys = _interopRequireDefault(require("camelcase-keys"));

var _validUrl = require("valid-url");

var _decamelcase = _interopRequireDefault(require("../../helpers/decamelcase"));

var _onResponseError = require("../../helpers/onResponseError");

var _string = require("../../helpers/string");

var _constants = require("./constants");

var _dto = require("./dto");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Class to interact with SacDigital server
 * - https://sac.digital/
 * @see https://alertrack.docs.apiary.io/#introduction
 */
class SacDigital {
  constructor(options) {
    this.config = {
      token: '',
      timeout: 10000,
      debug: false,
      baseURL: _constants.baseURL,
      ...options
    };
    this.authenticating = false;
    this.loggingPrefix = 'SacDigital';
    this.Api = _axios.default.create({
      baseURL: _constants.baseURL
    });
    this.cancelSources = [];
    this.allowedExt = {
      file: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pps'],
      image: ['jpg', 'jpeg', 'png', 'gif'],
      sound: ['mp3'],
      video: ['mp4']
    };
    if (!this.config.token) this.init().then(() => this.log('INIT'));
  }

  log(...args) {
    if (this.config.debug) {
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
    return this;
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
    return this;
  }

  async authorize() {
    try {
      this.authenticating = true;
      const response = await this.Api.post('auth2/login', {
        client: this.config.clientId,
        password: this.config.clientSecret,
        scopes: ['manager', 'send', 'contact', 'import', 'notification']
      }, {
        timeout: this.config.timeout
      });
      this.authenticating = false;
      return response && response.data;
    } catch (error) {
      this.authenticating = false;
      return null;
    }
  }

  configureRequests() {
    const token = `Bearer ${this.config.token}`;
    this.Api.interceptors.request.use(config => {
      config.headers['user-agent'] = `wa-node-api/1.0 (+https://github.com/leguass7/wa-node-api.git)`;
      if (token) config.headers['authorization'] = token;
      config.data = (0, _decamelcase.default)(config.data);
      this.log('REQUEST:', config.data);
      return config;
    });
    return this;
  }

  configureResponses() {
    this.Api.interceptors.response.use(response => {
      this.log('RESPONSE:', response.data || response);
      return (0, _camelcaseKeys.default)(response.data, {
        deep: true
      });
    }, _onResponseError.onResponseError);
    return this;
  }

  configureAxios() {
    this.Api = _axios.default.create({
      baseURL: this.config.baseURL
    });
    return this.configureRequests().configureResponses();
  }

  isValidPayload(url, type) {
    const extension = url && (0, _string.extractExtension)(url);
    return !!((0, _validUrl.isWebUri)(url) && (0, _string.isValidExt)(extension, this.allowedExt, type));
  }

  async init() {
    const auth = await this.authorize();
    if (auth && auth.token) this.config.token = auth.token;
    return this.configureAxios();
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
    return this;
  }

  async waitAuth() {
    const check = () => Boolean(this.authenticating);

    const waitFlag = cb => {
      if (check()) setTimeout(() => waitFlag(cb), 10);else cb(true);
    };

    return new Promise(resolve => waitFlag(resolve));
  }

  async isReady(force) {
    if (!!this.authenticating) await this.waitAuth();else if (force) await this.init();
    return !!this.config.token;
  }

  async apiPost(route, payload = {}, config = {}) {
    const ready = await this.isReady();

    if (ready) {
      const source = this.getCancelToken();
      const cancelToken = source.token;
      this.addCancelSource(source);
      const result = await this.Api.post(route, payload, {
        timeout: this.config.timeout,
        cancelToken,
        ...config
      });
      this.removeCancelSource(cancelToken);
      return result;
    }

    return this.buildError('API is not ready');
  }

  async sendNotification(payload) {
    try {
      const res = await this.apiPost(_constants.ReqType.NOTIFICATION, payload);
      return (0, _dto.responseSendingDto)(res);
    } catch (error) {
      return this.buildError('unexpected error');
    }
  }

  async sendText(contactId, text) {
    const contact = (0, _dto.forWhoFilterDto)(contactId);

    if (contact && text) {
      const payload = {
        contact,
        type: 'text',
        text
      };
      const res = await this.sendNotification(payload);
      return res;
    }

    return this.buildError('invalid payload');
  }

  async sendImage(contactId, urlImage, text) {
    const contact = (0, _dto.forWhoFilterDto)(contactId);

    if (contact && this.isValidPayload(urlImage, 'image')) {
      const payload = {
        contact,
        type: 'image',
        url: urlImage
      };
      if (text) payload.text = text;
      const res = await this.sendNotification(payload);
      return res;
    }

    return this.buildError('invalid payload');
  }

  async sendFile(contactId, urlFile) {
    const contact = (0, _dto.forWhoFilterDto)(contactId);

    if (contact && this.isValidPayload(urlFile, 'file')) {
      const payload = {
        contact,
        type: 'file',
        url: urlFile
      };
      const res = await this.sendNotification(payload);
      return res;
    }

    return this.buildError('invalid payload');
  }

  async sendSound(contactId, urlSound) {
    const contact = (0, _dto.forWhoFilterDto)(contactId);

    if (contact && this.isValidPayload(urlSound, 'sound')) {
      const payload = {
        contact,
        type: 'audio',
        url: urlSound
      };
      const res = await this.sendNotification(payload);
      return res;
    }

    return this.buildError('invalid payload');
  }

  async sendVideo(contactId, urlVideo) {
    const contact = (0, _dto.forWhoFilterDto)(contactId);

    if (contact && this.isValidPayload(urlVideo, 'video')) {
      const payload = {
        contact,
        type: 'video',
        url: urlVideo
      };
      const res = await this.sendNotification(payload);
      return res;
    }

    return this.buildError('invalid payload');
  }

}

exports.SacDigital = SacDigital;