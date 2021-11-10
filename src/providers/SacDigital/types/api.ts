export interface SacDigitalOptions {
  token?: string;
  clientId: string;
  clientSecret: string;
  timeout?: number;
  baseURL?: string;
  debug?: boolean;
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
