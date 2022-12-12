const fs = require('fs');
const _ = require('lodash')
const input = fs.readFileSync('./testInput', { encoding: 'utf8' });
const grid = input.trim().split('\n').map(line => line.trim().split(''));

function findStart(grid) {
  const pos = {
    height: 'a',
    route: []
  }
  grid.forEach((row, i) => {
    if (row.includes('S')) {
      pos.x = i;
    }
  });
  pos.y = grid[pos.x].indexOf('S')
  pos.route.push({ x: pos.x, y: pos.y })
  return pos;
}


const start = findStart(grid);
const successPath = []
pathFinding(start, grid);
function pathFinding(position, grid) {
  if(successPath[successPath.length - 1] && position.route.length === successPath[successPath.length - 1].route.length){
    return
  }
  if(isFinish(position, grid)){
    successPath.push(position)
    return
  }
  if (grid[position.x - 1] && isValidDestination(position, {
    height: grid[position.x - 1][position.y],
    x: position.x - 1,
    y: position.y
  })) {
    const newPosition = {
      height: grid[position.x - 1][position.y],
      x: position.x - 1,
      y: position.y,
      route: [...position.route, { x: position.x - 1, y: position.y }]
    }
    pathFinding(newPosition, grid);
  }

  if (grid[position.x + 1] && isValidDestination(position, {
    height: grid[position.x + 1][position.y],
    x: position.x + 1,
    y: position.y
  })) {
    const newPosition = {
      height: grid[position.x + 1][position.y],
      x: position.x + 1,
      y: position.y,
      route: [...position.route, { x: position.x + 1, y: position.y }]
    }
    pathFinding(newPosition, grid);
  }

  if (grid[position.x][position.y + 1] && isValidDestination(position, {
    height: grid[position.x][position.y + 1],
    x: position.x,
    y: position.y + 1
  })) {
    const newPosition = {
      height: grid[position.x][position.y + 1],
      x: position.x,
      y: position.y + 1,
      route: [...position.route, {
        x: position.x,
        y: position.y + 1,
      }]
    }
    pathFinding(newPosition, grid);
  }

  if (grid[position.x][position.y - 1] && isValidDestination(position, {
    height: grid[position.x][position.y - 1],
    x: position.x,
    y: position.y - 1
  })) {
    const newPosition = {
      height: grid[position.x][position.y - 1],
      x: position.x,
      y: position.y - 1,
      route: [...position.route, {
        x: position.x,
        y: position.y - 1,
      }]
    }
    pathFinding(newPosition, grid);
  }
}

function isValidDestination(start, destination) {
  return compareHeight(start.height, destination.height) && !deepIncludes(start.route, destination);
}

function deepIncludes(arr, el) {
  return !!arr.find(a => a.x === el.x && a.y === el.y)
}

function compareHeight(a, b) {
  return b.charCodeAt(0) - a.charCodeAt(0) <= 1 && b.charCodeAt(0) - a.charCodeAt(0) >= -1
}

function isFinish(position, grid) {
  if (position.height !== 'z') return false;
  return ([grid[position.x + 1][position.y],
    grid[position.x - 1][position.y],
    grid[position.x][position.y + 1],
    grid[position.x][position.y - 1]].includes('E'));
}

console.log(successPath.map(p => p.route.length).sort((a, b) => a - b))
