const SudokuPuzzleUnsolvable = {
  input: [
    1, 3, 0, 2, 0, 0, 7, 4, 0, 0, 2, 5, 0, 1, 0, 0, 0, 0, 4, 8, 0, 0, 6, 0, 0, 5, 0, 0, 0, 0, 7, 8,
    0, 2, 1, 0, 5, 0, 0, 0, 9, 0, 3, 7, 0, 9, 0, 0, 0, 3, 0, 0, 0, 5, 0, 4, 0, 0, 0, 6, 8, 9, 0, 0,
    5, 3, 1, 0, 1, 4, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 1
  ],
  puzzle: [
    [1, 3, 0, 2, 0, 0, 7, 4, 0],
    [0, 2, 5, 0, 1, 0, 0, 0, 0],
    [4, 8, 0, 0, 6, 0, 0, 5, 0],
    [0, 0, 0, 7, 8, 0, 2, 1, 0],
    [5, 0, 0, 0, 9, 0, 3, 7, 0],
    [9, 0, 0, 0, 3, 0, 0, 0, 5],
    [0, 4, 0, 0, 0, 6, 8, 9, 0],
    [0, 5, 3, 1, 0, 1, 4, 0, 0],
    [6, 0, 0, 0, 0, 0, 0, 0, 1]
  ],
  partiallySolvedBoard: [
    [1, 3, 0, 2, 5, 0, 7, 4, 0],
    [7, 2, 5, 0, 1, 0, 0, 0, 0],
    [4, 8, 0, 0, 6, 0, 0, 5, 0],
    [3, 6, 0, 7, 8, 5, 2, 1, 0],
    [5, 0, 0, 6, 9, 2, 3, 7, 0],
    [9, 0, 0, 6, 3, 2, 6, 0, 5],
    [0, 4, 0, 0, 0, 6, 8, 9, 0],
    [0, 5, 3, 1, 0, 1, 4, 0, 0],
    [6, 0, 0, 0, 0, 0, 5, 0, 1]
  ]
};

export default SudokuPuzzleUnsolvable;