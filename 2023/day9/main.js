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
    return computeNextStep(deepValues)
  }
  round++
  return c(deepValues, values, round)
}

function computeNextStep(deepValues) {
  return deepValues.reverse().reduce((acc, values) => {
    acc += values[values.length - 1]
    return acc
  },0)
}
