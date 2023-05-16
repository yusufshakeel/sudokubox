import BoardBuilder from '../../../src/builders/board-builder';
import SudokuPuzzleEasy from '../../test-data/sudoku-puzzle-easy';
const { input, puzzle } =SudokuPuzzleEasy;

describe('BoardBuilder', () => {
  test('Should build board from input', () => {
    const boardBuilder = new BoardBuilder(input);
    expect(boardBuilder.build()).toStrictEqual(puzzle);
  });
});