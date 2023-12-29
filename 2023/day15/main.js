const fs = require('fs');
const _ = require("lodash");

fs.readFile('./input', 'utf8',(err, data) => {
  const fData = data.toString().trim().split(',')
  const result = fData.reduce((acc, code) => {
    return acc + computeCode(code)
  },0)

  console.log(result)
});

function computeCode(code) {
  let result = 0;
  for (let i = 0; i < code.length; i++) {
    result = (result + code.charCodeAt(i)) * 17 % 256
  }
  console.log({code, result})
  return result
}
