const fs = require('fs');

fs.readFile('./input', 'utf8',(err, data) => {
  const fData = data.toString().trim().split('\n\n')
    .map(pattern => pattern.split('\n')
      .map(line => line.split(''))
    )
    .reduce((acc, pattern, i) => {
    return acc + findReflection(pattern, i)
  }, 0)
  console.log(fData)
});

function findReflection(pattern) {
  const v = findVerticalReflection(pattern)
  if(v)  return v
  const h = findHorizontalReflection(pattern)
  if(!h) {
    console.log('+++++++++++++++++++++++++++++++++++++')
  }
  return h*100;
}

function isVerticalReflexion(index, pattern) {
  let i = 0;
  let result = [];
  while (true) {
    if(index-i < 0 || index + i + 1 > pattern[0].length -1) {
      break;
    }
    const diff = findDiffRow(index - i ,index + i + 1, pattern);
    if(diff === false) {
      result = false
      break;
    }
    if(diff === 1) {
      result.push(diff)
    }

    if(result.length > 1){
      result = false
      break;
    }
    i++
  }
  return result ? result.length === 1 : false;
}

function findDiffRow(index, compareIndex, pattern) {
  const diff = [];
  for (let i = 0; i < pattern.length; i++) {
    if(pattern[i][index] !== pattern[i][compareIndex]) {
      diff.push(i)
    }
    if(diff.length > 1) return false
  }
  return diff.length;
}

function isHorizontalReflexion(index, pattern) {
  let i = 0;
  let result = [];
  while (true) {
    if(index-i < 0 || index + i + 1 > pattern.length -1) {
      break;
    }
    const diff = findDiffColumn(index - i ,index + i + 1, pattern);
    if(diff === false) {
      result = false
      break;
    }
    if(diff === 1) {
      result.push(diff)
    }

    if(result.length > 1){
      result = false
      break;
    }
    i++
  }
  return result ? result.length === 1 : false;
}

function findDiffColumn(index, compareIndex, pattern) {
  const diff = [];
  for (let i = 0; i < pattern[0].length; i++) {
    if(pattern[index][i] !== pattern[compareIndex][i]) {
      diff.push(i)
    }
    if(diff.length > 1) return false
  }
  return diff.length
}

function findVerticalReflection(pattern) {
  let middle = Math.floor(pattern[0].length / 2);
  if(isOdd(pattern[0].length)){
    middle--
  }
  let i = 0;
  let result = null
  while(true) {
    if(middle - i < 0 && middle + i + 1 > pattern[0].length - 2){
      break
    }
    if(middle - i >= 0) {
      if(isVerticalReflexion(middle-i, pattern)){
        result =  middle - i + 1
        break
      }
    }
    if (middle + i + 1 < pattern[0].length - 1) {
      if(isVerticalReflexion(middle + i + 1, pattern)){
        result  = middle + i + 2
        break
      }
    }
    i++
  }
  return result
}

function findHorizontalReflection(pattern) {
  let middle = Math.floor(pattern.length / 2);
  if(isOdd(pattern.length)){
    middle--
  }
  let i = 0;
  let result = null
  while(true) {
    if(middle - i < 0 && middle + i + 1 > pattern.length - 2){
      break
    }
    if(middle - i >= 0) {
      if(isHorizontalReflexion(middle-i, pattern)){
        result =  middle - i + 1
        break
      }
    }
    if (middle + i + 1 < pattern.length - 1) {
      if(isHorizontalReflexion(middle+i + 1, pattern)){
        result  = middle + i + 2
        break
      }
    }
    i++
  }
  return result
}

function isOdd(length) {
  return length % 2 === 0
}