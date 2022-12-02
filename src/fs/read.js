import { readFile } from 'fs/promises';
import { checkFileExists } from '../utils.js';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);
   const fileName = path.join(__dirname,'files/fileToRead.txt');
   const check = await checkFileExists(fileName);

   if (!check) {
      throw new Error(`FS operation failed: file ${fileName} not exists`);
   }
   const textFile = await readFile(fileName, 'utf-8');
   console.log(textFile);
};

await read();