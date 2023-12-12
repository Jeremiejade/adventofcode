const fs = require('fs');

let allPossibilities = []

fs.readFile('./input', 'utf8',(err, data) => {
 const fData =  data.toString().trim().split('\n')
   .map(line => line.split(' '))
   .map(([row, damagedGroup])=>{
     return [row, damagedGroup.split(',').map(n => parseInt(n))]
   });
  const r = fData.reduce((acc, [row, damagedGroup]) => {
      return acc + findArrangements(row, damagedGroup)
  }, 0)
  console.log(r)
});

function findArrangements(row, damagedGroup) {
  allPossibilities = []
  findAllPossibilities(row.split(''))
  let regex = damagedGroup.reduce((acc, d, i)=> {
    if(i === damagedGroup.length -1){
      return acc + `\\#{${d}}`
    }
    return acc + `\\#{${d}}\\.+`
  }, '');
  regex = new RegExp(`(^\\.+${regex}\\.+$)|(^\\.+${regex}$)|(^${regex}\\.+$)|(^${regex}$)`, 'g')
  const result =  allPossibilities.reduce((acc, possibility)=> {
    const r = findArrangementsByType(possibility, regex)
    if(r) acc.push(r)
    return acc
  }, [])
  return result.length
}

function findArrangementsByType(row, regex) {
  const r = [...row.matchAll(regex)]
    .filter(([r])=> !!r)
  if(r.length) {
    return {r: r[0][0], i:r[0].index}
  }
  return null
}

function findAllPossibilities(row, index = 0, possibility = []) {
  if(index > row.length - 1) {
    allPossibilities.push(possibility.join(''))
    return;
  }
  const piece = row[index];
  index++
  if(piece === '.' || piece === '#') {
    possibility.push(piece)
    findAllPossibilities(row, index, possibility)
  }else {
    findAllPossibilities(row, index, [...possibility, '.'])
    findAllPossibilities(row, index, [...possibility, '#'])
  }
}