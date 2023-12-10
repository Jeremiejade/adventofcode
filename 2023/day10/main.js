const fs = require('fs');

const PIPES = {
  '|': ['+y', 0, '-y', 0],
  '-': [0, '-x', 0, '+x'],
  'L': ['+x','-y',0 ,0],
  'J': ['-x',0 ,0, '-y'],
  '7': [0, 0, '-x', '+y'],
  'F': [0, '+y', '+x', 0],
  '.': [0, 0, 0, 0]
}

const COORDINATE_BY_PIPE = {}


fs.readFile('./input', 'utf8',(err, data) => {
 const fData =  data.toString().trim().split('\n')
   .map(line => line.split(''));
  const start = buildData(fData);
  const direction =  findStartPipe(start, fData);
  const result = findLoopLength(start.y, start.x, direction, fData, start);
  console.log(result/2)
});

function buildData(field) {
  let start;
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if(field[i][j] === 'S') {
        start = { y:i, x:j }
      } else if(field[i][j] !== '.'){
        COORDINATE_BY_PIPE[`${i}-${j}`] = field[i][j];
      }
    }
  }
  return start
}

function findStartPipe(start, fData) {
  const bottom = COORDINATE_BY_PIPE[`${start.y + 1}-${start.x}`] ? PIPES[COORDINATE_BY_PIPE[`${start.y + 1}-${start.x}`]][0] : 0;
  const left = COORDINATE_BY_PIPE[`${start.y}-${start.x - 1}`] ? PIPES[COORDINATE_BY_PIPE[`${start.y}-${start.x - 1}`]][1] : 0;
  const top = COORDINATE_BY_PIPE[`${start.y - 1}-${start.x}`] ? PIPES[COORDINATE_BY_PIPE[`${start.y - 1}-${start.x}`]][2] : 0;
  const right = COORDINATE_BY_PIPE[`${start.y}-${start.x + 1}`] ? PIPES[COORDINATE_BY_PIPE[`${start.y}-${start.x + 1}`]][3] : 0;

  const startPipe =  [
    top ? bottom ? '+y' : left ? '-x' : right ? '+x' : 0 : 0,
    right ? bottom ? '+y' : left ? '-x' : top ? '-y' : 0 : 0,
    bottom ? right ? '+x' : left ? '-x' : top ? '-y' : 0 : 0,
    left ? right ? '+x' : bottom ? '+y' : top ? '-y' : 0 : 0,
  ]
  for (let pipe in PIPES) {
    if(startPipe.toString() === PIPES[pipe].toString()){
      fData[start.y][start.x] =  pipe
    }
  }
  return  top ? 0 : right ? 1 : 2
}

function findLoopLength(y, x, direction, fData, start) {
  let round = 0
  while (true) {
    if(start.y === y  && start.x === x && round !== 0) {
    break
    }
    const pipe = fData[y][x];
    const next = PIPES[pipe][direction]
    const {nY, nX, nDirection} = nextPipe(y, x, next);
    y = nY;
    x = nX;
    direction = nDirection;
    round++

  }
  return round
}

function nextPipe(y,x,next) {
  if(next === '+y') {
    return {
      nY: y + 1,
      nX: x,
      nDirection: 0
    }
  }
  if(next === '-x') {
    return {
      nY: y,
      nX: x - 1,
      nDirection: 1
    }
  }
  if(next === '-y') {
    return {
      nY: y - 1,
      nX: x,
      nDirection: 2
    }
  }
  if(next === '+x') {
    return {
      nY: y,
      nX: x + 1,
      nDirection: 3
    }
  }
}
