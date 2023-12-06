const fs = require('fs');


fs.readFile('./input', 'utf8',(err, data) => {
  const input = data.toString().trim().split('\n')
    .map(inp => inp.substring(inp.indexOf(':') + 1, inp.length)
      .replaceAll(' ', '')
    )
    .map(n => parseInt(n))
  const timesByDistance =  [{
      t:input[0],
      d:input[1]
    }]
  const r = timesByDistance.reduce((acc, tByD) => {
    const {min, max} = c(tByD)
    return acc*(max-min +1)
  },1)
  console.log(r)
});

function c ({t, d}) {
  let i = 0;
  let max = 0;

  while ((t-i) * i <= d) {
    i++
  }
  const min = i
  while ((t-i) * i > d) {
    max = i;
    i++
  }
  return { min, max }
}
