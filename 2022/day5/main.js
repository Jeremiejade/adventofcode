const fs = require('fs');

const data = fs.readFileSync('./input', {encoding:'utf8'});
const pairs = data.trim().split('\n').map(pair => pair.split(','));

const test = [
  ['2-4','6-8'],
  ['2-3','4-5'],
  ['5-7','7-9'],
  ['2-8','3-7'],
  ['6-6','4-6'],
  ['2-6','4-8']
]

function testRangePairs([pair1, pair2]) {
  const [startRange1, endRange1] = pair1.split('-');
  const [startRange2, endRange2] = pair2.split('-');

  return (parseInt(startRange1) <= parseInt(startRange2) && parseInt(endRange1) >= parseInt(endRange2))
    || (parseInt(startRange2) <= parseInt(startRange1) && parseInt(endRange2) >= parseInt(endRange1))
}

const result = pairs.reduce((acc, pair) =>{
  if(testRangePairs(pair)) acc++
  return acc
}, 0)

//////////////////////////////////////////////////////////////

function testOverlapPairs([pair1, pair2]) {
  const [a, b] = pair1.split('-');
  const [c, d] = pair2.split('-');

  return  (parseInt(a) <= parseInt(c) && parseInt(c) <= parseInt(b))
    || (parseInt(a) <= parseInt(d) && parseInt(d) <= parseInt(b))
    || (parseInt(c) <= parseInt(a) && parseInt(a) <= parseInt(d))
    || (parseInt(c) <= parseInt(b) && parseInt(b) <= parseInt(d))
}
const result2 = pairs.reduce((acc, pair) =>{
  if(testOverlapPairs(pair)) acc++
  return acc
}, 0)




console.log(result2)
// console.log(test.map(testOverlapPairs))


