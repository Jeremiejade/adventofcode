const fs = require('fs');

const symbolLocation = {
  0: []
}
const numberLocation = {

}
let result = 0;

fs.readFile('./input', 'utf8',(err, data) => {
  const input = data.toString().trim().split('\n').map(line => line.split(''));
input.forEach((line, i) =>{
  symbolLocation[i + 1] = [];
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
    if(isASymbol(l)){
      symbolLocation[i - 1]?.push([j-1, j, j+1])
      symbolLocation[i].push([j-1, j, j+1])
      symbolLocation[i + 1].push([j-1, j, j+1])
    }
  });
});
  console.log('numberLocation', numberLocation)
  console.log('symbolLocation', symbolLocation)

  for (let i in numberLocation) {
    numberLocation[i].forEach(({id, index, length}) => {
      if(isCollision(symbolLocation[i].flatMap(s=>s), {id, index, length})) {
        console.log('collision',id)

        result+=id;
        console.log('result',result)

      }else {
        console.log('not', id)
      }
    });
  }
  console.log(result)
});

function isASymbol(l) {
  return !(Number.isInteger(parseInt(l)) || l === '.');
}

function isCollision(symbolsIndex, { index, length}){
  let collision = false
  for (let i = index; i < index + length; i++) {
    console.log('symbolsIndex', symbolsIndex, i)
    if(symbolsIndex.includes(i)){
      collision = true;
      break
    }
  }
  console.log('collision',collision)
  return collision
}