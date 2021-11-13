import axios, { AxiosInstance, CancelToken, CancelTokenSource } from 'axios';
import camelcaseKeys from 'camelcase-keys';

import { decamelcase } from '@helpers/decamelcase';

import { ICancelSource } from './IProvider';
import { onResponseError, IResultError, convertStringResponseData } from './onResponseError';

export { IResultError };

export interface BaseProviderOptions {
  loggingPrefix: string;
  baseURL: string;
  debug?: boolean;
  timeout: number;
}

export interface TokenStore {
  token: string;
  expires?: number;
}

type ApiTokenSetter = string | TokenStore;
export class BaseProvider {
  private tokenStore: TokenStore;
  private debug: boolean;
  private loggingPrefix: string;
  private cancelSources: ICancelSource[];
  public readonly Api: AxiosInstance;

  constructor(options: BaseProviderOptions) {
    const { baseURL, timeout, loggingPrefix, debug } = options;
    this.debug = !!debug;
    this.loggingPrefix = loggingPrefix;
    this.cancelSources = [];
    this.Api = axios.create({ baseURL, timeout });
  }

  protected log(...args: any[]) {
    if (!!this.debug) {
      // eslint-disable-next-line no-console
      console.log(this.loggingPrefix, ...args, '\n');
    }
  }

  protected buildError(message: string): IResultError {
    return { status: false, message };
  }

  protected getCancelToken(): CancelTokenSource {
    return axios.CancelToken.source();
  }

  protected addCancelSource(source: CancelTokenSource) {
    this.cancelSources.push({ idToken: source.token, source });
  }

  protected removeCancelSource(idTokenSource?: string | CancelToken) {
    if (idTokenSource) {
      const newList = this.cancelSources.filter(({ idToken }) => idToken !== idTokenSource);
      this.cancelSources = newList || [];
      return this;
    }
    this.cancelSources = [];
  }

  protected configureResponses() {
    this.Api.interceptors.response.use(response => {
      this.log('RESPONSE:', response.data || response);
      if (response?.data && typeof response?.data === 'string') {
        return camelcaseKeys(convertStringResponseData(response?.data), { deep: true });
      }
      return camelcaseKeys(response.data, { deep: true });
    }, onResponseError);
    return this;
  }

  protected configureRequests(token?: string) {
    this.Api.interceptors.request.use(config => {
      config.headers = {
        'User-Agent': `wa-node-api/v1 (+https://github.com/leguass7/wa-node-api.git) axios/${axios.VERSION}`,
        'Content-Type': 'application/json',
      };

      const sendToken = token || this.tokenStore?.token;
      if (sendToken) config.headers['authorization'] = sendToken;

      config.data = decamelcase(config.data);
      this.log('REQUEST:', config.data);
      return config;
    });
    return this;
  }

  protected configureAxios(token?: string) {
    return this.configureRequests(token).configureResponses();
  }

  public setApiToken(token: ApiTokenSetter) {
    if (typeof token === 'string') {
      this.tokenStore = { token };
    } else {
      this.tokenStore = token;
    }

    this.Api.defaults.headers['authorization'] = this.tokenStore.token;
  }

  public getApiToken(): TokenStore {
    return this.tokenStore;
  }

  /**
   * Cancel all requests to `Maxbot` server
   * @method cancelAll
   */
  public cancelAll() {
    this.cancelSources.forEach(({ source }) => source && source.cancel());
    this.removeCancelSource();
  }
}
