const fs = require('fs');

let almanacCategories = ['seeds', 'seed-to-soil map', 'soil-to-fertilizer map', 'fertilizer-to-water map', 'water-to-light map', 'light-to-temperature map', 'temperature-to-humidity map', 'humidity-to-location map'];

fs.readFile('./input', 'utf8',(err, data) => {
  const input = data.toString().split('\n');
  almanacCategories = almanacCategories.map(almanacCat => {
    return {
      cat: almanacCat,
      content: buildCorrespondence(almanacCat, input).map(c => c.split(' ').map(n => parseInt(n)))
    }
  });
  let seed = almanacCategories.shift();
  const result = seed.content[0].map(s => findLocationFromSeed(s, almanacCategories))

  console.log('result', result)

});

function buildCorrespondence(cat, input) {
  const start = input.indexOf(`${cat}:`);
  const end = input.indexOf('', start);
  const content = [...input]
  return content.splice(start + 1, end-start - 1);
}

function findLocationFromSeed(seed, almanacCategories){
  let location = seed;
  almanacCategories.forEach(({content}) => {
    location = findNextCat(location, content);
  });
  return location;
}

function findNextCat(cat, content) {
  let nextCat = cat;
  content.forEach(([next, old, length])=> {
    const range = cat - old;
    if(range >= 0 && range <= length) {
      nextCat = cat + next - old;
    }
  });
  return nextCat
}