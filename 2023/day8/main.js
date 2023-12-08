const fs = require('fs');


fs.readFile('./input', 'utf8',(err, data) => {
 const input =  data.toString().trim().split('\n').filter(d => d.trim() !== '')
 const entries =  input.shift().trim().split('');
 const paths = input.map(line => line.match(/[a-zA-z\d]{3}/g))
   .reduce((acc, [path, L, R]) => {
    acc[path] = { L, R }
    return acc
   }, {})

  const starts = []
  for (let path in paths) {
    if(path.substring(2) === 'A') {
      starts.push(path)
    }
  }

const result =   starts.flatMap(position => {
    let index = 0;
    const loops = [];
    let result = false
    while (!result) {
      const i = index % entries.length;
      if(position.substring(2) === 'Z') {
        loops.push({
          p: position,
          i,
          index
        })
        result = loops.length > 0 && !!findLoop(position, i, loops)
        const direction = entries[(index+1) % entries.length]
        console.log(loops[0],position,  paths[position][direction])
      }

      const direction = entries[i]
      position = paths[position][direction]
      index++

    }
    return loops;
  })


  console.log('______________')
  console.log( result)
  console.log( result.map(({index})=> index).reduce(leastCommonMultiple)  )
});

function findLoop(position, index, loops) {
return loops.find(({p, i}) => {
    return p === position && i === index
  });
}

function minLoop(loops) {
  return loops.sort((a, b )=> b-a)
    .reduce((acc, loop) => {
      acc = compareLoop(acc,loop)
      return acc;
    }, 0)
}

function compareLoop(loopA, loopB) {
  if(!loopB) {
    return loopA;
  }
  if(!loopA) {
    return loopB;
  }
  if(loopA % loopB === 0) {
    console.log('trist')
    return loopA > loopB ? loopA : loopB
  }
  return loopA * loopB;
}

function leastCommonMultiple(a, b) {
  return (a / greatestCommonDivisor(a, b)) * b
}

function greatestCommonDivisor(a, b) {
  if (b === 0)
    return a
  else
    return greatestCommonDivisor(b, a % b)
}