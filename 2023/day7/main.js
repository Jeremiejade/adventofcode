const fs = require('fs');

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
      ...input[type].map(game =>  [game[0],game[1]])
    ]
  }
  const result = sortedGames.reduce((acc, score, index) => {
    console.log("score", score)
    console.log("index", index)
    console.log(score[1] * (index + 1))
    console.log('-----------]')
    acc += score[1] * (index + 1)
    return acc
  },0)



  console.log(result)

});

function formatCard(cards) {
  return cards.split('').map((n) => cardToNumber[n])
}

function buildCardToNumber() {
  const cardToNumber = {};
  for (let i = 2; i < 10; i++) {
    cardToNumber[i] = i
  }
  return {
    ...cardToNumber,
    T: 10,
    J: 1,
    Q: 12,
    K: 13,
    A: 14
  }
}

function findType(cards) {
  const cardsByNumber = {}
  let j = 0;
  cards.forEach(c => {
    if(c === 1) {
      j++
    }else if(!cardsByNumber[c]) {
      cardsByNumber[c] = 1;
    } else {
      cardsByNumber[c] = cardsByNumber[c] + 1
    }
  });

  const score = Object.values(cardsByNumber)

  if(score.indexOf(5 - j) !== -1 || j === 5) {
    return 6
  }
  if(score.indexOf(4 - j) !== -1) {
    return 5
  }
  const pair = score.filter(s => s === 2).length
  if(score.indexOf(3 - j) !== -1 && ((j !== 0 && pair === 2) || (j === 0 && pair > 0))) {
    return 4
  }
  if(score.indexOf(3 - j) !== -1) {
    return 3
  }
  if(pair === 2 ) {
    return 2
  }
  if(pair === 1 || j === 1) {
    return 1
  }
  return 0
}

function sortByWinner(games) {
 return games.sort(([{cards: cardsA}], [{cards: cardsB}]) => computeWinner(cardsA, cardsB))
}

function computeWinner(cardsA, cardsB) {
  // console.log(computeCardsPound(cardsA).toString(15))
  return computeCardsPound(cardsA) - computeCardsPound(cardsB)
}

function computeCardsPound(cards) {
  return cards.reduce((acc, card, index) => {
     acc += Math.pow(15, cards.length - index -1)*card
    return acc
  },0)
}

