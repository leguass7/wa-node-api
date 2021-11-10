import { Maxbot } from '.';

const env = {
  token: process.env.MAXBOT_TOKEN,
  whatsappTest: process.env.MAXBOT_TEST_WHATSAPP,
  imageTest: process.env.MAXBOT_TEST_IMAGE_URL,
  fileTest: process.env.MAXBOT_TEST_FILE_URL,
  soundTest: process.env.MAXBOT_TEST_SOUND_URL,
};

describe('Maxbot Test', () => {
  let maxbot: Maxbot;

  beforeAll(() => {
    maxbot = new Maxbot({ token: env.token });
  });

  test('Should a class', () => {
    expect(maxbot).toBeInstanceOf(Maxbot);
  });

  describe('Test of Api requests', () => {
    const apiExpectedSuccess = { status: 1, msg: 'Success' };
    const filterContact = { whatsapp: env.whatsappTest };

    test('Should get_status', async () => {
      const apiExpectedSuccess = { status: true, message: 'Success' };
      const response = await maxbot.getStatus();
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess));
    });

    test('Should send_text', async () => {
      const response = await maxbot.sendText(filterContact, 'Hello Word: Teste de mensagem pelo maxbot');
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess));
    });

    test('Should send_image', async () => {
      const response = await maxbot.sendImage(filterContact, env.imageTest);
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess));
    });

    test('Should send_file', async () => {
      const response = await maxbot.sendFile(filterContact, env.fileTest);
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess));
    });

    test('Should send_sound', async () => {
      const response = await maxbot.sendSound(filterContact, env.soundTest);
      expect(response).toEqual(expect.objectContaining(apiExpectedSuccess));
    });
  });
});
