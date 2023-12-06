const fs = require('fs');


fs.readFile('./input', 'utf8',(err, data) => {
  const input = data.toString().trim().split('\n')
    .map(inp => inp.substring(inp.indexOf(':') + 1, inp.length)
      .split(' ')
      .filter(n => n.trim() !== '')
      .map(n => parseInt(n))
    )
  const timesByDistance = input[0].map((n, i) => {
    return {
      t:n,
      d:input[1][i]
    }
  });
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
