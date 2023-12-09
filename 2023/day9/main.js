const fs = require('fs');


fs.readFile('./input', 'utf8',(err, data) => {
 const fData =  data.toString().trim().split('\n')
   .map(line => line.split(' ').map(n => parseInt(n)));
 const result = fData.reduce((acc, values) =>{
   const value = values[values.length - 1]
   acc += c([[value]], values);
   return acc;
 },0)
  console.log(result)
});

function c(deepValues, values, round = 2){
  const length = values.length - round;
  deepValues[0].unshift(values[length]);

  deepValues = deepValues.reduce((acc, dv, i) => {
    const r = dv[1] - dv[0];
    if(acc[i + 1]) {
      acc[i + 1] = [r, ...acc[i + 1]]
    }else {
      acc[i +1] = [r]
    }
    return acc;
  }, deepValues);
  if(deepValues[deepValues.length -1][0] === 0) {
    return p(values, deepValues.length);
  }
  round++
  return c(deepValues, values, round)
}

function p(values, round) {
  values.splice(round);
  const deepsValues = [values]
  for (let i = 0; i < round; i++) {
    const nextValues = deepsValues[i].reduce((acc, v, j) => {
      if(deepsValues[i][j + 1] !== undefined) {
        acc.push(deepsValues[i][j + 1] - v)
      }
      return acc
    }, []);
    if(nextValues.length) deepsValues.push(nextValues)
  }
  return deepsValues
    .map(([v]) => v)
    .reverse()
    .reduce((acc, v) => {
    return v - acc
  }, 0)
}
