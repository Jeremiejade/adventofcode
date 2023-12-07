import { describe, expect, it } from 'vitest'
import {findType} from "./main.js";

describe('day7 | part-two', () => {

  describe('#findType', () => {
    const cases = [
      { hand: [1,1,1,1,1], expected: 6 },
      { hand: [1,1,1,1,2], expected: 6 },

      { hand: [1,1,1,2,2], expected: 6 },
      { hand: [1,1,1,3,2], expected: 5 },
      { hand: [1,1,2,2,2], expected: 6 },
      { hand: [1,1,3,3,2], expected: 5 },
      { hand: [1,1,4,3,2], expected: 3 },
      { hand: [1,3,3,3,3], expected: 6 },
      { hand: [3,3,3,3,3], expected: 6 },
      { hand: [1,3,3,3,2], expected: 5 },
      { hand: [3,3,3,3,2], expected: 5 },
      { hand: [1,3,3,2,2], expected: 4 },
      { hand: [3,3,3,2,2], expected: 4 },
      { hand: [1,3,3,5,6], expected: 3 },
      { hand: [3,3,3,5,6], expected: 3 },
      { hand: [1,2,3,5,6], expected: 1 },
      { hand: [9,2,3,5,6], expected: 0 },
      { hand: [2,2,3,3,6], expected: 2 },

    ]

    cases.forEach(({ hand, expected }) => {
      it(`should return ${expected} for ${hand}`, () => {
        const result = findType(hand)

        expect(result).toBe(expected)
      })
    })
  })
})