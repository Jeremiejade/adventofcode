const fs = require('fs');
const _ = require('lodash')

const input = fs.readFileSync('./input', {encoding:'utf8'});
const inputChars = input.split('');

let response;

for (let i = 0; i < inputChars.length; i++) {
  const chars = getLastChars(i, 14, inputChars)
 if((_.uniq(chars)).length === chars.length) {
   if(!response) response = i+ 14
 }
}

function getLastChars(i, lengthValue, arr) {
  return arr.slice(i, i+lengthValue)
}

console.log(response)
