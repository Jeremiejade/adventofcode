const fs = require('fs');


fs.readFile('./input', 'utf8',(err, data) => {
  const input = data.toString().trim().split('\n')
    .map(line => {
      return line.substring(line.indexOf(':') + 1, line.length)
        .split('|')
        .map((l, i) =>  l.split(' ')
          .filter(t => t.trim() !== '').map(n => parseInt(n)));

    });
  const cards = {}
  const scoresCard = input.map(([winCards, card])=> cardByScore(winCards, card))
  scoresCard.forEach((score, index) => {
    const cardId = index + 1;
    cards[cardId] = cards[cardId] ? cards[cardId] + 1 : 1;
    for (let i = 0; i < cards[cardId]; i++) {
      for (let i = cardId + 1; i <= cardId + score ; i++) {
        cards[i] = cards[i] ? cards[i] + 1 : 1
      }
    }
  });
 let result = 0;
  for (let cardId in cards) {
    result += cards[cardId]
  }
  console.log(result)
});

function cardByScore(winCards, card, id) {
  let score = 0;
  card.forEach(cardNumber => {
    if(winCards.indexOf(cardNumber) !== -1){
      score++
    }
  });
 return score;
}