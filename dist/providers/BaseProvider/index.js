"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseProvider = void 0;
const axios_1 = __importDefault(require("axios"));
const camelcase_keys_1 = __importDefault(require("camelcase-keys"));
const decamelcase_1 = __importDefault(require("../../helpers/decamelcase"));
const onResponseError_1 = require("./onResponseError");
class BaseProvider {
    debug;
    loggingPrefix;
    cancelSources;
    Api;
    constructor(options) {
        const { baseURL, timeout, loggingPrefix, debug } = options;
        this.debug = !!debug;
        this.loggingPrefix = loggingPrefix;
        this.cancelSources = [];
        this.Api = axios_1.default.create({ baseURL, timeout });
    }
    log(...args) {
        if (!!this.debug) {
            // eslint-disable-next-line no-console
            console.log(this.loggingPrefix, ...args, '\n');
        }
    }
    buildError(message) {
        return { status: false, message };
    }
    getCancelToken() {
        return axios_1.default.CancelToken.source();
    }
    addCancelSource(source) {
        this.cancelSources.push({ idToken: source.token, source });
    }
    removeCancelSource(idTokenSource) {
        if (idTokenSource) {
            const newList = this.cancelSources.filter(({ idToken }) => idToken !== idTokenSource);
            this.cancelSources = newList || [];
            return this;
        }
        this.cancelSources = [];
    }
    configureResponses() {
        this.Api.interceptors.response.use(response => {
            this.log('RESPONSE:', response.data || response);
            if (response?.data && typeof response?.data === 'string') {
                return (0, camelcase_keys_1.default)((0, onResponseError_1.convertStringResponseData)(response?.data), { deep: true });
            }
            return (0, camelcase_keys_1.default)(response.data, { deep: true });
        }, onResponseError_1.onResponseError);
        return this;
    }
    configureRequests(token) {
        this.Api.interceptors.request.use(config => {
            config.headers = {
                'user-agent': `wa-node-api/1.0 (+https://github.com/leguass7/wa-node-api.git)`,
                'Content-Type': 'application/json',
            };
            if (token)
                config.headers['authorization'] = token;
            config.data = (0, decamelcase_1.default)(config.data);
            this.log('REQUEST:', config.data);
            return config;
        });
        return this;
    }
    configureAxios(token) {
        return this.configureRequests(token).configureResponses();
    }
    setApiToken(token) {
        this.Api.defaults.headers['authorization'] = token;
    }
    /**
     * Cancel all requests to `Maxbot` server
     * @method cancelAll
     */
    cancelAll() {
        this.cancelSources.forEach(({ source }) => source && source.cancel());
        this.removeCancelSource();
    }
}
exports.BaseProvider = BaseProvider;
