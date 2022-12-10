const fs = require('fs');
const _ = require('lodash')
const input = fs.readFileSync('./input', { encoding: 'utf8' });

const instructions =  `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`.trim().split('\n');


const hTrajectory = [{
  x:0,
  y:0
}];

const trajectories = []

for (let i = 0; i < 9; i++) {
  trajectories.push([{
    x:0,
    y:0
  }])
}
console.log(trajectories.length)

instructions.forEach(instruction => hPosition(instruction));

function hPosition(input) {
  const direction = input[0];
  const move = parseInt(input.slice(1, input.length));
  let { x, y } = hTrajectory[hTrajectory.length - 1];
  if(direction === 'R'){
    for (let i = 1; i <= move; i++) {
      x++;
      hTrajectory.push({x,y});
      trajectories.reduce((acc, tr, i) => {
        if(i === 0 ){
         return moveTo(acc, hTrajectory, tr);
        }
        return moveTo(acc, trajectories[i - 1], tr);
      }, {x,y});

    }
  }
  if(direction === 'L') {
    for (let i = 1; i <= move; i++) {
      x--;
      hTrajectory.push({x,y});
      trajectories.reduce((acc, tr, i) => {
        if(i === 0 ){
          return moveTo(acc, hTrajectory, tr);
        }
        return moveTo(acc, trajectories[i - 1], tr);
      }, {x,y});
    }
  }
  if(direction === 'U') {
    for (let i = 1; i <= move; i++) {
      y++;
      hTrajectory.push({x,y});
      trajectories.reduce((acc, tr, i) => {
        if(i === 0 ){
          return moveTo(acc, hTrajectory, tr);
        }
        return moveTo(acc, trajectories[i - 1], tr);
      }, {x,y});
    }
  }
  if(direction === 'D') {
    for (let i = 1; i <= move; i++) {
      y--;
      hTrajectory.push({x,y});
      trajectories.reduce((acc, tr, i) => {
        if(i === 0 ){
          return moveTo(acc, hTrajectory, tr);
        }
        return moveTo(acc, trajectories[i - 1], tr);
      }, {x,y});
    }
  }
}


function moveTo(hPos, ht = hTrajectory, trajectory) {
  const {x: x1, y: y1} = ht[ht.length -1];
  const {x: x0, y: y0} = ht[ht.length -2];
  if(y1 !== y0 && x1 !== x0) {
   return jump(hPos, trajectory)
  }else if(y1 === y0 ) {
   return  moveTX(hPos, x1 - x0, trajectory)
  }
  return  moveTY(hPos, y1 - y0, trajectory)
}

function jump(hPos, trajectory) {
  let { x, y } = trajectory[trajectory.length - 1];
  const deltaX = hPos.x - x;
  const deltaY = hPos.y - y;
  if(deltaY === 1 && deltaX === 1) {
    trajectory.push({x, y});
    return { x, y } ;
  }
  if(deltaX>0) {
    x++
  }else {
    x--
  }
  if(deltaY>0) {
    y++
  }else {
    y--
  }
  trajectory.push({x, y});
  return { x, y } ;
}

function moveTX(hPos, direction, trajectory) {
  let { x, y } = trajectory[trajectory.length - 1];
  const delta = hPos.x - x;

  if(delta < 2 && delta > -2) {
    trajectory.push({x, y});
    return { x, y } ;
  }
  x += direction;
  if(hPos.y !== y) {
    y = hPos.y;
  }
  trajectory.push({x, y});
  return { x, y }
}

function moveTY(hPos, direction, trajectory ) {
  let { x, y } = trajectory[trajectory.length - 1];
  const delta = hPos.y - y;
  if(delta < 2 && delta > -2) {
    trajectory.push({x, y});
    return { x, y }
  }
  y += direction;
  if(hPos.x !== x) {
    x = hPos.x;
  }
  trajectory.push({x, y});
  return { x, y }
}
// console.log(trajectories)
// console.log(_.uniqWith(trajectories[trajectories.length -1], _.isEqual).length);
