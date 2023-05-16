const SudokuPuzzleExpert = {
  input: [
    7, 0, 0, 0, 0, 5, 0, 9, 0, 0, 4, 0, 0, 8, 0, 0, 0, 0, 0, 2, 0, 4, 0, 1, 5, 3, 6, 4, 0, 7, 0, 0,
    0, 0, 5, 0, 0, 0, 0, 8, 5, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4, 0, 3, 0, 0, 0, 0, 9, 0, 0, 8, 0, 9,
    0, 0, 0, 0, 6, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 2, 5
  ],
  output: [
    7, 3, 1, 2, 6, 5, 8, 9, 4, 6, 4, 5, 9, 8, 3, 7, 1, 2, 8, 2, 9, 4, 7, 1, 5, 3, 6, 4, 1, 7, 6, 3,
    9, 2, 5, 8, 2, 6, 3, 8, 5, 4, 1, 7, 9, 5, 9, 8, 1, 2, 7, 4, 6, 3, 3, 5, 4, 7, 9, 2, 6, 8, 1, 9,
    8, 2, 5, 1, 6, 3, 4, 7, 1, 7, 6, 3, 4, 8, 9, 2, 5
  ],
  puzzle: [
    [7, 0, 0, 0, 0, 5, 0, 9, 0],
    [0, 4, 0, 0, 8, 0, 0, 0, 0],
    [0, 2, 0, 4, 0, 1, 5, 3, 6],
    [4, 0, 7, 0, 0, 0, 0, 5, 0],
    [0, 0, 0, 8, 5, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 4, 0, 3],
    [0, 0, 0, 0, 9, 0, 0, 8, 0],
    [9, 0, 0, 0, 0, 6, 0, 0, 7],
    [0, 0, 0, 0, 0, 0, 0, 2, 5]
  ],
  solution: [
    [7, 3, 1, 2, 6, 5, 8, 9, 4],
    [6, 4, 5, 9, 8, 3, 7, 1, 2],
    [8, 2, 9, 4, 7, 1, 5, 3, 6],
    [4, 1, 7, 6, 3, 9, 2, 5, 8],
    [2, 6, 3, 8, 5, 4, 1, 7, 9],
    [5, 9, 8, 1, 2, 7, 4, 6, 3],
    [3, 5, 4, 7, 9, 2, 6, 8, 1],
    [9, 8, 2, 5, 1, 6, 3, 4, 7],
    [1, 7, 6, 3, 4, 8, 9, 2, 5]
  ],
  partiallySolvedBoard: [
    [7, 0, 0, 0, 0, 5, 0, 9, 0],
    [0, 4, 0, 0, 8, 0, 0, 0, 0],
    [8, 2, 9, 4, 7, 1, 5, 3, 6],
    [4, 0, 7, 0, 0, 0, 0, 5, 0],
    [0, 0, 0, 8, 5, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 4, 0, 3],
    [0, 0, 0, 0, 9, 0, 6, 8, 0],
    [9, 0, 0, 0, 0, 6, 3, 0, 7],
    [0, 0, 0, 0, 0, 0, 9, 2, 5]
  ],
  partiallySolvedBoardMarkup: {
    '0,1': [1, 3, 6],
    '0,2': [1, 3, 6],
    '0,3': [2, 3, 6],
    '0,4': [2, 3, 6],
    '0,6': [1, 2, 8],
    '0,8': [1, 2, 4, 8],
    '1,0': [1, 3, 5, 6],
    '1,2': [1, 3, 5, 6],
    '1,3': [2, 3, 6, 9],
    '1,5': [2, 3, 9],
    '1,6': [1, 2, 7],
    '1,7': [1, 7],
    '1,8': [1, 2],
    '3,1': [1, 3, 6, 8, 9],
    '3,3': [2, 3, 6, 9],
    '3,4': [2, 3, 6],
    '3,5': [2, 3, 9],
    '3,6': [1, 2, 8],
    '3,8': [1, 2, 8, 9],
    '4,0': [1, 2, 3, 6],
    '4,1': [1, 3, 6, 9],
    '4,2': [1, 2, 3, 6],
    '4,5': [2, 3, 4, 7, 9],
    '4,6': [1, 2, 7],
    '4,7': [1, 6, 7],
    '4,8': [1, 2, 9],
    '5,0': [2, 5, 6],
    '5,1': [5, 6, 8, 9],
    '5,2': [2, 5, 6, 8],
    '5,4': [2, 6],
    '5,5': [2, 7, 9],
    '5,7': [6, 7],
    '6,0': [1, 2, 3, 5],
    '6,1': [1, 3, 5, 7],
    '6,2': [1, 2, 3, 4, 5],
    '6,3': [2, 3, 5, 7],
    '6,5': [2, 3, 4, 7],
    '6,8': [1, 4],
    '7,1': [1, 5, 8],
    '7,2': [1, 2, 4, 5, 8],
    '7,3': [2, 5],
    '7,4': [1, 2, 4],
    '7,7': [1, 4],
    '8,0': [1, 3, 6],
    '8,1': [1, 3, 6, 7, 8],
    '8,2': [1, 3, 4, 6, 8],
    '8,3': [3, 7],
    '8,4': [1, 3, 4],
    '8,5': [3, 4, 7, 8]
  },
  partiallySolvedBoardSegregatedMarkup: {
    2: {
      '1,7': [1, 7],
      '1,8': [1, 2],
      '5,4': [2, 6],
      '5,7': [6, 7],
      '6,8': [1, 4],
      '7,3': [2, 5],
      '7,7': [1, 4],
      '8,3': [3, 7]
    },
    3: {
      '0,1': [1, 3, 6],
      '0,2': [1, 3, 6],
      '0,3': [2, 3, 6],
      '0,4': [2, 3, 6],
      '0,6': [1, 2, 8],
      '1,5': [2, 3, 9],
      '1,6': [1, 2, 7],
      '3,4': [2, 3, 6],
      '3,5': [2, 3, 9],
      '3,6': [1, 2, 8],
      '4,6': [1, 2, 7],
      '4,7': [1, 6, 7],
      '4,8': [1, 2, 9],
      '5,0': [2, 5, 6],
      '5,5': [2, 7, 9],
      '7,1': [1, 5, 8],
      '7,4': [1, 2, 4],
      '8,0': [1, 3, 6],
      '8,4': [1, 3, 4]
    },
    4: {
      '0,8': [1, 2, 4, 8],
      '1,0': [1, 3, 5, 6],
      '1,2': [1, 3, 5, 6],
      '1,3': [2, 3, 6, 9],
      '3,3': [2, 3, 6, 9],
      '3,8': [1, 2, 8, 9],
      '4,0': [1, 2, 3, 6],
      '4,1': [1, 3, 6, 9],
      '4,2': [1, 2, 3, 6],
      '5,1': [5, 6, 8, 9],
      '5,2': [2, 5, 6, 8],
      '6,0': [1, 2, 3, 5],
      '6,1': [1, 3, 5, 7],
      '6,3': [2, 3, 5, 7],
      '6,5': [2, 3, 4, 7],
      '8,5': [3, 4, 7, 8]
    },
    5: {
      '3,1': [1, 3, 6, 8, 9],
      '4,5': [2, 3, 4, 7, 9],
      '6,2': [1, 2, 3, 4, 5],
      '7,2': [1, 2, 4, 5, 8],
      '8,1': [1, 3, 6, 7, 8],
      '8,2': [1, 3, 4, 6, 8]
    }
  }
};

export default SudokuPuzzleExpert;