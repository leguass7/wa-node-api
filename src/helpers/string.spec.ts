import { replaceAll, extractExtension, isValidExt, querystring, extractJSON } from './string';

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

  test('should test querystring', () => {
    const expectedObject = { testOne: '1', testTwo: '2', empty: '' };
    const expectedString = 'testOne=1&testTwo=2&empty=';
    expect(querystring(expectedString)).toEqual(expectedObject);
    expect(querystring(expectedObject)).toEqual(expectedString);
  });

  test('should test extractJSON', () => {
    const obj = { foo: 'bar', xxx: '} me[ow]' };
    const str =
      'blah blah { not {json but here is json: ' +
      JSON.stringify(obj) +
      ' and here we have stuff that is } really } not ] json }} at all';

    const result = extractJSON(str);
    expect(JSON.stringify(result[0]) == JSON.stringify(obj)).toEqual(true);

    const str1 = `{"status":true,"notification_id":"a6RAra","message":"Mensagem encaminhada com sucesso"}<html> 
    <head><title>404 Not Found</title></head> 
    <body bgcolor="white"> 
    <center><h1>404 Not Found</h1></center> 
    <hr><center>nginx/1.14.1</center> 
    </body> 
    </html>`;

    const [expected1] = extractJSON(str1);
    expect(expected1).toEqual(expect.objectContaining({ status: true, notification_id: 'a6RAra' }));

    const str3 = `<head><title>404 Not Found</title></head> 
    <body bgcolor="white"> 
    <center><h1>404 Not Found</h1></center> 
    <hr><center>nginx/1.14.1</center> 
    </body> 
    </html>`;
    expect(extractJSON(str3).length).toEqual(0);

    expect(extractJSON('').length).toEqual(0);
  });
});
