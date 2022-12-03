import { createWriteStream } from 'fs';

import path from 'path';

import { fileURLToPath } from 'url';

import  process from 'process';

import { checkFileExists } from '../utils.js';

const write = async () => {

    const __filename = fileURLToPath(import.meta.url);

    const __dirname = path.dirname(__filename);

    const fileName = path.join(__dirname,'files/fileToWrite.txt');

    const check = await checkFileExists(fileName);

    if (!check) {
       throw new Error(`FS operation failed: file ${fileName} not exists`);
    }

    const readable = process.stdin;

    readable.on("error", err => {
        console.error(err);
        process.exit(1);
      });

    const streamWrite = createWriteStream(fileName, {encoding: 'utf8'});

    readable.pipe(streamWrite, { end: true });
};

await write();