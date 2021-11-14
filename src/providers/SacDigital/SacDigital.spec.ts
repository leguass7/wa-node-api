import { SacDigital } from '.';

const env = {
  token: process.env.SACDIGITAL_TEST_TOKEN,
  clientId: process.env.SACDIGITAL_ID,
  clientSecret: process.env.SACDIGITAL_SECRET,
  contatctId: process.env.SACDIGITAL_TEST_CONTACT_ID,
  whastsapp: process.env.SACDIGITAL_TEST_WHATSAPP,

  imageTest: process.env.SACDIGITAL_TEST_IMAGE_URL,
  fileTest: process.env.SACDIGITAL_TEST_FILE_URL,
  soundTest: process.env.SACDIGITAL_TEST_SOUND_URL,
  videoTest: process.env.SACDIGITAL_TEST_VIDEO_URL,
};

describe('SacDigital Test', () => {
  let provider: SacDigital;

  beforeAll(async () => {
    provider = new SacDigital({
      clientId: env.clientId,
      clientSecret: env.clientSecret,
      token: env.token,
      // debug: true,
    });
  });

  afterAll(() => {
    if (provider) {
      provider.cancelAll();
      provider = null;
    }
  });

  test('Should a class', () => {
    expect(provider).toBeInstanceOf(SacDigital);
    expect(provider.getApiToken()).toHaveProperty('token');
  });

  describe('API delivery test', () => {
    const apiExpectedSuccess = { status: true };
    const invalidPayload = { status: false, message: 'invalid payload' };

    test('Should send a text', async () => {
      const response = await provider.sendText(env.contatctId, 'Test Unit: Teste de mensagem pelo SacDigital');
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess));
      expect(await provider.sendText('', '')).toEqual(expect.objectContaining(invalidPayload));
    });

    test('Should send a image', async () => {
      const response = await provider.sendImage(env.contatctId, env.imageTest);
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess));
      expect(await provider.sendImage('', '')).toEqual(expect.objectContaining(invalidPayload));
    });

    test('Should send a file', async () => {
      const response = await provider.sendFile(env.contatctId, env.fileTest);
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess));
      expect(await provider.sendFile('', '')).toEqual(expect.objectContaining(invalidPayload));
    });

    test('Should send a sound', async () => {
      const response = await provider.sendSound(env.contatctId, env.soundTest);
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess));
      expect(await provider.sendSound('', '')).toEqual(expect.objectContaining(invalidPayload));
    });

    test('Should send a video', async () => {
      const response = await provider.sendVideo(env.contatctId, env.videoTest);
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess));
      expect(await provider.sendVideo('', '')).toEqual(expect.objectContaining(invalidPayload));
    });
  });

  describe('API requests test', () => {
    // const expectedSuccess = { status: true };

    test('Should receive departments', async () => {
      const response = await provider.getServiceSector();
      // expect(response).toEqual(expect.objectContaining(expectedSuccess));
      expect(response).toHaveProperty('departments');
    });

    test('Should receive contacts', async () => {
      const response = await provider.getContact({ search: env.whastsapp });
      // expect(response).toEqual(expect.objectContaining(expectedSuccess));
      expect(response).toHaveProperty('contacts');
    });

    test('Should receive attendant', async () => {
      const response = await provider.getAttendant();
      // expect(response).toEqual(expect.objectContaining(expectedSuccess));
      expect(response).toHaveProperty('attendants');
    });
  });
});
