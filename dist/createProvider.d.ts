import { Maxbot } from './providers/Maxbot';
import { MaxbotOptions } from './providers/Maxbot/types/api';
import { SacDigital } from './providers/SacDigital';
import { SacDigitalOptions } from './providers/SacDigital/types/api';
/**
 * Factory of new provider
 * @function createProvider
 */
export declare function createProvider(provider: 'maxbot', options: MaxbotOptions): Maxbot;
export declare function createProvider(provider: 'sacdigital', options: SacDigitalOptions): SacDigital;
