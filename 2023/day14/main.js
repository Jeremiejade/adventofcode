const fs = require('fs');
const _ = require("lodash");

fs.readFile('./input', 'utf8',(err, data) => {
  const fData = data.toString().trim().split('\n')
    .map(l=> l.split(''))


  console.log(findCycle(fData))
});


function findCycle(pattern) {
  let results = [[]];
  let result = 0;
  let newPattern = pattern;
  let finalLoad = 0;
  while (true) {
    result = compute(newPattern)
    results.map(r => {
      r.push(result)
      return r
    })
    results.push([])
    const firstStepAndCycle = compareDeepArray(results)

    if(firstStepAndCycle) {
      const cycleLength = firstStepAndCycle.cycle.length;
      let totalCycle = 1000000000 - firstStepAndCycle.firstStep.length;
      const lastStep = totalCycle % cycleLength
      finalLoad = firstStepAndCycle.cycle[lastStep]
      break
    }
    newPattern = cycle(newPattern)
  }
  return finalLoad;
}

function compareDeepArray(results) {
  let equalArray = null;
  for (let index = 0; index < results.length; index++) {
    const result = results[index];
    if(result.length > 3) {
      const arrayList = results.filter((r,i) => {
        return i !== index;
      });
      equalArray = arrayList.find(a =>  _.isEqual(a.slice(result.length), [...result, ...result]));
    }
    if(equalArray) return { firstStep: results[0], cycle: result}
  }
  return equalArray
}

function compute(pattern) {
  const rowLength = pattern[0].length;
  let result = 0
  for (let i = 0; i < rowLength; i++) {
    result += c(i, pattern)
  }
  return result;
}

function c(index, data) {
  let result = 0;
  data.forEach((line, i) => {
    const element = line[index];
    if(element === 'O') {
      result += data.length - i;
    }
  })
  return result;
}

function cycleMaker(pattern, length) {
  let result = pattern;
  for (let i = 0; i < length; i++) {
    result = cycle(result);
  }
  return result
}

function cycle(pattern) {
  let result = reverseToNorth(pattern)
  result = reverseToWest(result)
  result = reverseToSud(result)
  return reverseToEst(result)
}

function reverseToWest(pattern) {
  const newPattern = createNewPattern(pattern)
  pattern.forEach((row, index) => {
    let position = -1;
    row.forEach((r, i) => {
      if(r === 'O'){
        position++
        newPattern[index].splice(position, 1, r)
      }
      if(r === '#'){
        position = i;
        newPattern[index].splice(position, 1, r)
      }
    })
  })
  return newPattern
}

function reverseToEst(pattern) {
  const newPattern = createNewPattern(pattern)
  pattern.forEach((row, index) => {
    let position = -1;
    row.reverse().forEach((r, i) => {
      if(r === 'O'){
        position++
        newPattern[index].splice(position, 1, r)
      }
      if(r === '#'){
        position = i;
        newPattern[index].splice(position, 1, r)
      }
    })
  })
  return newPattern.map(row => row.reverse())
}

function reverseToSud(pattern) {
  const newPattern = createNewPattern(pattern)
  const rowLength = pattern[0].length
  pattern.reverse()

  for (let i = 0; i < rowLength; i++) {
    let position = -1;
    pattern.forEach((row, index)=> {
      const r = row[i];
      if(r === 'O'){
        position++
        newPattern[position].splice(i, 1, r)
      }
      if(r === '#'){
        position = index;
        newPattern[position].splice(i, 1, r)
      }
    })
  }
  return newPattern.reverse()
}

function reverseToNorth(pattern) {
  const newPattern = createNewPattern(pattern)
  const rowLength = pattern[0].length

  for (let i = 0; i < rowLength; i++) {
    let position = -1;
    pattern.forEach((row, index)=> {
      const r = row[i];
      if(r === 'O'){
        position++
        newPattern[position].splice(i, 1, r)
      }
      if(r === '#'){
        position = index;
        newPattern[position].splice(i, 1, r)
      }
    })
  }
  return newPattern
}


function createNewPattern(pattern) {
  return pattern.reduce((acc, row) => {
    acc.push(new Array(row.length));
    return acc;
  }, [])
}
