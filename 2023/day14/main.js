const fs = require('fs');

fs.readFile('./input', 'utf8',(err, data) => {
  const fData = data.toString().trim().split('\n')
    .map(l=> l.split(''))
  const rowLength = fData[0].length;
  let result = 0
  for (let i = 0; i < rowLength; i++) {
    result += compute(i, fData)
  }

  console.log(result)
});

function compute(index, data) {
  let size = data.length + 1;
  let result = 0;
  data.forEach((line, i) => {
    const element = line[index];
    if(element === 'O') {
      size--
      result += size;
    }
    if(element === '#') {
      size = data.length - i
    }
  })
  return result;
}