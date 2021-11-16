"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SacDigital = void 0;

var _camelcaseKeys = _interopRequireDefault(require("camelcase-keys"));

var _validUrl = require("valid-url");

var _string = require("../../helpers/string");

var _BaseProvider = require("../BaseProvider");

var _constants = require("./constants");

var _dto = require("./dto");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultScopes = ['edit', 'write', 'import', 'remove', 'send', 'contact', 'channel', 'department', 'group', 'tag', 'operator', 'protocol', 'notification', 'manager'];
/**
 * Class to interact with SacDigital server
 * - https://sac.digital/
 * @see https://alertrack.docs.apiary.io/#introduction
 */

class SacDigital extends _BaseProvider.BaseProvider {
  constructor(options) {
    super({
      loggingPrefix: 'SacDigital',
      baseURL: _constants.baseURL,
      timeout: 10000,
      debug: false,
      maxMinutes: 1440,
      ...options
    });
    this.config = {
      scopes: [...defaultScopes],
      token: '',
      ...options
    };
    this.authenticating = false;
    this.allowedExt = {
      file: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pps'],
      image: ['jpg', 'jpeg', 'png', 'gif'],
      sound: ['mp3'],
      video: ['mp4']
    };
    this.init().then(() => this.log('INIT'));
  }

  async authorize() {
    try {
      this.authenticating = true;
      const response = await this.Api.post('auth2/login', {
        client: this.config.clientId,
        password: this.config.clientSecret,
        scopes: this.config.scopes
      }, {
        timeout: this.config.timeout
      });
      this.authenticating = false;
      return response && response !== null && response !== void 0 && response.data ? (0, _camelcaseKeys.default)(response.data) : null;
    } catch {
      this.authenticating = false;
      return null;
    }
  }

  isValidPayload(url, type) {
    const extension = url && (0, _string.extractExtension)(url);
    return !!((0, _validUrl.isWebUri)(url) && (0, _string.isValidExt)(extension, this.allowedExt, type));
  }

  isExpiredToken() {
    var _this$config;

    return (0, _string.isExpiredToken)((_this$config = this.config) === null || _this$config === void 0 ? void 0 : _this$config.tokenExpireDate, this.config.maxMinutes);
  }

  async init() {
    var _this$config2;

    if (!this.config.token) {
      const auth = await this.authorize();

      if (auth && auth.token) {
        const tokenExpireDate = (0, _string.formatTokenExp)(auth === null || auth === void 0 ? void 0 : auth.expiresIn);
        this.config.token = auth.token;
        this.config.tokenExpireDate = tokenExpireDate;
        this.setApiToken({
          token: auth.token,
          expires: auth.expiresIn,
          tokenExpireDate
        });
      }
    } else if ((_this$config2 = this.config) !== null && _this$config2 !== void 0 && _this$config2.tokenExpireDate) {
      if (this.isExpiredToken()) {
        this.config.token = '';
        return this.init();
      }
    } else {
      this.setApiToken(this.config.token);
    }

    if (this.config.token) {
      return this.configureAxios(this.config.token);
    }

    throw new TypeError('not authorized');
  }

  async waitForAuthentication() {
    const check = () => Boolean(this.authenticating);

    const waitFlag = cb => {
      if (check()) setTimeout(() => waitFlag(cb), 10);else cb(true);
    };

    return new Promise(resolve => waitFlag(resolve));
  }

  async isReady(force) {
    if (this.isExpiredToken()) {
      await this.init();
    } else {
      if (!!this.authenticating) await this.waitForAuthentication();else if (force) await this.init();
    }

    return !!this.config.token;
  }

  async apiPost(route, payload, config = {}) {
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

  async apiGet(route, query, config = {}) {
    const ready = await this.isReady();

    if (ready) {
      const source = this.getCancelToken();
      const cancelToken = source.token;
      this.addCancelSource(source);
      const queryRoute = query ? `${route}?${(0, _string.querystring)(query)}` : route;
      const result = await this.Api.get(queryRoute, {
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
    if (!(payload !== null && payload !== void 0 && payload.contact)) return this.buildError('no contact informed');

    try {
      const res = await this.apiPost(_constants.ReqType.NOTIFICATION, payload);
      return (0, _dto.responseSendingDto)(res);
    } catch (error) {
      this.log('\n\n', 'ERROR AQUI', error, '\n\n');
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

  async getServiceSector() {
    const res = await this.apiGet(_constants.ReqType.DEPARTMENT);
    return (0, _dto.responseDepartmentsDto)(res);
  }

  async getContacts(filter) {
    const query = (0, _dto.queryContactFilterDto)(filter);
    const res = await this.apiGet(_constants.ReqType.GETCONTACT, query);
    return (0, _dto.responseContactsDto)(res);
  }

  async getAttendant() {
    const res = await this.apiGet(_constants.ReqType.GETATTENDANT);
    return (0, _dto.responseAttendantsDto)(res);
  }

}

exports.SacDigital = SacDigital;