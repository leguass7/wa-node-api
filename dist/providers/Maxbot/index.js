"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Maxbot = void 0;

var _validUrl = require("valid-url");

var _string = require("../../helpers/string");

var _BaseProvider = require("../BaseProvider");

var _constants = require("./constants");

var _dto = require("./dto");

/**
 * Class to interact with maxbot server
 * @see https://mbr.maxbot.com.br/doc-api-v1.php
 */
class Maxbot extends _BaseProvider.BaseProvider {
  constructor(options) {
    super({
      loggingPrefix: 'Maxbot',
      baseURL: _constants.baseURL,
      timeout: 10000,
      debug: false,
      ...options
    });
    this.config = {
      token: '',
      timeout: 5000,
      baseURL: _constants.baseURL,
      debug: false,
      ...options
    };
    this.ready = false;
    this.allowedExt = {
      file: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pps'],
      image: ['jpg', 'jpeg', 'png', 'gif'],
      sound: ['mp3'],
      video: []
    };
    this.setApiToken(this.config.token);
    return this.configureAxios();
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
    const validPayload = this.isValidPayload(urlVideo, 'video');

    if (filter && validPayload) {
      const payload = { ...filter,
        videoUrl: urlVideo,
        videoExtension: validPayload.extension
      };
      const res = await this.apiPost(_constants.ReqType.SENDVIDEO, payload);
      return (0, _dto.responseSendingDto)(res);
    }

    return this.buildError('invalid payload');
  }

  async getServiceSector() {
    const res = await this.apiPost(_constants.ReqType.GETSERVICESECTOR);
    return (0, _dto.responseServiceSectorDto)(res);
  }

  async getContacts(filter) {
    const res = await this.apiPost(_constants.ReqType.GETCONTACT, filter);
    return (0, _dto.responseContactsDto)(res);
  }

  async getAttendant() {
    const res = await this.apiPost(_constants.ReqType.GETATTENDANT);
    return (0, _dto.responseAttendantsDto)(res);
  }

}

exports.Maxbot = Maxbot;