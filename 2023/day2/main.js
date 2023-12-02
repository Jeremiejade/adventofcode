const fs = require('fs');

const totalCube =  {
  red: 12,
  green: 13,
  blue:14
}


fs.readFile('./input', 'utf8',(err, data) => {
const input = data.toString().trim().split('\n')

  const game = input.reduce((acc, game, index) => {
    acc[index+1] = game.substring(game.indexOf(':') + 1, game.length).split(';')
      .map(round => {
        return round.split(',').reduce((acc, revealedCube) =>{
          const [, number, color] = /(\d*) (\w*)/.exec(revealedCube.trim())
          acc[color] = parseInt(number);
          return acc
        }, {})
      })
    return acc
  }, {})

  let result = 0;
  for (let gameKey in game) {
    if(isPossible(game[gameKey])){
      result += parseInt(gameKey)
    }
  }

  console.log(result)
});


function isPossible(round) {
 return round.every(r => {
   let comp = true
   for (let rKey in r) {
     if(comp) {
      comp = r[rKey] <= totalCube[rKey]
     }
   }
   return comp
  })
}

