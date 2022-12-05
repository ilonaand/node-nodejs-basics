import { rename as fsRename } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fileSrc = path.join(__dirname, 'files/wrongFilename.txt');
  const fileDest = path.join(__dirname, 'files/properFilename.md');
  try {
    await fsRename(fileSrc, fileDest);
  } catch  {
    throw new Error('FS operation failed');
  }
};

await rename();