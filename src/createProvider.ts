import { IProvider } from '.';
import { Maxbot } from './providers/Maxbot';
import { MaxbotOptions } from './providers/Maxbot/types/api';
import { SacDigital } from './providers/SacDigital';
import { SacDigitalOptions } from './providers/SacDigital/types/api';

interface Provider {
  maxbot: Maxbot;
  sacdigital: SacDigital;
}

export type ProviderType = keyof Provider;

/**
 * Factory of new provider
 * @function createProvider
 */
export function createProvider(provider: 'maxbot', options: MaxbotOptions): Maxbot | IProvider;
export function createProvider(provider: 'sacdigital', options: SacDigitalOptions): SacDigital | IProvider;
export function createProvider(provider: ProviderType, options: MaxbotOptions | SacDigitalOptions): IProvider {
  if (provider === 'maxbot') return new Maxbot(options as MaxbotOptions);
  if (provider === 'sacdigital') return new SacDigital(options as SacDigitalOptions);
  throw new TypeError('undefined provider');
}

/**
 * Factory of new Maxbot provider
 * @function createMaxbotProvider
 */
export function createMaxbotProvider(options: MaxbotOptions): Maxbot {
  return new Maxbot(options);
}

/**
 * Factory of new SacDigital provider
 * @function createSacDigitalProvider
 */
export function createSacDigitalProvider(options: SacDigitalOptions): SacDigital {
  return new SacDigital(options);
}
