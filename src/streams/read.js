import { createReadStream } from 'fs';

import path from 'path';

import { fileURLToPath } from 'url';

import  process from 'process';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);

    const __dirname = path.dirname(__filename);

    const fileName = path.join(__dirname,'files/FileToRead.txt');
    
    const streamRead = createReadStream(fileName, {encoding: 'utf8'});
    
    let data = '';
    streamRead.on('readable', () => {
        let chunk = streamRead.read();
        if (chunk !== null) data += chunk;
    });

    streamRead.on('end', () => {
        process.stdout.write(data.toString());
    });

    streamRead.on("error", err => {
        console.error(err);
        process.exit(1);
    });
};

await read();