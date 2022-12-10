const fs = require('fs');
const _ = require('lodash')
const input = fs.readFileSync('./input', { encoding: 'utf8' });
let cycle = 0;
let x = 1;
const xstate = []
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
  cycle ++;
  if((cycle - 20 )% 40 === 0) {
    xstate.push(x * cycle)
  }
  return cycle;
}


console.log(_.sum(xstate))
