const fs = require('fs');
const _ = require('lodash')
const input = fs.readFileSync('./input', { encoding: 'utf8' });
let cycle = 0;
let x = 1;
const print = []

input.trim().split('\n')
  .map(l => {
    return [l.slice(0, 1), parseInt(l.slice(4, l.length))]
  }).forEach(([, n]) => {
    if(!isNaN(n)) {
      cycle = addCycle(cycle);
      cycle = addCycle(cycle);
      x+=n;
    } else {
      cycle = addCycle(cycle);
    }
  });

function addCycle(cycle) {

  const newCycle = cycle%40
  if(newCycle >= x - 1 &&  newCycle <= x+ 1){
    print.push('#')
  }else {
    print.push('.')
  }
  cycle ++;
  return cycle;
}

const screen = print.reduce((acc, p, i)=>{
  if(i%40 === 0){
    acc+='\n'
  }
  acc+=p
  return acc
}, '')


console.log(screen)
