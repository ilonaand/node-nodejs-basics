import { writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fileName = path.join(__dirname,'files/fresh.txt');
  
  try {
    await writeFile(fileName, 'I am fresh and young', { encoding: 'utf8', flag:  'wx' });
  } catch  {
    throw new Error('FS operation failed');
  }
};

await create();