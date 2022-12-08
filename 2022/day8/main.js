const fs = require('fs');

const input = fs.readFileSync('./input', { encoding: 'utf8' });
/*const input = `30373
25512
65332
33549
35390`*/

let lines = input.trim().split('\n');

const column = {}
for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    if (!column[j]) column[j] = []
    column[j].push(lines[i][j])
  }
}

let total = 0
/*for (let i = 1; i < lines.length - 1; i++) {
  for (let j = 1; j < lines[i].length - 1; j++) {
    const e = lines[i][j]
    if (isVisible(e, lines[i].split(''), j) || isVisible(e, column[j], i)) {
      total++
    }
  }
}

total += lines.length * 2
total += lines[0].length * 2
console.log(total - 4)
*/

function isVisible(e, line, index) {
  const a = line.slice(0, index)
  const b = line.slice(index + 1, line.length)
  const maxHeightA = a.sort((a, b) => parseInt(a) - parseInt(b)).pop();
  const maxHeightB = b.sort((a, b) => parseInt(a) - parseInt(b)).pop();
  return parseInt(e) > parseInt(maxHeightA) || parseInt(e) > parseInt(maxHeightB)
}




for (let i = 1; i < lines.length - 1; i++) {
  for (let j = 1; j < lines[i].length - 1; j++) {
    const e = lines[i][j]
    const a =viewPower(e, lines[i].split(''), j)
    const b =  viewPower(e, column[j], i)
    const result = calculate([...a, ...b])
    if(result > total) total = result
    console.log(calculate([...a, ...b]))
  }
}

console.log(total)

function viewPower(e, line, index) {
  const a = line.slice(0, index).reverse()
  const b = line.slice(index + 1, line.length)
  let distanceA = a.length
  let distanceB = b.length
  for (let i = 0; i < a.length; i++) {
    if (parseInt(a[i]) >= parseInt(e)) {
      distanceA = i + 1
      break
    }
  }
  for (let i = 0; i < b.length; i++) {
    if (parseInt(b[i]) >= parseInt(e)) {
      distanceB = i + 1
      break
    }
  }

  return [distanceA, distanceB]
}

 function calculate(arr) {
 return arr.reduce((acc, el) => el*acc, 1)
 }
