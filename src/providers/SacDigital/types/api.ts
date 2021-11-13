import { BaseProviderOptions } from '../../BaseProvider';
import { ScopeType } from '../constants';

export interface SacDigitalOptions extends Partial<BaseProviderOptions> {
  token?: string;
  tokenExpireDate?: string;

  /** check before exipres */
  maxMinutes?: number;
  clientId: string;
  clientSecret: string;
  scopes?: ScopeType[];
}

export interface ISacDigitalResponseAuth {
  success: boolean;
  token: string;
  expiresIn: number;
}

export interface ISacDigitalResponse {
  status: boolean;
  message?: string;
}
