import process from 'process';

const parseEnv = () => {
   const envObj = process.env;
   let arr = [];
   for (const [key, value] of Object.entries(envObj)) {
      if (key.includes('RSS_')) {
         arr = [...arr, `${key}=${value}`];
      }
   }
   console.log(arr.join('; '));
};

parseEnv();