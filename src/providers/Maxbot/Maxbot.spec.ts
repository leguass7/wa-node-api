import { Maxbot } from '.';

const env = {
  token: process.env.MAXBOT_TOKEN,
  whatsappTest: process.env.MAXBOT_TEST_WHATSAPP,
  imageTest: process.env.MAXBOT_TEST_IMAGE_URL,
  fileTest: process.env.MAXBOT_TEST_FILE_URL,
  soundTest: process.env.MAXBOT_TEST_SOUND_URL,
  videoTest: process.env.MAXBOT_TEST_VIDEO_URL,
};

describe('Maxbot Test', () => {
  let provider: Maxbot;

  beforeAll(() => {
    provider = new Maxbot({ token: env.token });
  });

  test('Should a class', () => {
    expect(provider).toBeInstanceOf(Maxbot);
    expect(provider.getApiToken()).toHaveProperty('token');
  });

  describe('API delivery test', () => {
    // const apiExpectedSuccess = { status: 1, msg: 'Success' };
    const filterContact = { whatsapp: env.whatsappTest };
    const invalidPayload = { status: false, message: 'invalid payload' };

    test('Should send_text', async () => {
      const response = await provider.sendText(filterContact, 'Hello Word: Teste de mensagem pelo maxbot');
      // expect(response).toEqual(expect.objectContaining(apiExpectedSuccess));
      expect(response).toHaveProperty('message');
      expect(await provider.sendText('', '')).toEqual(expect.objectContaining(invalidPayload));
    });

    test('Should send_image', async () => {
      const response = await provider.sendImage(filterContact, env.imageTest);
      // expect(response).toEqual(expect.objectContaining(apiExpectedSuccess));
      expect(response).toHaveProperty('message');
      expect(await provider.sendImage(filterContact, '')).toEqual(expect.objectContaining(invalidPayload));
    });

    test('Should send_file', async () => {
      const response = await provider.sendFile(filterContact, env.fileTest);
      // expect(response).toEqual(expect.objectContaining(apiExpectedSuccess));
      expect(response).toHaveProperty('message');
      expect(await provider.sendFile(filterContact, '')).toEqual(expect.objectContaining(invalidPayload));
    });

    test('Should send_sound', async () => {
      const response = await provider.sendSound(filterContact, env.soundTest);
      // expect(response).toEqual(expect.objectContaining(apiExpectedSuccess));
      expect(response).toHaveProperty('message');
      expect(await provider.sendSound(filterContact, '')).toEqual(expect.objectContaining(invalidPayload));
    });

    test('Should send a video', async () => {
      const response = await provider.sendVideo(filterContact, env.videoTest);
      expect(response).toEqual(expect.objectContaining(invalidPayload));
      // expect(response).toEqual(expect.objectContaining(apiExpectedSuccess));
      expect(await provider.sendVideo('', '')).toEqual(expect.objectContaining(invalidPayload));
    });
  });

  describe('API requests test', () => {
    const expectedSuccess = { status: 1, msg: 'Success' };

    test('Should ready', async () => {
      const response = await provider.isReady(true);
      expect(response).toEqual(true);
    });

    test('Should receive status', async () => {
      const response = await provider.getStatus();
      expect(response).toEqual(expect.objectContaining(expectedSuccess));
    });

    test('Should receive departments', async () => {
      const response = await provider.getServiceSector();
      expect(response).toEqual(expect.objectContaining(expectedSuccess));
      expect(response).toHaveProperty('departments');
    });

    test('Should receive contacts', async () => {
      const response = await provider.getContact({ whatsapp: env.whatsappTest });
      // expect(response).toEqual(expect.objectContaining(expectedSuccess));
      expect(response).toHaveProperty('contacts');
    });

    test('Should receive attendant', async () => {
      const response = await provider.getAttendant();
      expect(response).toEqual(expect.objectContaining(expectedSuccess));
      expect(response).toHaveProperty('attendants');
    });
  });
});
