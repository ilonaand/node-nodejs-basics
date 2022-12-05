import { _readDir } from '../utils.js'
import { fileURLToPath } from 'url';
import path from 'path';

const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const dirName = path.join(__dirname, 'files');

  const files = await _readDir(dirName);
  for (const file of files) {
    console.log(file);
  }
};

await list();