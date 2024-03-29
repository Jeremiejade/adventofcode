const fs = require('fs');
const _ = require("lodash");

const memory = [];
const memoryMove = []
let fData;
let max = 0;

fs.readFile('./input', 'utf8',(err, data) => {
  fData = data.toString().trim().split('\n')
    .map(d=> d.split(''));
  column()
  line()
  console.log(max)
});

function column() {
  for (let i = 0; i <fData.length; i++) {
    findLongPath('+j', {pi:i, pj:0})
    findLongPath('-j', {pi:i, pj:fData[0].length-1})
  }
}

function line() {
  for (let i = 0; i <fData[0].length; i++) {
    findLongPath('+i', {pi:0, pj:i})
    findLongPath('-i', {pi:fData.length, pj:i})
  }
}

function findLongPath(direction, {pi, pj}) {
  memory.length = 0;
  memoryMove.length = 0;
  move(direction, {pi, pj})
  if(memory.length> max) max = memory.length
}

function move(direction, {pi, pj}) {
  if(pi < 0 || pi > fData.length - 1 || pj < 0 || pj > fData[0].length - 1) {
    return
  }
  if(memoryMove.indexOf(`${direction}${pi}:${pj}`) !== -1) return;
  memoryMove.push(`${direction}${pi}:${pj}`)
  if(memory.indexOf(`${pi}:${pj}`) === -1) {

    memory.push(`${pi}:${pj}`)
  }

  const tile = fData[pi][pj];
  if(tile === '.') {
    const {i, j} = nextStepPoint(direction, {pi, pj})
    move(direction, {pi:i, pj:j});
    return
  }
  if(tile === '\\') {
    const {nd,i, j} = nextStepForAntiSlash(direction, {pi, pj})
    move(nd, {pi:i, pj:j});
    return
  }
  if(tile === '/') {
    const {nd,i, j} = nextStepForSlash(direction, {pi, pj})
    move(nd, {pi:i, pj:j});
    return
  }
  if(tile === '|') {
    if(direction.indexOf('i') !== -1) {
      const {i, j} = nextStepPoint(direction, {pi, pj})
      move(direction, {pi:i, pj:j});
      return
    }
    move('+i', {pi: pi+1, pj});
    move('-i', {pi: pi-1, pj});
    return
  }
  if(tile === '-') {
    if(direction.indexOf('j') !== -1) {
      const {i, j} = nextStepPoint(direction, {pi, pj})
      move(direction, {pi:i, pj:j});
      return
    }
    move('+j', {pi, pj: pj + 1});
    move('-j', {pi, pj: pj - 1});
  }
}

function nextStepPoint(direction, {pi, pj}) {
  if(direction === '+j') {
    return { i: pi, j: pj + 1 }
  }
  if(direction === '-j') {
    return { i: pi, j: pj - 1 }
  }
  if(direction === '+i') {
    return { i: pi + 1, j: pj }
  }
    return { i: pi - 1, j: pj }
}

function nextStepForAntiSlash(direction, {pi, pj}) {
  if(direction === '+j') {
    return {nd: '+i', i: pi + 1, j: pj }
  }
  if(direction === '-j') {
    return {nd: '-i', i: pi - 1, j: pj }
  }
  if(direction === '+i') {
    return {nd: '+j', i: pi, j: pj + 1 }
  }
  return {nd: '-j', i: pi, j: pj - 1 }
}

function nextStepForSlash(direction, {pi, pj}) {
  if(direction === '+j') {
    return {nd: '-i', i: pi - 1, j: pj }
  }
  if(direction === '-j') {
    return {nd: '+i', i: pi + 1, j: pj }
  }
  if(direction === '+i') {
    return {nd: '-j', i: pi, j: pj - 1 }
  }
  return {nd: '+j', i: pi, j: pj + 1 }
}
