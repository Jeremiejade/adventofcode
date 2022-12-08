const fs = require('fs');

const data = fs.readFileSync('./input', {encoding:'utf8'});
const results = data.trim().split('\n');

const notes = results.reduce((acc, string) => {
  const [part1, part2] = splitString(string);
  const char = findCharacter(part1, part2);
  return acc + getPriority(char)
},0);

function splitString(string){
  const length = string.length;
  const part1 = string.substring(0, length/2)
  const part2 = string.substring(length/2, length)
  return [part1, part2]
}

function findCharacter(part1, part2) {
  const parts1 = part1.split('');
  const parts2 = part2.split('');
  return parts1.find(part => parts2.includes(part))
}

function getPriority(letter) {
  const charCode = letter.charCodeAt(0);
  if(charCode > 96) return charCode - 96
  return (charCode - 64) + 26
}

///////////////////

function findChar(str1, str2, str3) {
  const arr1 = str1.split('');
  const arr2 = str2.split('');
  const arr3 = str3.split('');
  return arr1.find(str => arr2.includes(str) && arr3.includes(str));
}


const prio = results.reduce((acc, string, index, arr) => {
 if((index +1) % 3 === 0) {
   const char = findChar(arr[index], arr[index-1], arr[index-2]);
   return acc + getPriority(char);
 }
 return acc;
},0);

console.log(prio)

