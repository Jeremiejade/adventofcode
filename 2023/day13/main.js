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


let endV = false;
let endH = false;
function findReflection(pattern, i) {
  const v = findVerticalReflection(pattern)

  if(v) {

    return v
  }
  const h = findHorizontalReflection(pattern)
  if(!h) {
    console.log('*******************************')
    console.log({pattern, i})
    console.log('----------------------------')

  }
  return h*100;
}

function isVerticalReflexion(index, pattern) {
  let i = 0;
  let result = true;
  while (true) {
    if(index-i < 0 || index + i + 1 > pattern[0].length -1) {
      break;
    }
    if(!pattern.every(line => {
      return line[index - i] === line[index + i + 1]
    })){
      result = false;
      break;
    }
    i++
  }
  return result
}

function isHorizontalReflexion(index, pattern) {
  let i = 0;
  let result = true;
  while (true) {
    if(index-i < 0 || index + i + 1 > pattern.length -1) {
      break;
    }
    if(!everyColumn(index - i ,index + i + 1, pattern)){
      result = false
      break;
    }
    i++
  }
  return result
}

function everyColumn(index,compareIndex, pattern) {
  if(!pattern[compareIndex] ) {
    return false
  }
  for (let i = 0; i < pattern[0].length; i++) {
    if(pattern[index][i] !== pattern[compareIndex][i]) {
      return false
    }
  }
  return true;
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
  // if(!!endV) return endH = null;
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