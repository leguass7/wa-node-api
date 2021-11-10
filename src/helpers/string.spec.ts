import { replaceAll, extractExtension, isValidExt } from './string';

const urls = [
  'http://whatsapp.sac.digital/_midia/galeria/27F7F3DF9C/imagem/5824d4f759bb0.jpg',
  'http://whatsapp.sac.digital/_midia/galeria/ABF47AD9CO/video/3747b6fe67153aea5f7ebcd8b5b6e6085a097c25478be.mp4',
];

const allowedExt = {
  file: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pps'],
  image: ['jpg', 'jpeg', 'png', 'gif'],
  sound: ['mp3'],
  video: ['mp4'],
};

describe('Helpers string Test', () => {
  test('should test replaceAll', () => {
    expect(replaceAll('primeiro segundo', ' ')).toEqual('primeiro,segundo');
    expect(replaceAll('primeiro segundo', ' ', '')).toEqual('primeirosegundo');
    expect(replaceAll('primeiro segundo', [' ', 'e'], '')).toEqual('primirosgundo');
    expect(replaceAll('')).toEqual('');
  });

  test('should test extractExtension', () => {
    expect(extractExtension(urls[0])).toEqual('jpg');
    expect(extractExtension(urls[1])).toEqual('mp4');
  });

  test('should test isValidExt', () => {
    const jpg = extractExtension(urls[0]);
    const mp4 = extractExtension(urls[1]);
    expect(isValidExt(jpg, allowedExt, 'image')).toEqual(true);
    expect(isValidExt(mp4, allowedExt, 'video')).toEqual(true);
    expect(isValidExt(mp4, allowedExt)).toEqual(true);
    expect(isValidExt('mkv', allowedExt)).toEqual(false);
  });
});
