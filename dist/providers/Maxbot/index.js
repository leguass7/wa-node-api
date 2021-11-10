"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Maxbot = void 0;

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
 * Class to interact with maxbot server
 * @see https://mbr.maxbot.com.br/doc-api-v1.php
 */
class Maxbot {
  constructor(options) {
    this.config = {
      token: '',
      timeout: 5000,
      baseURL: _constants.baseURL,
      debug: false,
      ...options
    };
    this.ready = false;
    this.loggingPrefix = 'Maxbot';
    this.Api = _axios.default.create();
    this.cancelSources = [];
    this.allowedExt = {
      file: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pps'],
      image: ['jpg', 'jpeg', 'png', 'gif'],
      sound: ['mp3'],
      video: []
    };
    return this.configureAxios();
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

  configureRequests() {
    this.Api.interceptors.request.use(config => {
      config.headers['user-agent'] = `wa-node-api/1.0 (+https://github.com/leguass7/wa-node-api.git)`;
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
    return !!((0, _validUrl.isWebUri)(url) && (0, _string.isValidExt)(extension, this.allowedExt, type)) ? {
      extension,
      url
    } : null;
  }

  async apiPost(type, payload = {}) {
    const source = this.getCancelToken();
    const cancelToken = source.token;
    this.addCancelSource(source);
    const result = await this.Api.post(null, {
      cmd: type,
      token: this.config.token,
      ...payload
    }, {
      timeout: this.config.timeout,
      cancelToken
    });
    this.removeCancelSource(cancelToken);
    return result;
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

  async getStatus() {
    const res = await this.apiPost(_constants.ReqType.GETSTATUS);
    return res;
  }

  async isReady(force) {
    if (!this.config.token) return false;

    const check = async () => {
      try {
        const result = await this.getStatus();
        return !!(result && result.status);
      } catch (error) {
        return false;
      }
    };

    if (!!force || !this.ready) this.ready = await check();
    return !!this.ready;
  }

  async sendText(whatsapp, text) {
    const filter = (0, _dto.forWhoFilterDto)(whatsapp);

    if (filter && text) {
      const payload = { ...filter,
        msg: text
      };
      const res = await this.apiPost(_constants.ReqType.SENDTEXT, payload);
      return (0, _dto.responseSendingDto)(res);
    }

    return this.buildError('invalid payload');
  }

  async sendImage(whatsapp, urlImage, _text) {
    const filter = (0, _dto.forWhoFilterDto)(whatsapp);
    const validPayload = this.isValidPayload(urlImage, 'image');

    if (filter && validPayload) {
      const payload = { ...filter,
        imageUrl: urlImage,
        imageExtension: validPayload.extension
      };
      const res = await this.apiPost(_constants.ReqType.SENDIMAGE, payload);
      return (0, _dto.responseSendingDto)(res);
    }

    return this.buildError('invalid payload');
  }

  async sendFile(whatsapp, urlFile) {
    const filter = (0, _dto.forWhoFilterDto)(whatsapp);
    const validPayload = this.isValidPayload(urlFile, 'file');

    if (filter && validPayload) {
      const payload = { ...filter,
        fileUrl: urlFile,
        fileExtension: validPayload.extension
      };
      const res = await this.apiPost(_constants.ReqType.SENDFILE, payload);
      return (0, _dto.responseSendingDto)(res);
    }

    return this.buildError('invalid payload');
  }

  async sendSound(whatsapp, urlSound) {
    const filter = (0, _dto.forWhoFilterDto)(whatsapp);
    const validPayload = this.isValidPayload(urlSound, 'sound');

    if (filter && validPayload) {
      const payload = { ...filter,
        soundUrl: urlSound,
        soundExtension: validPayload.extension
      };
      const res = await this.apiPost(_constants.ReqType.SENDSOUND, payload);
      return (0, _dto.responseSendingDto)(res);
    }

    return this.buildError('invalid payload');
  }

  async sendVideo(whatsapp, urlVideo, _text) {
    const filter = (0, _dto.forWhoFilterDto)(whatsapp);
    const validPayload = this.isValidPayload(urlVideo, 'sound');

    if (filter && validPayload) {
      const payload = { ...filter,
        videoUrl: urlVideo,
        videoExtension: validPayload.extension
      };
      const res = await this.apiPost(_constants.ReqType.SENDSOUND, payload);
      return (0, _dto.responseSendingDto)(res);
    }

    return this.buildError('invalid payload');
  }

}

exports.Maxbot = Maxbot;