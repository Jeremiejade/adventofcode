const fs = require('fs');
const _ = require('lodash');
const input = fs.readFileSync('./input', { encoding: 'utf8' });

let rocksCoordinates = input.trim().split('\n').map(line => line.split('->').map((rock) => {
  return rock.split(',').map(c => parseInt(c))
}))

rocksCoordinates = rocksCoordinates.flatMap(lines => {
  return lines.reduce((acc, rock, i) => {
    const nextRock = lines[i+1]
    if (nextRock){
     acc = [...acc, ...constructRangeOfRocks(rock, nextRock)]
    }
    return acc
  }, [])
})

rocksCoordinates = _.uniqWith(rocksCoordinates, _.isEqual).sort((a,b)=> a.y - b.y);
const endRocks = rocksCoordinates[rocksCoordinates.length - 1].y
console.log(rocksCoordinates)

function constructRangeOfRocks(a, b) {
  const rangeOfRocks = [];
  const [startX, startY] = a;
  const [endX, endY] = b;
  if (startX - endX < 0) {
    for (let i = startX; i <= endX; i++) {
      rangeOfRocks.push({ x: i, y: startY })
    }
  }else if (startX - endX > 0) {
    for (let i = endX; i <= startX; i++) {
      rangeOfRocks.push({ x: i, y: startY })
    }
  }else if (startY - endY < 0) {
    for (let i = startY; i <= endY; i++) {
      rangeOfRocks.push({ x: startX, y: i })
    }
  }else if (startY - endY > 0) {
    for (let i = endY; i <= startY; i++) {
      rangeOfRocks.push({ x: startX, y: i })
    }
  }
  return rangeOfRocks
}
let isInfinityFalling = false;
let sand = 0

function sandFalling(x, y) {
  const rockB = rocksCoordinates.find(r=> r.x === x && r.y  === y + 1);
  if(!rockB){
    if(y > endRocks) {
      return isInfinityFalling = true
    }
    sandFalling(x, y+1)
    return;
  }
  const rockL = rocksCoordinates.find(r=> r.x  === x - 1 && r.y === y  + 1);
  if(!rockL){
    sandFalling(x - 1, y+1)
    return;
  }
  const rockR = rocksCoordinates.find(r=> r.x === x + 1  && r.y === y  + 1);
  if(!rockR){
    sandFalling(x + 1, y+1)
    return;
  }
  rocksCoordinates.push({ x, y });
}


do {
  sand++
  sandFalling(500,0)
}
while (!isInfinityFalling);

console.log(sand)
