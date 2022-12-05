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
    
    const data = [];
    streamRead.on('readable', () => {
        let chunk;
        while (null !== (chunk = streamRead.read())){
            data.push(chunk);
          };
    });

    streamRead.on('end', () => {
        process.stdout.write(data.join('').toString());
    });

    streamRead.on("error", err => {
        console.error(err);
        process.exit(1);
    });
};

await read();