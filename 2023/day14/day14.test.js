import { describe, expect, it } from 'vitest'
import * as _ from 'lodash'

function findCycle(pattern) {
  let results = [[]];
  let p = 0;
  let result = 0;
  let newPattern = pattern;
  let finalLoad = 0;
  while (true) {
    result = compute(newPattern)
    results.map(r => {
      r.push(result)
      return r
    })
    results.push([])
    const firstStepAndCycle = compareDeepArray(results)

    if(firstStepAndCycle) {
      const cycleLength = firstStepAndCycle.cycle.length;
      let totalCycle = 1000000000 - firstStepAndCycle.firstStep.length;
      const lastStep = totalCycle % cycleLength
      finalLoad = firstStepAndCycle.cycle[lastStep]
      break
    }
    p++
    newPattern = cycle(newPattern)
  }
  return finalLoad;
}

function compareDeepArray(results) {
  let equalArray = null;
  for (let index = 0; index < results.length; index++) {
    const result = results[index];
    if(result.length > 3) {
      const arrayList = results.filter((r,i) => {
        return i !== index;
      });
      equalArray = arrayList.find(a =>  _.isEqual(a.slice(result.length), [...result, ...result]));
    }
    if(equalArray) return { firstStep: results[0], cycle: result}
  }
  return equalArray
}

function compute(pattern) {
  const rowLength = pattern[0].length;
  let result = 0
  for (let i = 0; i < rowLength; i++) {
    result += c(i, pattern)
  }
  return result;
}

function c(index, data) {
  let result = 0;
  data.forEach((line, i) => {
    const element = line[index];
    if(element === 'O') {
      result += data.length - i;
    }
  })
  return result;
}

function cycleMaker(pattern, length) {
  let result = pattern;
  for (let i = 0; i < length; i++) {
    result = cycle(result);
  }
  return result
}

function cycle(pattern) {
  let result = reverseToNorth(pattern)
   result = reverseToWest(result)
   result = reverseToSud(result)
    return reverseToEst(result)
}

function reverseToWest(pattern) {
  const newPattern = createNewPattern(pattern)
  pattern.forEach((row, index) => {
    let position = -1;
    row.forEach((r, i) => {
      if(r === 'O'){
        position++
        newPattern[index].splice(position, 1, r)
      }
      if(r === '#'){
        position = i;
        newPattern[index].splice(position, 1, r)
      }
    })
  })
  return newPattern
}

function reverseToEst(pattern) {
  const newPattern = createNewPattern(pattern)
  pattern.forEach((row, index) => {
    let position = -1;
    row.reverse().forEach((r, i) => {
      if(r === 'O'){
        position++
        newPattern[index].splice(position, 1, r)
      }
      if(r === '#'){
        position = i;
        newPattern[index].splice(position, 1, r)
      }
    })
  })
  return newPattern.map(row => row.reverse())
}

function reverseToSud(pattern) {
  const newPattern = createNewPattern(pattern)
  const rowLength = pattern[0].length
  pattern.reverse()

  for (let i = 0; i < rowLength; i++) {
    let position = -1;
    pattern.forEach((row, index)=> {
      const r = row[i];
      if(r === 'O'){
        position++
        newPattern[position].splice(i, 1, r)
      }
      if(r === '#'){
        position = index;
        newPattern[position].splice(i, 1, r)
      }
    })
  }
  return newPattern.reverse()
}

function reverseToNorth(pattern) {
  const newPattern = createNewPattern(pattern)
  const rowLength = pattern[0].length

  for (let i = 0; i < rowLength; i++) {
    let position = -1;
    pattern.forEach((row, index)=> {
      const r = row[i];
      if(r === 'O'){
        position++
        newPattern[position].splice(i, 1, r)
      }
      if(r === '#'){
        position = index;
        newPattern[position].splice(i, 1, r)
      }
    })
  }
  return newPattern
}


function createNewPattern(pattern) {
  return pattern.reduce((acc, row) => {
    acc.push(new Array(row.length));
    return acc;
  }, [])
}

describe('day14 | 2', () => {
  describe('#reverse', ()=> {
    it('should reverse to west', () => {
      const pattern = [
        ['.','O','#','.','O'],
        ['.','.','O','O','.'],
        ['.','#','.','O','O'],
      ];

      const result = reverseToWest(pattern);

      expect(result).to.deep.equal([
        ['O',undefined,'#','O',undefined],
        ['O','O',undefined,undefined,undefined],
        [undefined,'#','O','O',undefined],
      ])
    });

    it('should reverse to est', () => {
      const pattern = [
        ['O','.','#','O','.'],
        ['.','O','O','.','.'],
        ['O','O','.','#','.'],
      ];

      const result = reverseToEst(pattern);

      expect(result).to.deep.equal([
        [undefined,'O','#',undefined,'O'],
        [undefined,undefined,undefined,'O','O'],
        [undefined,'O','O','#',undefined],
      ])
    });

    it('should reverse to sud', () => {
      const pattern = [
        ['.','O','O',],
        ['O','.','O',],
        ['O','#','.',],
        ['.','O','#',],
        ['.','.','.',],
      ];

      const result = reverseToSud(pattern);

      expect(result).to.deep.equal([
        [undefined,undefined,undefined,],
        [undefined,'O','O',],
        [undefined,'#','O',],
        ['O',undefined,'#',],
        ['O','O',undefined,],
      ])
    });

    it('should reverse to north', () => {
      const pattern = [
        ['.','.','.',],
        ['.','O','#',],
        ['O','#','.',],
        ['O','.','O',],
        ['.','O','O',],
      ];

      const result = reverseToNorth(pattern);

      expect(result).to.deep.equal([
        ['O','O',undefined,],
        ['O',undefined,'#',],
        [undefined,'#','O',],
        [undefined,'O','O',],
        [undefined,undefined,undefined,],
      ])
    });
  });
  describe('#Cycle', () => {
    it('should return one cycle', () => {
      const input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`.trim().split('\n')
        .map(l=> l.split(''))
      const expectedResult = `.....#....
....#...O#
...OO##...
.OO#......
.....OOO#.
.O#...O#.#
....O#....
......OOOO
#...O###..
#..OO#....`.trim().split('\n')
        .map(l=> l.split('').map(l=> {
          if(l==='.') return undefined
          return l
        }));

      const result = cycle(input)

      expect(result).to.deep.equal(expectedResult)
    });

    it('should return three cycle', () => {
      const input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`.trim().split('\n')
        .map(l=> l.split(''))
      const expectedResult = `.....#....
....#...O#
.....##...
..O#......
.....OOO#.
.O#...O#.#
....O#...O
.......OOO
#...O###.O
#.OOO#...O`.trim().split('\n')
        .map(l=> l.split('').map(l=> {
          if(l==='.') return undefined
          return l
        }));

      const result = cycleMaker(input, 3)

      expect(result).to.deep.equal(expectedResult)
    });

    it('should find load after `1000000000` cycle', () => {
      const input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`.trim().split('\n')
        .map(l=> l.split(''))

      const result = findCycle(input)

      expect(result).toBe(64)
    });
  })
})