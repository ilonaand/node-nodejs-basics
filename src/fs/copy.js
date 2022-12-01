import { cp } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import { checkFileExists } from './utils.js';

const copy = async () => {
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);
   const dirSrc = path.join(__dirname, 'files');
   const dirDest = path.join(__dirname, 'files_copy');

   const check = await checkFileExists(dirSrc);
   if (!check) {
      throw new Error('FS operation failed');
   }

   const checkDest = await checkFileExists(dirDest);
   if (checkDest) {
      throw new Error('FS operation failed');
   }

   try {
     await cp(dirSrc, dirDest, { recursive: true });
   } catch  {
     throw new Error('FS operation failed');
   }
};

copy();