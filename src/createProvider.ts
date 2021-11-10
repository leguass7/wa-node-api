import { Maxbot } from './providers/Maxbot';
import { MaxbotOptions } from './providers/Maxbot/types/api';
import { SacDigital } from './providers/SacDigital';
import { SacDigitalOptions } from './providers/SacDigital/types/api';

interface Provider {
  maxbot: Maxbot;
  sacdigital: SacDigital;
}

type ProviderType = keyof Provider;

/**
 * Factory of new provider
 * @function createProvider
 */
export function createProvider(provider: 'maxbot', options: MaxbotOptions): Maxbot;
export function createProvider(provider: 'sacdigital', options: SacDigitalOptions): SacDigital;
export function createProvider(provider: ProviderType, options: any) {
  if (provider === 'maxbot') return new Maxbot(options);
  if (provider === 'sacdigital') return new SacDigital(options);
  throw new TypeError('undefined provider');
}
