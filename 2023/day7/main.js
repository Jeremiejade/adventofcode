const fs = require('fs');
// const _ = require('lodash');

const cardToNumber = buildCardToNumber()


fs.readFile('./input', 'utf8',(err, data) => {
  const input = data.toString().trim().split('\n')
    .map(line => line.split(' '))
    .reduce((acc, cardsAndScore) => {
      acc.push([
        formatCard(cardsAndScore[0]),
        parseInt(cardsAndScore[1])
      ]);
      return acc;
    },[])
    .map(game => {
      return [
        {
          cards: game[0],
          type: findType(game[0]),
        },
        game[1]
      ]
    })
    .reduce((acc, game) => {
      const key = game[0].type
      acc[key] ? acc[key].push(game) : acc[key] = [game];
      return acc;
    },{});
let sortedGames = []
  for (let type in input) {
    input[type] = sortByWinner(input[type])
    sortedGames = [
      ...sortedGames,
      ...input[type].map(game =>  game[1])
    ]
  }
  const result = sortedGames.reduce((acc, score, index) => {
    acc += score * (index + 1)
    return acc
  },0)



  console.log(result)

});

function deepSort(a, b) {
  return b - a;
}

function formatCard(cards) {
  return cards.split('').map((n) => cardToNumber[n])
}

function buildCardToNumber() {
  const cardToNumber = {};
  for (let i = 1; i < 10; i++) {
    cardToNumber[i] = i
  }
  return {
    ...cardToNumber,
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
  }
}

function findType(cards) {
  const cardsByNumber = {}
  cards.forEach(c => {
    if(!cardsByNumber[c]) {
      cardsByNumber[c] = 1;
    } else {
      cardsByNumber[c] = cardsByNumber[c] + 1
    }
  });
  const score = Object.values(cardsByNumber).sort(deepSort)

  if(score.indexOf(5) !== -1) {
    return 6
  }
  if(score.indexOf(4) !== -1) {
    return 5
  }
  if(score.indexOf(3) !== -1 && score.indexOf(2) !== -1) {
    return 4
  }
  if(score.indexOf(3) !== -1) {
    return 3
  }
  const pairNumber = score.filter(s => s === 2).length
  if(pairNumber === 2) {
    return 2
  }
  if(pairNumber === 1) {
    return 1
  }
  return 0
}

function sortByWinner(games) {
 return games.sort(([{cards: cardsA}], [{cards: cardsB}]) => computeWinner(cardsA, cardsB))
}

function computeWinner(cardsA, cardsB) {
  return computeCardsPound(cardsA) - computeCardsPound(cardsB)
}

function computeCardsPound(cards) {
  return cards.reduce((acc, card, index) => {
     acc += Math.pow(15, cards.length - index -1)*card
    return acc
  },0)
}


