const fs = require('fs');


fs.readFile('./input', 'utf8',(err, data) => {
  const input = data.toString().trim().split('\n')
    .map(line => {
      return line.substring(line.indexOf(':') + 1, line.length)
        .split('|')
        .map((l, i) =>  l.split(' ')
          .filter(t => t.trim() !== '').map(n => parseInt(n)));

    });
  console.log(input)
  let result = input.map(([winCards, cards])=> computeScore(winCards,cards))
    .reduce((acc, score) => {
      acc += score
      return acc;
    },0)
  console.log(result)
});

function computeScore(winCards, cards) {
  let score = 0;
  cards.forEach(card => {
    if(winCards.indexOf(card) !== -1){
      score = score === 0 ? 1 : score*2;
    }
  });
  return score;
}