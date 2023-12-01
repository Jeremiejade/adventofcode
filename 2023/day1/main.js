const fs = require('fs');

const chiffre = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

fs.readFile('./input', 'utf8',(err, data) => {
const r = data.toString().split('\n')
  .reduce((acc, line) => {
    let memo = {}
    chiffre.forEach((c,i) => {
      memo = {
        ...memo,
        ...letterToNumber(line, c, i+1)
      }
    })

    const tableLine = line.split('')
    for (let indexKey in memo) {
      tableLine.splice( parseInt(indexKey), 1,  memo[indexKey]);
    }
    line = tableLine.join('');
    console.log('line', line)
    console.log('memo', memo)
    const lol =  line.split('')
      .reduce((acc, letter) => {
        if (parseInt(letter)) {
          acc.push(parseInt(letter))
        }
        return acc
      },[])
    // console.log('lol', lol)
    if(lol.length)  acc += lol[0]*10+lol[lol.length-1];

    return acc
  },0)
  console.log(r)
});

function letterToNumber(string, letter, number, memory = '') {
  let index = string.indexOf(letter)
  let result = {};
  while (index !== -1) {
    result[index] = number
    index = string.indexOf(letter, index + 1);
  }
  return result
}