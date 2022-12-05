import  { Worker } from 'worker_threads';

import { cpus } from 'os';

import path from 'path';

import { fileURLToPath } from 'url';

export const performCalculations = async () => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const cp = cpus();
    let counter = 10;

    const createWorkers = await Promise.allSettled(cp.map(() => 
      new Promise((resolve, reject) => {
        const worker = new Worker(path.join(__dirname, '/worker.js'), { workerData: counter++ });
        worker.on('message', mess => resolve(mess));
        worker.on('error', err => reject(err));
      })
    ));

    const workers =  createWorkers.map(({status, value}) => ({
      'status': status === 'fulfilled' ? 'resolved' : 'error',
      'data': status === 'fulfilled' ? value : null,
      }));
    console.log(workers);
    return  workers;
};

await performCalculations();