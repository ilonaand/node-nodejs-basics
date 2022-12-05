import  process from 'process';

import { Transform, pipeline } from 'stream';

import { EOL } from 'os';

const transform = async () => {
  
    const readStream = process.stdin;
    const writeStream = process.stdout;
    
    const revers = new Transform({
      transform(chunk, encoding, callback) {

        const chunkStr = chunk.toString().replace(EOL, '');

        const result = chunkStr.split('').reverse().join('') + EOL;

        callback(null, result);

      },
    });
    
    pipeline(
      readStream,
      revers,
      writeStream,
      (err) => console.error('Pipeline failed', err));
};

await transform();