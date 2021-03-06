"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseURL = exports.ReqType = void 0;
let ReqType;
exports.ReqType = ReqType;

(function (ReqType) {
  ReqType["GETSTATUS"] = "get_status";
  ReqType["GETSEGMENTATION"] = "get_segmentation";
  ReqType["GETTEMPLATE"] = "get_template";
  ReqType["GETSERVICESECTOR"] = "get_service_sector";
  ReqType["GETATTENDANT"] = "get_attendant";
  ReqType["GETCONTACT"] = "get_contact";
  ReqType["GETPROT"] = "get_prot";
  ReqType["PUTCONTACT"] = "put_contact";
  ReqType["SETCONTACT"] = "set_contact";
  ReqType["OPENFOLLOWUP"] = "open_followup";
  ReqType["SENDTEXT"] = "send_text";
  ReqType["SENDIMAGE"] = "send_image";
  ReqType["SENDFILE"] = "send_file";
  ReqType["SENDSOUND"] = "send_sound";
  ReqType["SENDVIDEO"] = "send_video";
})(ReqType || (exports.ReqType = ReqType = {}));

const baseURL = 'https://mbr.maxbot.com.br/api/v1.php';
exports.baseURL = baseURL;