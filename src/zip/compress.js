import { pipeline } from 'stream';

import { createReadStream, createWriteStream } from 'fs';

import zlib  from 'zlib';

import path from 'path';

import { fileURLToPath } from 'url';

import { checkFileExists } from '../utils.js';



const compress = async () => {

  const __filename = fileURLToPath(import.meta.url);

  const __dirname = path.dirname(__filename);

  const fileName = path.join(__dirname,'files/fileToCompress.txt');

  const check = await checkFileExists(fileName);

  if (!check) {
    throw new Error(`FS operation failed: file ${fileName} not exists`);
 }

  const archive = path.join(__dirname,'files/archive.gz'); 

  const streamRead = createReadStream(fileName, {encoding: 'utf8'});

  const streamWrite = createWriteStream(archive);

  pipeline(
    streamRead,
    zlib.createGzip(),
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

await compress();


