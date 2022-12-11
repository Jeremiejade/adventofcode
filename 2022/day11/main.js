const fs = require('fs');
const _ = require('lodash')
const input = fs.readFileSync('./testInput', { encoding: 'utf8' });
const regex = /([\w :,=+]+\n)([\w :,=+]+\n)([\w :,=*+]+\n)([\w :,=+]+\n)([\w :,=+]+\n)([\w :,=+]+)/gm
const monkeys = []
input
  .match(regex)
  .map(line => {
    let number;
    line.split('\n')
      .forEach((l, i) => {
        if (i === 0) {
          const [r] = l.match(/\d/g);
          number = parseInt(r);
          monkeys[number] = {
            number,
            count: 0
          }
        }
        if (i === 1) {
          monkeys[number].items = l.match(/\d+/g);
        }
        if (i === 2) {
          monkeys[number].operation = l.match(/old[ +*]+\w+/g)[0];
        }
        if (i === 3) {
          monkeys[number].divisible = parseInt(l.match(/\d+/g)[0]);
        }
        if (i === 4) {
          monkeys[number].t = parseInt(l.match(/\d+/g)[0]);
        }
        if (i === 5) {
          monkeys[number].f = parseInt(l.match(/\d+/g)[0]);
        }
      })
  });
//round
for (let i = 0; i < 1000; i++) {
  monkeys.forEach(monkey => {
    monkey.count += monkey.items.length;
    for (let item of monkey.items) {
      let value = operation(monkey.operation, item);
      if (value[0]) {
        monkeys[monkey.t].items.push(value[1])
      } else {
        monkeys[monkey.f].items.push(value[1])
      }
    }
    monkey.items = [];
  });
  if (i === 0) {
    console.log(monkeys.map(m => m.count))

  }
  if (i === 20) {
    console.log(monkeys.map(m => m.count))
  }
  if (i === 999) {
    console.log(monkeys.map(m => m.count))

  }
}

/*operation('old * 2','3 + 6 * 19 + 3 + 6 ', 5)*/

function operation(string, old, divide) {
  const operation = string.replace(/old/g, old);

  /*  if(operation.indexOf('+') === -1) {
      return [operation.match(/\d+/g).some(number => parseInt(number) % divide === 0), operation]
    } else {*/
  // let operationsGroup = operation.match(/([\d *]+)/g).map(o => o.match(/\d+/g));
  let operationsGroup = operation.match(/([+*]) (\d+)/g)
    .map(o => {
      const [value] = o.match(/\d+/)
      const r = {
        value: parseInt(value),
        operator: o.slice(0, 1)
      }
      return r
    })
  let value = parseInt(operation.match(/^\d+/g)[0]);
  const result = operationsGroup.reduce((acc, { value, operator }) => {
    const result = eval(`${acc}${operator}${value}`)
    acc = result % divide
    return acc
  }, value);

  return [result === 0, operation]


  // return divideByThree(value);
}

function divideByThree(number) {
  return Math.trunc(number);
}

monkeys.sort((a, b) => b.count - a.count)
// console.log(monkeys[0].count* monkeys[1].count)
