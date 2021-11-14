import { createProvider, IProvider, Maxbot, SacDigital } from '.';

const env = {
  tokenMaxbot: process.env.MAXBOT_TOKEN,
  tokenSacDigital: process.env.SACDIGITAL_TEST_TOKEN,

  whatsappTest: process.env.MAXBOT_TEST_WHATSAPP,
  clientId: process.env.SACDIGITAL_ID,
  clientSecret: process.env.SACDIGITAL_SECRET,
};

describe('SacDigital Test', () => {
  let provider: SacDigital | Maxbot | IProvider;
  jest.setTimeout(10000);

  afterAll(async () => {
    provider.cancelAll();
    provider = null;
    await new Promise(resolve => setTimeout(() => resolve(true), 5000)); // avoid jest open handle error
  });

  test('Should create maxbot provider', async () => {
    provider = createProvider('maxbot', { token: env.tokenMaxbot, debug: true });
    expect(provider).toBeInstanceOf(Maxbot);
  });

  test('Should create sacdigital provider', async () => {
    provider = createProvider('sacdigital', {
      clientId: env.clientId,
      clientSecret: env.clientSecret,
      // token: env.tokenSacDigital,
    });
    await provider.isReady(true);

    expect(provider).toBeInstanceOf(SacDigital);
  });

  test('Should generate an error', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => createProvider('any')).toThrow(TypeError);
  });
});
