import  process from 'process';

import { Transform } from 'stream';

const transform = async () => {
  
    const readStream = process.stdin;
    const writeStrean = process.stdout;
    
    const revers = new Transform({
      transform(chunk, encoding, callback) {
        const result = chunk.toString().split('').reverse().join('');
        this.push(result)
        callback();
      },
    });
    
    readStream.pipe(revers).pipe(writeStrean); 
};

await transform();