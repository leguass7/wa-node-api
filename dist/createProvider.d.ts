import { Maxbot } from './providers/Maxbot';
import { MaxbotOptions } from './providers/Maxbot/types/api';
import { SacDigital } from './providers/SacDigital';
import { SacDigitalOptions } from './providers/SacDigital/types/api';
interface Provider {
    maxbot: Maxbot;
    sacdigital: SacDigital;
}
export declare type ProviderType = keyof Provider;
/**
 * Factory of new provider
 * @function createProvider
 */
export declare function createProvider(provider: 'maxbot', options: MaxbotOptions): Maxbot;
export declare function createProvider(provider: 'sacdigital', options: SacDigitalOptions): SacDigital;
/**
 * Factory of new Maxbot provider
 * @function createMaxbotProvider
 */
export declare function createMaxbotProvider(options: MaxbotOptions): Maxbot;
/**
 * Factory of new SacDigital provider
 * @function createSacDigitalProvider
 */
export declare function createSacDigitalProvider(options: SacDigitalOptions): SacDigital;
export {};
