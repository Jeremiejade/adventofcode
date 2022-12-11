const fs = require('fs');
const _ = require('lodash')
const input = fs.readFileSync('./input', { encoding: 'utf8' });
const regex= /([\w :,=+]+\n)([\w :,=+]+\n)([\w :,=*+]+\n)([\w :,=+]+\n)([\w :,=+]+\n)([\w :,=+]+)/gm
const monkeys = []
input
  .match(regex)
  .map(line => {
    let number;
    line.split('\n')
      .forEach((l, i) => {
        if(i===0) {
          const [r] = l.match(/\d/g);
          number = parseInt(r);
          monkeys[number] = {
            number,
            count:0
          }
        }
        if(i===1) {
          monkeys[number].items = l.match(/\d+/g).map(i => parseInt(i));
        }
        if(i===2) {
          monkeys[number].operation = l.match(/old[ +*]+\w+/g)[0];
        }
        if(i===3) {
          monkeys[number].divisible = parseInt(l.match(/\d+/g)[0]) ;
        }
        if(i===4) {
          monkeys[number].t = parseInt(l.match(/\d+/g)[0]);
        }
        if(i===5) {
          monkeys[number].f = parseInt(l.match(/\d+/g)[0]);
        }
      })
  });
//round
for (let i = 0; i < 20; i++) {
  monkeys.forEach(monkey => {
    monkey.count +=  monkey.items.length;
    for (let item of monkey.items) {
      let value = operation(monkey.operation, item);
      if(value % monkey.divisible === 0 ) {
        monkeys[monkey.t].items.push(value)
      }else {
        monkeys[monkey.f].items.push(value)
      }
    }
    monkey.items = [];
  });
}


function operation(string, old) {
  const value =  eval(string.replace(/old/g, old));
  return divideByThree(value);
}

function divideByThree(number) {
 return Math.trunc(number / 3);
}
monkeys.sort((a,b)=> b.count - a.count)
console.log(monkeys[0].count* monkeys[1].count)
