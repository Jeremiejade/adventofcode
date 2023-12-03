const fs = require('fs');

const numberLocation = {

}
const gears = []

fs.readFile('./input', 'utf8',(err, data) => {
  const input = data.toString().trim().split('\n').map(line => line.split(''));
input.forEach((line, i) =>{
  numberLocation[i] = []
  const lineToString = line.join('');
  const digits = lineToString.matchAll(/(\d*)/g);
  numberLocation[i] = [...digits]
    .filter(d => !!d[0])
    .map(d => {
    return {
      id: parseInt(d[0]),
      index: d.index,
      length:d[0].length
    }
  });
  line.forEach((l, j) => {
    if(isAGear(l)){
      gears.push({
        indexI: i,
        indexJ: j
      });
    }
  });
});

  const result = gears.map(({ indexI, indexJ }) => {
    return findAdjacentNumbers(indexI, indexJ)
  }).reduce((acc, adjacentNumbers) => {
    if(adjacentNumbers.length === 2) {
      acc += adjacentNumbers[0].id * adjacentNumbers[1].id
    }
    return acc
  },0);
  console.log(result)
});

function isAGear(l) {
  return l === '*';
}

function findAdjacentNumbers(indexI, indexJ) {
  const adjacentNumbers = [];
  const start = indexI - 1 < 0 ? 0 : indexI - 1;
  for (let i = start; i <= indexI + 1; i++) {

    const stratJ = indexJ - 1 < 0 ? 0 : indexJ - 1;
    for (let j = stratJ; j <= indexJ + 1; j++) {
      numberLocation[i].forEach((number)=> {
        if(j >= number.index
          && j <= number.index + number.length -1
          && !adjacentNumbers.find(({id, index}) => id === number.id && index === number.index)
        ){
          adjacentNumbers.push(number)
        }
      });

    }
  }
  return adjacentNumbers;
}
