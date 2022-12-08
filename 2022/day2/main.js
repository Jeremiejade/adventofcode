const fs = require('fs');

const data = fs.readFileSync('./input', {encoding:'utf8'});
const results = data.split('\n');

const scoreResult = {
  'A X': 4, // draw
  'B Y': 5, // draw
  'C Z': 6, // draw
  'C X': 7, // win
  'A Y': 8, // win
  'B Z': 9, // win
  'B X': 1, // loose
  'C Y': 2, // loose
  'A Z': 3 // loose
}

const secondRuleScoreResult = {
  'A X': 3,
  'B X': 1,
  'C X': 2,
  'A Y': 4,
  'B Y': 5,
  'C Y': 6,
  'A Z': 8,
  'B Z': 9,
  'C Z': 7
}
const result = results.reduce((acc, value) => {
  if(value) acc += secondRuleScoreResult[value];
  return acc
}, 0)

console.log(result)


