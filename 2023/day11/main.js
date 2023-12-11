const fs = require('fs');

fs.readFile('./input', 'utf8',(err, data) => {
 const fData =  data.toString().trim().split('\n')
   .map(line => line.split(''));
  const galaxies = findGalaxies(fData);
  const emptyLineIndex = findEmptyLineIndex(fData);
  const emptyColumnIndex = findEmptyColumnIndex(fData)
  const spaceExpand = 1000000;
  const result = galaxies.reduce((acc, {x, y}, i)=> {
    if( i+1 ===  galaxies.length) return acc
    for (let j = i+ 1; j < galaxies.length; j++) {
      const g = getCoordinatesBySpaceExpand({x, y, spaceExpand, emptyLineIndex, emptyColumnIndex})
      const otherGalaxy = getCoordinatesBySpaceExpand({...galaxies[j], spaceExpand, emptyLineIndex, emptyColumnIndex});
      acc += difference(otherGalaxy.y, g.y) + difference(otherGalaxy.x, g.x)
    }
    return acc
  }, 0)
  console.log(result)
});

function difference(a, b) {
  return Math.abs(a - b);
}

function getCoordinatesBySpaceExpand({x, y, spaceExpand, emptyLineIndex, emptyColumnIndex}) {
  return {
    x: getIndexBySpaceExpand(x, emptyColumnIndex, spaceExpand),
    y: getIndexBySpaceExpand(y, emptyLineIndex, spaceExpand)
  }
}

function getIndexBySpaceExpand(index, emptySpaceIndex, spaceExpand) {
  return emptySpaceIndex.reduce((acc, es) => {
    if(es < index) {
      return acc + spaceExpand - 1
    }
    return acc;
  }, index)
}

function findEmptyLineIndex(fData) {
  return fData.reduce((acc, line, i) => {
    if(line.indexOf('#') === -1){
      acc.push(i);
    }
    return acc;
  },[]);
}

function findEmptyColumnIndex(fData) {
  const line = fData[0];
  return line.reduce((acc, _, i) => {
    if(fData.every(line => {
      return line[i] === '.'
    })){
      acc.push(i);
    }
    return acc
  },[]);
}

function findGalaxies(skyMap) {
 return  skyMap.reduce((acc, line, i)=> {
   const galaxiesMatch = line.join('').matchAll(/(#)/g);
   const galaxies = [...galaxiesMatch].map(({ index })=> ({x: index, y: i}));
    acc.push(...galaxies);
    return acc
  },[])
}
