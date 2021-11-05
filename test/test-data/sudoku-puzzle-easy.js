'use strict';

module.exports = {
  input: [
    1, 3, 0, 2, 0, 0, 7, 4, 0, 0, 2, 5, 0, 1, 0, 0, 0, 0, 4, 8, 0, 0, 6, 0, 0, 5, 0, 0, 0, 0, 7, 8,
    0, 2, 1, 0, 5, 0, 0, 0, 9, 0, 3, 7, 0, 9, 0, 0, 0, 3, 0, 0, 0, 5, 0, 4, 0, 0, 0, 6, 8, 9, 0, 0,
    5, 3, 0, 0, 1, 4, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0
  ],
  puzzle: [
    [1, 3, 0, 2, 0, 0, 7, 4, 0],
    [0, 2, 5, 0, 1, 0, 0, 0, 0],
    [4, 8, 0, 0, 6, 0, 0, 5, 0],
    [0, 0, 0, 7, 8, 0, 2, 1, 0],
    [5, 0, 0, 0, 9, 0, 3, 7, 0],
    [9, 0, 0, 0, 3, 0, 0, 0, 5],
    [0, 4, 0, 0, 0, 6, 8, 9, 0],
    [0, 5, 3, 0, 0, 1, 4, 0, 0],
    [6, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  solution: [
    [1, 3, 6, 2, 5, 9, 7, 4, 8],
    [7, 2, 5, 4, 1, 8, 9, 3, 6],
    [4, 8, 9, 3, 6, 7, 1, 5, 2],
    [3, 6, 4, 7, 8, 5, 2, 1, 9],
    [5, 1, 8, 6, 9, 2, 3, 7, 4],
    [9, 7, 2, 1, 3, 4, 6, 8, 5],
    [2, 4, 1, 5, 7, 6, 8, 9, 3],
    [8, 5, 3, 9, 2, 1, 4, 6, 7],
    [6, 9, 7, 8, 4, 3, 5, 2, 1]
  ],
  // The following has wrong value in sub board #9
  // Number 1 appears in cells (8,7) and (8,8)
  wrongSolution: [
    [1, 3, 6, 2, 5, 9, 7, 4, 8],
    [7, 2, 5, 4, 1, 8, 9, 3, 6],
    [4, 8, 9, 3, 6, 7, 1, 5, 2],
    [3, 6, 4, 7, 8, 5, 2, 1, 9],
    [5, 1, 8, 6, 9, 2, 3, 7, 4],
    [9, 7, 2, 1, 3, 4, 6, 8, 5],
    [2, 4, 1, 5, 7, 6, 8, 9, 3],
    [8, 5, 3, 9, 2, 1, 4, 6, 7],
    [6, 9, 7, 8, 4, 3, 5, 1, 1]
  ],
  // The following has wrong value in sub board #1
  // Number 1 appears in cells (0,0) and (1,1)
  wrongSolution2: [
    [1, 3, 6, 2, 5, 9, 7, 4, 8],
    [7, 1, 5, 4, 1, 8, 9, 3, 6],
    [4, 8, 9, 3, 6, 7, 1, 5, 2],
    [3, 6, 4, 7, 8, 5, 2, 1, 9],
    [5, 1, 8, 6, 9, 2, 3, 7, 4],
    [9, 7, 2, 1, 3, 4, 6, 8, 5],
    [2, 4, 1, 5, 7, 6, 8, 9, 3],
    [8, 5, 3, 9, 2, 1, 4, 6, 7],
    [6, 9, 7, 8, 4, 3, 5, 2, 1]
  ],
  // The following has wrong value in sub board #1
  // Number 1 appears in cells (0,0) and (0,2)
  wrongSolution3: [
    [1, 3, 1, 2, 5, 9, 7, 4, 8],
    [7, 2, 5, 4, 1, 8, 9, 3, 6],
    [4, 8, 9, 3, 6, 7, 1, 5, 2],
    [3, 6, 4, 7, 8, 5, 2, 1, 9],
    [5, 1, 8, 6, 9, 2, 3, 7, 4],
    [9, 7, 2, 1, 3, 4, 6, 8, 5],
    [2, 4, 1, 5, 7, 6, 8, 9, 3],
    [8, 5, 3, 9, 2, 1, 4, 6, 7],
    [6, 9, 7, 8, 4, 3, 5, 2, 1]
  ],
  markup: {
    '0,2': [6, 9],
    '0,4': [5],
    '0,5': [5, 8, 9],
    '0,8': [6, 8, 9],
    '1,0': [7],
    '1,3': [3, 4, 8, 9],
    '1,5': [3, 4, 7, 8, 9],
    '1,6': [6, 9],
    '1,7': [3, 6, 8],
    '1,8': [3, 6, 8, 9],
    '2,2': [7, 9],
    '2,3': [3, 9],
    '2,5': [3, 7, 9],
    '2,6': [1, 9],
    '2,8': [1, 2, 3, 9],
    '3,0': [3],
    '3,1': [6],
    '3,2': [4, 6],
    '3,5': [4, 5],
    '3,8': [4, 6, 9],
    '4,1': [1, 6],
    '4,2': [1, 2, 4, 6, 8],
    '4,3': [1, 4, 6],
    '4,5': [2, 4],
    '4,8': [4, 6, 8],
    '5,1': [1, 6, 7],
    '5,2': [1, 2, 4, 6, 7, 8],
    '5,3': [1, 4, 6],
    '5,5': [2, 4],
    '5,6': [6],
    '5,7': [6, 8],
    '6,0': [2, 7],
    '6,2': [1, 2, 7],
    '6,3': [3, 5],
    '6,4': [2, 5, 7],
    '6,8': [1, 2, 3, 7],
    '7,0': [2, 7, 8],
    '7,3': [8, 9],
    '7,4': [2, 7],
    '7,7': [2, 6],
    '7,8': [2, 6, 7],
    '8,1': [1, 7, 9],
    '8,2': [1, 2, 7, 8, 9],
    '8,3': [3, 4, 5, 8, 9],
    '8,4': [2, 4, 5, 7],
    '8,5': [2, 3, 4, 5, 7, 8, 9],
    '8,6': [1, 5],
    '8,7': [2, 3],
    '8,8': [1, 2, 3, 7]
  },
  partiallySolvedBoardUsingMarkup: [
    [1, 3, 0, 2, 5, 0, 7, 4, 0],
    [7, 2, 5, 0, 1, 0, 0, 0, 0],
    [4, 8, 0, 0, 6, 0, 0, 5, 0],
    [3, 6, 0, 7, 8, 0, 2, 1, 0],
    [5, 0, 0, 0, 9, 0, 3, 7, 0],
    [9, 0, 0, 0, 3, 0, 6, 0, 5],
    [0, 4, 0, 0, 0, 6, 8, 9, 0],
    [0, 5, 3, 0, 0, 1, 4, 0, 0],
    [6, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
};
