import { IProvider } from '.';
import { Maxbot } from './providers/Maxbot';
import { MaxbotOptions } from './providers/Maxbot/types/api';
import { SacDigital } from './providers/SacDigital';
import { SacDigitalOptions } from './providers/SacDigital/types/api';
export declare type ProviderType = 'maxbot' | 'sacdigital';
/**
 * Factory of new provider
 * @function createProvider
 */
export declare function createProvider(provider: ProviderType, options: MaxbotOptions | SacDigitalOptions): IProvider;
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
