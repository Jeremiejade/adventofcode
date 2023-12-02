const fs = require('fs');

fs.readFile('./input', 'utf8',(err, data) => {
const input = data.toString().trim().split('\n')

  const game = input.reduce((acc, game, index) => {
    acc[index+1] = game
      .substring(game.indexOf(':') + 1, game.length)
      .split(';')
      .map(round => {
        return round
          .split(',')
          .reduce((acc, revealedCube) =>{
          const [, number, color] = /(\d*) (\w*)/.exec(revealedCube.trim())
          acc[color] = parseInt(number);
          return acc
        }, {})
      })
    return acc
  }, {})

  let result = 0;
  for (let gameKey in game) {
    result += power(game[gameKey])
  }

  console.log(result)
});

function power(round) {
  const p = round.reduce((acc, r) =>{
    for (let rKey in r) {
      if(!(acc[rKey] && acc[rKey] >= r[rKey])){
        acc[rKey] = r[rKey]
      }
    }
   return acc;
  },{})
  return Object.values(p).reduce((acc, n)=> {
   return acc * n
  }, 1)
}

