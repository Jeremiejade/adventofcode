const fs = require('fs');
const _ = require('lodash');
const input = fs.readFileSync('./input', { encoding: 'utf8' });

let rocksCoordinates = input.trim().split('\n').map(line => line.split('->').map((rock) => {
  return rock.split(',').map(c => parseInt(c))
}))

rocksCoordinates = rocksCoordinates.flatMap(lines => {
  return lines.reduce((acc, rock, i) => {
    const nextRock = lines[i + 1]
    if (nextRock) {
      acc = [...acc, ...constructRangeOfRocks(rock, nextRock)]
    }
    return acc
  }, [])
})

rocksCoordinates = _.uniqWith(rocksCoordinates, _.isEqual).sort((a, b) => a.y - b.y);
const endRocks = rocksCoordinates[rocksCoordinates.length - 1].y
console.log(endRocks)

function constructRangeOfRocks(a, b) {
  const rangeOfRocks = [];
  const [startX, startY] = a;
  const [endX, endY] = b;
  if (startX - endX < 0) {
    for (let i = startX; i <= endX; i++) {
      rangeOfRocks.push({ x: i, y: startY })
    }
  } else if (startX - endX > 0) {
    for (let i = endX; i <= startX; i++) {
      rangeOfRocks.push({ x: i, y: startY })
    }
  } else if (startY - endY < 0) {
    for (let i = startY; i <= endY; i++) {
      rangeOfRocks.push({ x: startX, y: i })
    }
  } else if (startY - endY > 0) {
    for (let i = endY; i <= startY; i++) {
      rangeOfRocks.push({ x: startX, y: i })
    }
  }
  return rangeOfRocks
}

let isInfinityFalling = false;
let sand = 0

const rocksByY = {}
rocksCoordinates.forEach(addRock);

function addRock({ x, y }){
  if(!rocksByY[y]){
    rocksByY[y] = [x];
  }else {
    rocksByY[y].push(x)
  }
}

function sandFalling(x, y) {
  if(!rocksByY[y+1]){
    if (y === endRocks+2) {
      addRock({ x, y });
      sand--
      return
    }
    sandFalling(x, y + 1)
    return;
  }
  const rocksY = rocksByY[y+1];
  const rockB = rocksY.find(rx => rx === x);
  if (!rockB) {
    sandFalling(x, y + 1)
    return;
  }
  const rockL = rocksY.find(rx => rx === x - 1);
  if (!rockL) {
    sandFalling(x - 1, y + 1)
    return;
  }
  const rockR = rocksY.find(rx => rx === x + 1);
  if (!rockR) {
    sandFalling(x + 1, y + 1)
    return;
  }
  if (y === 0) {
    isInfinityFalling = true;
  }
  addRock({ x, y });
}


do {
  sand++
  sandFalling(500, 0)
}
while (!isInfinityFalling);
/*let screen = ''
for (let y = 0; y <= 11; y++) {
  for (let x = 485; x < 515; x++) {
    const r = rocksCoordinates.find(r => r.x === x && r.y === y)
    if (r) {
    screen+= '#'
    }else {
      screen+='.'
    }
  }
  screen += '\n'
}
console.log(screen)*/

console.log(sand)
