const fs = require('fs');
const _ = require('lodash')
const input = fs.readFileSync('./input', { encoding: 'utf8' });

const instructions =  input.trim().split('\n');


const hTrajectory = [{
  x:0,
  y:0
}];

const tTrajectory = [{
  x:0,
  y:0
}];

instructions.forEach(instruction => hPosition(instruction));

function hPosition(input) {
  const direction = input[0];
  const move = parseInt(input.slice(1, input.length));
  let { x, y } = hTrajectory[hTrajectory.length - 1];
  if(direction === 'R'){
    for (let i = 1; i <= move; i++) {
      x++;
      hTrajectory.push({x,y});
      moveTX({x,y}, 1)
    }
  }
  if(direction === 'L') {
    for (let i = 1; i <= move; i++) {
      x--;
      hTrajectory.push({x,y});
      moveTX({x,y}, -1)
    }
  }
  if(direction === 'U') {
    for (let i = 1; i <= move; i++) {
      y++;
      hTrajectory.push({x,y});
      moveTY({x,y}, 1)
    }
  }
  if(direction === 'D') {
    for (let i = 1; i <= move; i++) {
      y--;
      hTrajectory.push({x,y});
      moveTY({x,y}, -1)
    }
  }
}
function moveTX(hPos, direction) {
  let { x, y } = tTrajectory[tTrajectory.length - 1];
  const delta = hPos.x - x;
  if(delta < 2 && delta > -2) {
    return;
  }
  x += direction;
  if(hPos.y !== y) {
    y = hPos.y;
  }
  tTrajectory.push({x, y});
}

function moveTY(hPos, direction) {
  let { x, y } = tTrajectory[tTrajectory.length - 1];
  const delta = hPos.y - y;
  if(delta < 2 && delta > -2) {
    return;
  }
  y += direction;
  if(hPos.x !== x) {
    x = hPos.x;
  }
  tTrajectory.push({x, y});
}

console.log(_.uniqWith(tTrajectory, _.isEqual).length);
