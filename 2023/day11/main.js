const fs = require('fs');

fs.readFile('./input', 'utf8',(err, data) => {
 const fData =  data.toString().trim().split('\n')
   .map(line => line.split(''));
 const skyMap = doubleEmptyLineAndEmptyColumn(fData)
  const galaxies = findGalaxies(skyMap)

  const result = galaxies.reduce((acc, {x, y}, i)=> {
    if( i+1 ===  galaxies.length) return acc
    for (let j = i+ 1; j < galaxies.length; j++) {
      const otherGalaxy = galaxies[j];
      acc += difference(otherGalaxy.y, y) + difference(otherGalaxy.x, x)
    }
    return acc
  }, 0)
  console.log(result)
});

function difference(a, b) {
  return Math.abs(a - b);
}

function doubleEmptyLineAndEmptyColumn(fData) {
  const skyMap = fData.reduce((acc, _, i) => {
    const index = fData.length - 1 - i
    const line = fData[index]
    if(line.indexOf('#') === -1){
      acc.push(line);
    }
    acc.push(line);
    return acc;
  },[]);
  return  doubleEmptyColumn(skyMap.reverse())
}

function doubleEmptyColumn(fData) {
  const line = [...fData[0]];
  return line.reduce((acc, _, i) => {
    const index = line.length - 1 - i
    if(fData.every(line => line[index] === '.')){
      acc = acc.map((line) => {
        line.splice(index, 0, '.');
        return line
      });
    }
    return acc
  },[...fData])
}

function findGalaxies(skyMap) {
 return  skyMap.reduce((acc, line, i)=> {
   const galaxiesMatch = line.join('').matchAll(/(#)/g);
   const galaxies = [...galaxiesMatch].map(({ index })=> ({x: index, y: i}));
    acc.push(...galaxies);
    return acc
  },[])
}
