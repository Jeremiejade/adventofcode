import { describe, expect, it } from 'vitest'

function isVerticalReflexion(index, pattern) {
  let i = 0;
  let result = true;
  while (true) {
    if(index-i < 0 || index + i + 1 > pattern[0].length -1) {
      break;
    }
    if(!pattern.every(line => {
      return line[index - i] === line[index + i + 1]
    })){
      result = false;
      break;
    }
    i++
  }
  return result
}

function isHorizontalReflexion(index, pattern) {
  let i = 0;
  let result = true;
  while (true) {
    if(index-i < 0 || index + i + 1 > pattern.length -1) {
      break;
    }
    if(!everyColumn(index - i ,index + i + 1, pattern)){
      result = false
      break;
    }
    i++
  }
  return result
}

function everyColumn(index,compareIndex, pattern) {
  if(!pattern[compareIndex] ) {
    return false
  }
  for (let i = 0; i < pattern[0].length; i++) {
    if(pattern[index][i] !== pattern[compareIndex][i]) {
      return false
    }
  }
  return true;
}
function findVerticalReflection(pattern) {
  let middle = Math.floor(pattern[0].length / 2);
  if(isOdd(pattern[0].length)){
    middle--
  }
  let i = 0;
  let result = null
  while(true) {
    if(middle - i < 0 && middle + i + 1 > pattern[0].length - 2){
      break
    }
    if(middle - i >= 0) {
      if(isVerticalReflexion(middle-i, pattern)){
        result =  middle - i + 1
        break
      }
    }
    if (middle + i + 1 < pattern[0].length - 1) {
      if(isVerticalReflexion(middle + i + 1, pattern)){
        result  = middle + i + 2
        break
      }
    }
    i++
  }
  return result
}

function findHorizontalReflection(pattern) {
  // if(!!endV) return endH = null;
  let middle = Math.floor(pattern.length / 2);
  if(isOdd(pattern.length)){
    middle--
  }
  let i = 0;
  let result = null
  while(true) {
    console.log({i, length: pattern.length, middle})
    if(middle - i < 0 && middle + i + 1 > pattern.length - 2){
      break
    }
    if(middle - i >= 0) {
      if(isHorizontalReflexion(middle-i, pattern)){
        result =  middle - i + 1
          break
      }
    }
    if (middle + i + 1 < pattern.length - 1) {
      if(isHorizontalReflexion(middle+i + 1, pattern)){
        result  = middle + i + 2
        break
      }
    }
    i++
  }
  return result
}

function isOdd(length) {
  return length % 2 === 0
}

describe('day13 | 1', () => {
  describe('#isVerticalReflexion', () => {
    const cases = [
      {
        pattern: [
          [1, 0, 0, 1, 1, 0],
          [1, 0, 0, 1, 0, 1],
          [1, 0, 0, 1, 1, 0]
        ], index: 0, expected: false
      },
      {
        pattern: [
          [1, 0, 0, 1, 1, 0],
          [1, 0, 0, 1, 0, 1],
          [1, 0, 0, 1, 1, 0]
        ], index: 1, expected: true
      },
      {
        pattern: [
          [1, 0, 0, 1, 1, 0],
          [1, 0, 0, 1, 0, 1],
          [1, 0, 0, 1, 1, 0]
        ], index: 2, expected: false
      },
      {
        pattern: [
          [1, 0, 0, 1, 1, 0],
          [1, 0, 0, 1, 0, 1],
          [1, 0, 0, 1, 1, 0]
        ], index: 3, expected: false
      },
      {
        pattern: [
          [1, 0, 0, 1, 1, 0],
          [1, 0, 0, 1, 0, 1],
          [1, 0, 0, 1, 1, 0]
        ], index: 4, expected: false
      },
      {
        pattern: [
          [1, 1, 0, 0, 1],
          [0, 0, 1, 1, 0],
          [1, 1, 0, 0, 1]
        ], index: 2, expected: true
      },
      {
        pattern: [
          [1, 0, 0, 1, 1],
          [0, 0, 1, 1, 0],
          [1, 0, 0, 1, 1]
        ], index: 0, expected: false
      },
      {
        pattern: [
          [1, 0, 0, 1],
          [0, 1, 1, 0],
          [1, 0, 0, 1]
        ], index: 1, expected: true
      },
      {
        pattern: [
          ['.', '#', '.', '.', '#', '#', '#', '#', '.', '.', '.'],
          ['#', '#', '#', '#', '.', '#', '#', '.', '#', '#', '#'],
          ['.', '#', '#', '.', '#', '.', '.', '.', '#', '#', '#'],
          ['#', '#', '.', '.', '.', '.', '.', '.', '#', '#', '#'],
          ['#', '#', '#', '#', '#', '#', '#', '.', '#', '.', '.'],
          ['#', '#', '#', '#', '#', '#', '#', '.', '#', '.', '.'],
          ['#', '.', '.', '.', '.', '.', '.', '.', '#', '#', '#'],
          ['.', '#', '#', '.', '#', '.', '.', '.', '#', '#', '#'],
          ['#', '#', '#', '#', '.', '#', '#', '.', '#', '#', '#'],
          ['.', '#', '.', '.', '#', '#', '#', '#', '.', '.', '.'],
          ['#', '.', '.', '.', '#', '#', '#', '.', '.', '.', '.'],
          ['.', '#', '#', '.', '.', '.', '.', '#', '.', '.', '.'],
          ['#', '#', '#', '.', '.', '#', '#', '.', '#', '#', '#'],
          ['.', '#', '#', '.', '.', '.', '#', '.', '.', '#', '#'],
          ['.', '.', '#', '#', '.', '#', '#', '#', '.', '#', '#']
        ], index: 9, expected: true
      },
    ]

    cases.forEach(({pattern, index, expected}) => {
      it(`should return ${expected} for ${pattern}`, () => {
        const result = isVerticalReflexion(index, pattern)

        expect(result).toBe(expected)
      })
    })
  })
  describe('#findVerticalReflexion', () => {
    const cases = [
      {
        pattern: [
          [1,2,2,1,5,6,7,8,9,10],
          [1,2,2,1,5,6,7,8,9,10],
        ], expected: 2
      },
      {
        pattern: [
          [1,2,3,4,5,5,4,3,2,1],
          [1,2,3,4,5,5,4,3,2,1],
        ], expected: 5
      },
      {
        pattern: [
          [1,2,3,4,5,6,7,8,8,7],
          [1,2,3,4,5,6,7,8,8,7],
        ], expected: 8
      },
      {
        pattern: [
          [1,2,3,4,5,6,7,8,9,10,10],
          [1,2,3,4,5,6,7,8,9,10,10],
        ], expected: 10
      },
      {
        pattern: [
          [1, 0, 0, 1],
          [0, 1, 1, 0],
          [1, 0, 1, 0]
        ], expected: null
      },
      {
        pattern: [
          ['.', '#', '.', '.', '#', '#', '#', '#', '.', '.', '.'],
          ['#', '#', '#', '#', '.', '#', '#', '.', '#', '#', '#'],
          ['.', '#', '#', '.', '#', '.', '.', '.', '#', '#', '#'],
          ['#', '#', '.', '.', '.', '.', '.', '.', '#', '#', '#'],
          ['#', '#', '#', '#', '#', '#', '#', '.', '#', '.', '.'],
          ['#', '#', '#', '#', '#', '#', '#', '.', '#', '.', '.'],
          ['#', '.', '.', '.', '.', '.', '.', '.', '#', '#', '#'],
          ['.', '#', '#', '.', '#', '.', '.', '.', '#', '#', '#'],
          ['#', '#', '#', '#', '.', '#', '#', '.', '#', '#', '#'],
          ['.', '#', '.', '.', '#', '#', '#', '#', '.', '.', '.'],
          ['#', '.', '.', '.', '#', '#', '#', '.', '.', '.', '.'],
          ['.', '#', '#', '.', '.', '.', '.', '#', '.', '.', '.'],
          ['#', '#', '#', '.', '.', '#', '#', '.', '#', '#', '#'],
          ['.', '#', '#', '.', '.', '.', '#', '.', '.', '#', '#'],
          ['.', '.', '#', '#', '.', '#', '#', '#', '.', '#', '#']
        ], expected: 10
      },
    ]

    cases.forEach(({pattern, expected}) => {
      it(`should return ${expected} for ${pattern}`, () => {
        const result = findVerticalReflection(pattern)

        expect(result).toBe(expected)
      })
    })
  })
  describe('#isHorizontalReflexion', () => {

    const cases = [
      {
        pattern: [
          [1, 0, 0, 1, 1],
          [1, 0, 0, 1, 0],
          [1, 0, 0, 1, 0],
          [1, 0, 0, 1, 1],
          [1, 0, 0, 1, 1],
        ], index: 0, expected: false
      },
      {
        pattern: [
          [1, 0, 0, 1, 3],
          [1, 0, 0, 1, 0],
          [1, 0, 0, 1, 0],
          [1, 0, 0, 1, 3],
          [1, 0, 0, 1, 4],
        ], index: 1, expected: true
      },
      {
        pattern: [
          [1, 0, 0, 1, 1],
          [1, 0, 0, 1, 0],
          [1, 0, 0, 1, 0],
          [1, 0, 0, 1, 1],
          [1, 0, 0, 1, 1],
        ], index: 2, expected: false
      },
      {
        pattern: [
          [1, 0, 0, 1, 1],
          [1, 0, 0, 1, 0],
          [1, 0, 0, 1, 0],
          [1, 0, 0, 1, 1],
          [1, 0, 0, 1, 1],
        ], index: 3, expected: true
      },
      {
        pattern: [
          ['.', '#', '.', '.', '#', '#', '.', '#', '.', '#', '#'],
          ['#', '.', '#', '#', '#', '.', '.', '.', '.', '#', '.'],
          ['.', '.', '#', '.', '.', '.', '#', '#', '.', '.', '#'],
          ['.', '#', '#', '#', '.', '#', '.', '.', '#', '.', '#'],
          ['#', '.', '#', '.', '#', '#', '#', '#', '.', '#', '#'],
          ['#', '.', '#', '.', '#', '#', '#', '#', '.', '#', '#'],
          ['.', '#', '#', '#', '.', '#', '.', '.', '#', '.', '#'],
          ['.', '.', '#', '.', '.', '.', 'A', '#', '.', '.', '#'],
          ['#', '.', '#', '#', '#', '.', '.', '.', '.', '#', '.'],
          ['.', '#', '.', '.', '#', '#', '.', '#', '.', '#', '#'],
          ['.', '#', '.', '.', '#', '#', '.', '#', '.', '#', '#'],
          ['#', '.', '#', '#', '#', '.', '.', '.', '.', '#', '.'],
          ['.', '.', '#', '.', '.', '.', '.', '#', '.', '.', '#']
        ]
        , index: 4, expected: false
      },
      {
        pattern: [
          ['.', '#', '.', '.', '#', '#', '.', '#', '.', '#', '#'],
          ['#', '.', '#', '#', '#', '.', '.', '.', '.', '#', '.'],
          ['.', '.', '#', '.', '.', '.', '#', '#', '.', '.', '#'],
          ['.', '#', '#', '#', '.', '#', '.', '.', '#', '.', '#'],
          ['#', '.', '#', '.', '#', '#', '#', '#', '.', '#', '#'],
          ['#', '.', '#', '.', '#', '#', '#', '#', '.', '#', '#'],
          ['.', '#', '#', '#', '.', '#', '.', '.', '#', '.', '#'],
          ['.', '.', '#', '.', '.', '.', '.', '#', '.', '.', '#'],
          ['#', '.', '#', '#', '#', '.', '.', '.', '.', '#', '.'],
          ['.', '#', '.', '.', '#', '#', '.', '#', '.', '#', '#'],
          ['.', '#', '.', '.', '#', '#', '.', '#', '.', '#', '#'],
          ['#', '.', '#', '#', '#', '.', '.', '.', '.', '#', '.'],
          ['.', '.', '#', '.', '.', '.', '.', '#', '.', '.', '#']
        ]
        , index: 9, expected: true
      },
    ]

    cases.forEach(({pattern, index, expected}) => {
      it(`should return ${expected} for ${pattern} and index is ${index}`, () => {
        const result = isHorizontalReflexion(index, pattern)
        expect(result).toBe(expected)
      })
    })
  })
  describe('#findHorizontalReflexion', () => {
    const cases = [
      {
        pattern: [
          [1,1,1],
          [2,2,2],
          [3,3,3],
          [4,4,4],
          [4,4,4],
          [3,3,3],
          [2,2,2],
          [1,1,1],
        ],
        expected: 4
      },
      {
        pattern: [
          [1,1,1],
          [2,2,2],
          [3,3,3],
          [4,4,4],
          [5,5,5],
          [6,6,6],
          [6,6,6],
          [5,5,5],
        ],
        expected: 6
      },
      {
        pattern: [
          [1,1,1],
          [1,1,1],
          [2,2,2],
          [3,3,3],
          [4,4,4],
          [5,5,5],
          [6,6,6],
          [7,7,7],
          [8,8,8],
        ],
        expected: 1
      },
      {
        pattern: [
          ['.', '#', '.', '.', '#', '#', '.', '#', '.', '#', '#'],
          ['#', '.', '#', '#', '#', '.', '.', '.', '.', '#', '.'],
          ['.', '.', '#', '.', '.', '.', '#', '#', '.', '.', '#'],
          ['.', '#', '#', '#', '.', '#', '.', '.', '#', '.', '#'],
          ['#', '.', '#', '.', '#', '#', '#', '#', '.', '#', '#'],
          ['#', '.', '#', '.', '#', '#', '#', '#', '.', '#', '#'],
          ['.', '#', '#', '#', '.', '#', '.', '.', '#', '.', '#'],
          ['.', '.', '#', '.', '.', '.', '.', '#', '.', '.', '#'],
          ['#', '.', '#', '#', '#', '.', '.', '.', '.', '#', '.'],
          ['.', '#', '.', '.', '#', '#', '.', '#', '.', '#', '#'],
          ['.', '#', '.', '.', '#', '#', '.', '#', '.', '#', '#'],
          ['#', '.', '#', '#', '#', '.', '.', '.', '.', '#', '.'],
          ['.', '.', '#', '.', '.', '.', '.', '#', '.', '.', '#']
        ]
        , expected: 10
      },
    ]

    cases.forEach(({pattern, expected}) => {
      it(`should return ${expected} for ${pattern}`, () => {
        const result = findHorizontalReflection(pattern)

        expect(result).toBe(expected)
      })
    })
  })

})