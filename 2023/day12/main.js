const fs = require('fs');

let allPossibilities = 0
let allPossibilityMemory = []

fs.readFile('./input', 'utf8',(err, data) => {
  data.toString().trim().split('\n')
   .map(line => line.split(' '))
   .map(([row, damagedGroup])=>{
     return [row, damagedGroup.split(',').map(n => parseInt(n))]
   })
   .forEach(([row, damagedGroup])=> {
     const newRow = getNewRow(row)
     const newDamagedGroup = getNewDamagedGroup(damagedGroup)
     const firstDamagedGroup = newDamagedGroup[0];
     const regex = buildRegex(firstDamagedGroup, 0)
     console.log(newDamagedGroup, newRow)
     findAllPossibilities(newRow, newDamagedGroup, firstDamagedGroup, regex)
   })


  console.log(allPossibilities)
});

/*
function findArrangements(row, damagedGroup) {
  const broken = [...row.matchAll(/(#*)/g)]
    .filter(([r])=> !!r)
    .map((r)=> {
      return {
        group: r[0],
        index: r.index
      }
    });
/!*  const minLengthMatch = damagedGroup.reduce((acc, g) => {
    return acc + g;
  },0) + broken.length - 1;*!/
const firstDamagedGroup = damagedGroup[0];
  const regex = buildRegex(firstDamagedGroup)
  console.log('reg', regex)
  findAllPossibilities(row, damagedGroup, firstDamagedGroup, regex)
  console.log(allPossibilities)


}
*/

function getNewRow(row) {
  const newRow = []
  for (let i = 0; i < 5; i++) {
    newRow.push(row)
  }
  return newRow.join('?')
}

function getNewDamagedGroup(damagedGroup) {
  const newDamagedGroup = []
  for (let i = 0; i < 5; i++) {
    newDamagedGroup.push(...damagedGroup)
  }
  return newDamagedGroup
}



function findAllPossibilities(row, damagedGroup, d, {regex, regexpRealMatch}, damagedGroupIndex = 0, index = 0, possibility = '') {
  const piece = row[index];
  index++

  const partialMatch = possibility.match(regex) !== null;
  const totalMatch = possibility.match(regexpRealMatch) !== null
  if((partialMatch && !totalMatch) || possibility === '' ) {
    if (!piece) return

    if(piece === '.' || piece === '#') {
      possibility+= piece;
      findAllPossibilities(row, damagedGroup, d, {regex, regexpRealMatch}, damagedGroupIndex, index, possibility)
    }else {
      findAllPossibilities(row, damagedGroup, d, {regex, regexpRealMatch}, damagedGroupIndex, index, possibility + '.');
      findAllPossibilities(row, damagedGroup, d, {regex, regexpRealMatch}, damagedGroupIndex, index, possibility + '#');
    }
    return
  }
  if(!totalMatch) return


  if(damagedGroupIndex === damagedGroup.length - 1 ) {
    const rest = row.substring(index-1)
    if(rest.indexOf('#') === -1) {
      allPossibilities++
    }
    return
  }
  damagedGroupIndex++;
  const newD = damagedGroup[damagedGroupIndex]
  const newRegex = buildRegex(newD, damagedGroupIndex)

  if (!piece) return
  if(piece === '.' || piece === '#') {
    findAllPossibilities(row, damagedGroup, newD, newRegex, damagedGroupIndex, index, piece)
  }else {
    findAllPossibilities(row, damagedGroup, newD, newRegex, damagedGroupIndex, index, '.');
    findAllPossibilities(row, damagedGroup, newD, newRegex, damagedGroupIndex, index, '#');
  }

}

function buildRegex(d, index) {
  let regex = '(^\\.+)';
  let regexpRealMatch;
  if(d === 1) {
    if(index !== 0){
      return  {
        regex: new RegExp('(^\\.+$)', 'g'),
        regexpRealMatch: new RegExp(`(^\\.+#$)`, 'g'),
      }
    }
   return  {
     regex: new RegExp('(^\\.+$)', 'g'),
     regexpRealMatch: new RegExp(`(^#$)|(^\\.+#$)`, 'g'),
    }

  }
  if(index !== 0) {
    for (let i = 1; i <= d; i++) {
      if(d === i) {
        regexpRealMatch =  new RegExp(`(^\\.+#{${i}}$)`, 'g')
      }else {
        regex = `(^\\.+#{${i}}$)|` + regex
      }
    }
    return { regex: new RegExp(regex, 'g'), regexpRealMatch}
  }

  for (let i = 1; i <= d; i++) {
    if(d === i) {
      regexpRealMatch =  new RegExp(`(^#{${i}}$)|(^\\.+#{${i}}$)`, 'g')
    }else {
      regex = `(^#{${i}}$)|(^\\.+#{${i}}$)|` + regex
    }
  }
  return { regex: new RegExp(regex, 'g'), regexpRealMatch}
}
