const fs = require('fs');


fs.readFile('./input', 'utf8',(err, data) => {
 const input =  data.toString().trim().split('\n').filter(d => d.trim() !== '')
 const entries =  input.shift().trim().split('');
 const paths = input.map(line => line.match(/[a-zA-z]{3}/g))
   .reduce((acc, [path, L, R]) => {
    acc[path] = { L, R }
    return acc
   }, {})

 let arrive = 'AAA'
 let index = 0
 while (arrive !== 'ZZZ') {
  const i = index % entries.length;
  const direction = entries[i]
  arrive = paths[arrive][direction]
  index++
 }
  console.log(entries, paths, index)
});
