import path from 'path';

import { fileURLToPath } from 'url';

import { spawn } from 'child_process';

const spawnChildProcess = async (args) => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const  scriptFile = path.join(__dirname, 'files/script.js');
    const chProcess = spawn('node', [scriptFile, ... args.split(' ')]);
  
    process.stdin.on('data', (chunk) => chProcess.stdin.write(chunk));

    chProcess.stdout.on('data', (message) => console.log(message.toString()));
    
};

spawnChildProcess('--arg1 value1 -arg2 value2');