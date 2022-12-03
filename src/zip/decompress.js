import { pipeline } from 'stream';

import { createReadStream, createWriteStream } from 'fs';

import zlib  from 'zlib';

import path from 'path';

import { fileURLToPath } from 'url';

import { checkFileExists } from '../utils.js';

const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url);

  const __dirname = path.dirname(__filename);

  const fileName = path.join(__dirname,'files/fileToCompress.txt');

  const archive = path.join(__dirname,'files/archive.gz'); 

  const streamRead = createReadStream(archive);

  const streamWrite = createWriteStream(fileName);

  const check = await checkFileExists(archive);

  if (!check) {
    throw new Error(`FS operation failed: file ${archive} not exists`);
 }

  pipeline(
    streamRead,
    zlib.createUnzip(),
    streamWrite,
    (err) => {
      if (err) {
        console.error('Pipeline failed', err);
      } else {
        console.log('Pipeline succeeded');
      }
    }
  );
};

await decompress();