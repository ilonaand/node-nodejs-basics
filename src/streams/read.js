import { createReadStream } from 'fs';

import path from 'path';

import { fileURLToPath } from 'url';

import  process from 'process';

import { checkFileExists } from '../utils.js';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileName = path.join(__dirname,'files/FileToRead.txt');

    const check = await checkFileExists(fileName);

    if (!check) {
       throw new Error(`FS operation failed: file ${fileName} not exists`);
    }

    const streamRead = createReadStream(fileName, {encoding: 'utf8'});

    const readableToString = async (readable) => {
        let data = [];
        for await (const chunk of readable) {
            data.push(chunk);
        }
        return data.join('');
      }
  
    try {
      const result = await readableToString(streamRead);
      process.stdout.write(result.toString());
    } catch (err) {
        console.error(err);
    }  

};

await read();