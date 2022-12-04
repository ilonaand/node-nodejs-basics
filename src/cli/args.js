
import  process  from 'process';
const parseArgs = () => {
  const flagArray = process.argv.slice(2);
  let arr = [];
  for (let i = 0; i < flagArray.length; i = i + 2) {
    arr = [...arr, `${flagArray[i].replace('--', '')} is ${flagArray[i + 1]}`] ;
  }
  console.log(arr.join(', '));
};

parseArgs();