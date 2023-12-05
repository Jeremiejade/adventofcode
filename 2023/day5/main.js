const fs = require('fs');

let almanacCategories = ['seeds', 'seed-to-soil map', 'soil-to-fertilizer map', 'fertilizer-to-water map', 'water-to-light map', 'light-to-temperature map', 'temperature-to-humidity map', 'humidity-to-location map'];

fs.readFile('./input', 'utf8',(err, data) => {
  const input = data.toString().split('\n');
  almanacCategories = almanacCategories.map(almanacCat => {
    return {
      cat: almanacCat,
      content: buildCorrespondence(almanacCat, input)
        .map(c => c
          .split(' ')
          .map(n => parseInt(n)))
        .sort(([,startA],[,startB]) => startA - startB)
    }
  });
  let seeds = almanacCategories.shift();

  seeds = seeds.content[0].reduce((acc, _, i) => {
    if(i%2 !== 0) {
      acc.push({
        start: seeds.content[0][i - 1],
        length: seeds.content[0][i]
      });
    }
    return acc
  },[])
    .sort(sortSeed)
  console.log('seeds', seeds)

  const result = almanacCategories.reduce((acc, { content }, index) => {
    console.log(`
==============   ${index}~~~~${almanacCategories[index].cat}~~~~${index}    ===================
    `)
    acc = getNextCatRange(
      {
        seedStart: acc[0].start,
        seedLength: acc[0].length,
        seeds: acc,
        contentContext: content[0],
        content,
      })
      .sort(sortSeed);
    console.log('reuslt =====>', acc)
    return acc
  },[...seeds])
  // console.log(result)
  console.log('result', result)

  // console.log('almanacCategories', almanacCategories)

});

function buildCorrespondence(cat, input) {
  const start = input.indexOf(`${cat}:`);
  const end = input.indexOf('', start);
  const content = [...input]
  return content.splice(start + 1, end-start - 1);
}

function getNextCatRange(
  {
   seedStart,
   seedLength,
   seedIndex = 0,
   seeds,
   contentContext: [next, catStart, catLength],
   content,
   index = 0,
   nextCatRanges = []
}
) {
 /* console.log(`
-------------> ${seedIndex}-${index}
  `)
  console.log({next, catStart, catLength})
  console.log( {seedStart, seedLength})*/
  if(seedStart === 74) {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  }
  console.log('--------------********-------------')
  console.log('--------------========-------------')

  const { action, nextCatRange } = computeNextCatRange(seedStart, seedLength ,[next, catStart, catLength]);


  if(nextCatRange) nextCatRanges.push(nextCatRange)

  console.log('content',content)
  console.log(action.name)
  console.log({next, catStart, catLength})
  console.log( {seedStart, seedLength})

  console.log('--------------========-------------')
  console.log('--------------********-------------')


  if(action.name === 'end') {
    if(seeds.length > seedIndex + 1) {

      nextCatRanges.push(...seeds.splice(seedIndex + 1, seeds.length))
    }
    return nextCatRanges;
  }
  if(action.name === 'continue') {
    return getNextCatRange(
      {
        seedStart: catStart,
        seedLength: seedLength - action.length,
        seedIndex,
        seeds,
        contentContext: content[index],
        content,
        index,
        nextCatRanges
      });
  }
  if(action.name === 'cat') {
    index++;

    if(!content[index]) content[index]= new Array(3)
    return getNextCatRange(
      {
        seedStart: seedStart + catLength,
        seedLength: action.length,
        seedIndex,
        seeds,
        contentContext: content[index],
        content,
        index,
        nextCatRanges
      });
  }
  if(action.name === 'cat-sup') {
    index++;

    if(!content[index]) content[index]= new Array(3)
    return getNextCatRange(
      {
        seedStart:  catStart + catLength,
        seedLength: action.length,
        seedIndex,
        seeds,
        contentContext: content[index],
        content,
        index,
        nextCatRanges
      });
  }
  if(action.name === 'empty-cat') {
    index++;
    if(!content[index]) content[index]= new Array(3)
    return getNextCatRange(
      {
        seedStart: seedStart,
        seedLength: action.length,
        seedIndex,
        seeds,
        contentContext: content[index],
        content,
        index,
        nextCatRanges
      });
  }
  if(action.name === 'seed') {
    seedIndex++;
    if(!seeds[seedIndex]) return nextCatRanges;
    return getNextCatRange(
      {
        seedStart: seeds[seedIndex].start,
        seedLength: seeds[seedIndex].length,
        seedIndex,
        seeds,
        contentContext: [next + seedLength, catStart + seedLength, action.length],
        content,
        index,
        nextCatRanges
      });
  }
  if(action.name === 'seed-sup') {
    seedIndex++;
    if(!seeds[seedIndex]) return nextCatRanges;
    return getNextCatRange(
      {
        seedStart: seeds[seedIndex].start,
        seedLength: seeds[seedIndex].length,
        seedIndex,
        seeds,
        contentContext: [next + (seedStart-catStart) + seedLength, catStart + (seedStart-catStart)  + seedLength, action.length],
        content,
        index,
        nextCatRanges
      });
  }
  if(action.name === 'cat-seed' || action.name === 'cat-seed-sup') {
    seedIndex++;
    if(!seeds[seedIndex]) return nextCatRanges;
    index++;
    if(!content[index]) content[index]= new Array(3)

    return getNextCatRange(
      {
        seedStart: seeds[seedIndex].start,
        seedLength: seeds[seedIndex].length,
        seedIndex,
        seeds,
        contentContext: content[index],
        content,
        index,
        nextCatRanges
      });
  }
}

function computeNextCatRange(seedStart, seedLength, [next, catStart, catLength]) {

  console.log({
    seedLength,
    seedStart,
    catStart,
    catLength
  })
  if(seedStart + seedLength < catStart || next === undefined) {
    return {
      action: {
        name: 'end'
      },
      nextCatRange:{
        start: seedStart,
        length: seedLength
      }
    }
  }
  if(seedStart > catStart + catLength) {
    return {
      action: {
        name: 'empty-cat',
        length: seedLength
      },
      nextCatRange: null
    }
  }
  if(seedStart < catStart) {
    console.log('<')

    return {
      action: {
        name: 'continue',
        length: catStart - seedStart
      },
      nextCatRange:{
        start: seedStart,
        length: catStart - seedStart
    }
    };
  }
  if(seedStart === catStart) {
    console.log('=')

    if(seedLength > catLength) {
      return {
        action: {
          name: 'cat',
          length: seedLength - catLength
        },
        nextCatRange: {
          start: next,
          length: catLength
        }
      }
    }
    return {
      action: {
        name: seedLength === catLength ? 'cat-seed' : 'seed',
        length: catLength - seedLength
      },
      nextCatRange: {
        start: next,
        length: seedLength
      }
    }
  }

  if(seedStart > catStart) {
    console.log('>')

    if(seedStart + seedLength > catStart + catLength) {
      console.log('actoin cat')

      return {
        action: {
          name: 'cat-sup',
          length: seedLength - ((catStart + catLength) - seedStart)
        },
        nextCatRange: {
          start: next + (seedStart-catStart),
          length: catLength
        }
      }
    }
    console.log('actoin seed-sup', seedStart + seedLength === catStart + catLength ? 'cat-seed-sup' : 'seed-sup')
    console.log({
      start: next + (seedStart-catStart),
      length: catLength,
      seedLength
    })
    return {
      action: {
        name:  seedStart + seedLength === catStart + catLength ? 'cat-seed-sup' : 'seed-sup',
        length: catLength - seedLength - (seedStart-catStart)
      },
      nextCatRange: {
        start: next + (seedStart-catStart),
        length: seedLength
      }
    }
  }

}

function sortSeed ({start: startA}, {start:startB}) {
 return startA - startB
}

/*function findLocationFromSeed(seed, almanacCategories){
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
}*/
