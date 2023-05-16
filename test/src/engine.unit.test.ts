import sudokuEngine from '../../src/engine';
import BoardValidator from '../../src/validators/board-validator';
import CONSTANTS from '../../src/constants';
import SudokuPuzzleEasy from '../test-data/sudoku-puzzle-easy';
import SudokuPuzzleHard from '../test-data/sudoku-puzzle-hard';
import SudokuPuzzleMedium from '../test-data/sudoku-puzzle-medium';
import SudokuPuzzleUnsolvable from '../test-data/sudoku-puzzle-unsolvable';
import SudokuPuzzleExpert from '../test-data/sudoku-puzzle-expert';
import SudokuPuzzleEvil from '../test-data/sudoku-puzzle-evil';
import SudokuPuzzleInvalidInput from '../test-data/sudoku-puzzle-invalid-input';
const { GENERATE_PUZZLE } = CONSTANTS;

const {
  input: easyPuzzleInput,
  puzzle: easyPuzzleBoard,
  output: easyPuzzleOutput,
  solution: easyPuzzleSolution
} = SudokuPuzzleEasy;

const {
  input: hardPuzzleInput,
  output: hardPuzzleOutput,
  solution: hardPuzzleSolution
} = SudokuPuzzleHard;

const {
  input: mediumPuzzleInput,
  output: mediumPuzzleOutput,
  solution: mediumPuzzleSolution
} = SudokuPuzzleMedium;

const { input: unsolvablePuzzleInput } = SudokuPuzzleUnsolvable;

const {
  input: expertPuzzleInput,
  output: expertPuzzleOutput,
  solution: expertPuzzleSolution
} = SudokuPuzzleExpert;

const {
  input: evilPuzzleInput,
  output: evilPuzzleOutput,
  solution: evilPuzzleSolution
} = SudokuPuzzleEvil;

const {
  input: invalidPuzzleInput,
  puzzle: invalidInputBoard
} = SudokuPuzzleInvalidInput;

describe('solve', () => {
  describe('When input is invalid', () => {
    test('Should return result', () => {
      const engine = sudokuEngine({});
      const result = engine.solve({ input: invalidPuzzleInput });
      expect(result!.isPuzzleSolved).toBeFalsy();
      expect(result!.error!.message).toBe(
        'Input board contains invalid number in Row: 0, Column: 0.'
      );
    });
  });

  describe('Solve easy puzzle', () => {
    test('Should return result', () => {
      const engine = sudokuEngine({});
      const result = engine.solve({ input: easyPuzzleInput });
      expect(result.isPuzzleSolved).toBeTruthy();
      expect(result.board).toStrictEqual(easyPuzzleSolution);
      expect(result.output).toStrictEqual(easyPuzzleOutput);
      expect(result.performance).toBeUndefined();
    });
  });

  describe('Solve medium puzzle', () => {
    test('Should return result', () => {
      const engine = sudokuEngine({});
      const result = engine.solve({ input: mediumPuzzleInput });
      expect(result.isPuzzleSolved).toBeTruthy();
      expect(result.board).toStrictEqual(mediumPuzzleSolution);
      expect(result.output).toStrictEqual(mediumPuzzleOutput);
    });
  });

  describe('Solve hard puzzle', () => {
    test('Should return result', () => {
      const engine = sudokuEngine({});
      const result = engine.solve({ input: hardPuzzleInput });
      expect(result.isPuzzleSolved).toBeTruthy();
      expect(result.board).toStrictEqual(hardPuzzleSolution);
      expect(result.output).toStrictEqual(hardPuzzleOutput);
    });
  });

  describe('Solve expert puzzle', () => {
    test('Should return result', () => {
      const engine = sudokuEngine({});
      const result = engine.solve({ input: expertPuzzleInput });
      expect(result.isPuzzleSolved).toBeTruthy();
      expect(result.board).toStrictEqual(expertPuzzleSolution);
      expect(result.output).toStrictEqual(expertPuzzleOutput);
    });
  });

  describe('Solve evil puzzle', () => {
    test('Should return result', () => {
      const engine = sudokuEngine({ sudokuBoxConfig: { logPerformance: true } });
      const result = engine.solve({ input: evilPuzzleInput });
      expect(result.isPuzzleSolved).toBeTruthy();
      expect(result.board).toStrictEqual(evilPuzzleSolution);
      expect(result.output).toStrictEqual(evilPuzzleOutput);
      expect(result.performance).toBeDefined();
    });
  });

  describe('Unsolvable puzzle', () => {
    test('Should return result', () => {
      const engine = sudokuEngine({});
      const result = engine.solve({ input: unsolvablePuzzleInput });
      expect(result.isPuzzleSolved).toBeFalsy();
    });
  });
});

describe('isValidInput', () => {
  describe('When input is invalid', () => {
    test('Should return false', () => {
      const engine = sudokuEngine({});
      expect(engine.isValidInput({ input: invalidPuzzleInput })).toStrictEqual({
        isValidInput: false
      });
    });
  });

  describe('When input is valid', () => {
    test('Should return true', () => {
      const engine = sudokuEngine({});
      expect(engine.isValidInput({ input: easyPuzzleInput })).toStrictEqual({ isValidInput: true });
    });
  });

  describe('When input has error', () => {
    test('Should return error message', () => {
      const engine = sudokuEngine({});
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(engine.isValidInput({ input: '1', sudokuBoxConfig: { verbose: true } })).toStrictEqual(
        {
          isValidInput: false,
          error: {
            message: 'this.input.reduce is not a function'
          }
        }
      );
    });
  });
});

describe('isValidBoard', () => {
  describe('When board is invalid', () => {
    test('Should return false', () => {
      const engine = sudokuEngine({});
      expect(engine.isValidBoard({ board: invalidInputBoard })).toStrictEqual({
        isValidBoard: false
      });
    });
  });

  describe('When board is valid', () => {
    test('Should return true', () => {
      const engine = sudokuEngine({});
      expect(engine.isValidBoard({ board: easyPuzzleBoard })).toStrictEqual({ isValidBoard: true });
    });
  });

  describe('When board has error', () => {
    test('Should return error message', () => {
      const engine = sudokuEngine({});
      expect(engine.isValidBoard({ board: [] })).toStrictEqual({
        isValidBoard: false,
        error: {
          message: expect.any(String)
        }
      });
    });
  });
});

describe('generate', () => {
  describe('When level is wrong', () => {
    test('Should return error message', () => {
      const engine = sudokuEngine({});
      const result = engine.generate({ level: 'UNKNOWN' });
      expect(result).toStrictEqual({
        error: {
          message: 'Level not found. Use one of the following: EASY,MEDIUM,HARD,EXTREME,DIABOLICAL'
        }
      });
    });
  });

  describe('When level is correct', () => {
    test('Should return puzzle', () => {
      const engine = sudokuEngine({ sudokuBoxConfig: { logPerformance: true } });
      const boardValidator = new BoardValidator();
      const { puzzle, board, totalCellsFilled, performance } = engine.generate({ level: 'EASY' });
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