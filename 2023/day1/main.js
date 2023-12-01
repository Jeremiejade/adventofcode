const fs = require('fs');

fs.readFile('./input', 'utf8',(err, data) => {
const r = data.toString().split('\n')
  .reduce((acc, line) => {
    const lol =  line.split('')
      .reduce((acc, letter) => {
        if (parseInt(letter)) {
          acc.push(parseInt(letter))
        }
        return acc
      },[])
    console.log('lol', lol)
    if(lol.length)  acc += lol[0]*10+lol[lol.length-1];

    return acc
  },0)
  console.log(r)
});
