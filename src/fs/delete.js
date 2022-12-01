import { unlink } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fileName = path.join(__dirname, 'files/fileToRemove.txt')
  try {
    await unlink(fileName);
  } catch  {
    throw new Error('FS operation failed');
  }
}

await remove();