import SudokuBox from '../../src';
import BoardValidator from '../../src/validators/board-validator';
import CONSTANTS from '../../src/constants';
import SudokuPuzzleEasy from '../test-data/sudoku-puzzle-easy';
const { input, puzzle, solution } = SudokuPuzzleEasy;
const { GENERATE_PUZZLE } = CONSTANTS;

describe('SudokuBox', () => {
  describe('solve', () => {
    test('Should solve puzzle', () => {
      const sudokuBox = new SudokuBox({ logPerformance: true });
      const result = sudokuBox.solve({ input });
      expect(result.isPuzzleSolved).toBeTruthy();
      expect(result.isBoardValid).toBeTruthy();
      expect(result.board).toStrictEqual(solution);
      expect(result.performance).toStrictEqual({
        duration: {
          nano: expect.any(Number),
          micro: expect.any(Number),
          milli: expect.any(Number),
          second: expect.any(Number)
        }
      });
    });
  });

  describe('isValidInput', () => {
    test('Should be able to validate', () => {
      const sudokuBox = new SudokuBox();
      expect(sudokuBox.isValidInput({ input })).toStrictEqual({ isValidInput: true });
    });
  });

  describe('isValidBoard', () => {
    test('Should be able to validate', () => {
      const sudokuBox = new SudokuBox();
      expect(sudokuBox.isValidBoard({ board: puzzle })).toStrictEqual({ isValidBoard: true });
    });
  });

  describe('generate', () => {
    test('Should return puzzle', () => {
      const sudokuBox = new SudokuBox({ logPerformance: true });
      const boardValidator = new BoardValidator();
      const { puzzle, board, totalCellsFilled, performance } = sudokuBox.generate();
      expect(puzzle).toHaveLength(81);
      expect(boardValidator.isValid(board!)).toBeTruthy();
      expect(totalCellsFilled).toBeLessThanOrEqual(
        GENERATE_PUZZLE.EASY.MAXIMUM_NUMBER_OF_CELLS_TO_FILL
      );
      expect(totalCellsFilled).toBeGreaterThanOrEqual(
        GENERATE_PUZZLE.EASY.MINIMUM_NUMBER_OF_CELLS_TO_FILL
      );
      expect(performance).toStrictEqual({
        duration: {
          nano: expect.any(Number),
          micro: expect.any(Number),
          milli: expect.any(Number),
          second: expect.any(Number)
        }
      });
    });
  });
});