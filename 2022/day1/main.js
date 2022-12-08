const fs = require('fs');

fs.readFile('./input', 'utf8',(err, data) => {
 const inputs = data.toString().split('\n');
 const result = []
 inputs.reduce((acc, val) => {
   if(val === '') {
    result.push(computeResult(acc));
     return []
   }
   acc.push(val);
   return acc
 }, []);
 const sortedResult = result.sort((a, b)=> b - a);
 const max = sortedResult[0] + sortedResult[1] + sortedResult[2]
 console.log(max)
});

function computeResult(results) {
  let total = 0;
  results.forEach(cal => total += parseInt(cal));
  return total;
}


