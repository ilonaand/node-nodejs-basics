import { access, readdir, stat } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

export const checkFileExists = async (path)  => {
  try {
    await access(path, constants.R_OK | constants.W_OK);
    return true;
  } catch {
    return false;
  }
};

export const _readDir = async (root) => {
  try {
    const subDirs = await readdir(root);
    const files = await Promise.all(
      subDirs.map(async (subDir) => {
        const res = path.join(root, subDir);
        return (await stat(res)).isDirectory() ? _readDir(res) : res;
      }),
    );
    return files.flat();
  } catch  {
    throw new Error('FS operation failed');
  }
};