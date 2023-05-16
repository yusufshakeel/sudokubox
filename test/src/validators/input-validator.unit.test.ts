import InputValidator from '../../../src/validators/input-validator';
import SudokuPuzzleEasy from '../../test-data/sudoku-puzzle-easy';
import SudokuPuzzleInvalidInput from '../../test-data/sudoku-puzzle-invalid-input';
const { puzzle: validInputPuzzle } = SudokuPuzzleEasy;
const { puzzle: invalidInputPuzzle } = SudokuPuzzleInvalidInput;

describe('InputValidator', () => {
  const inputValidator = new InputValidator();

  describe('When input uses allowed numbers', () => {
    test('Should not throw error', () => {
      expect(() => inputValidator.validate(validInputPuzzle)).not.toThrow();
    });
  });

  describe('When input uses disallowed numbers', () => {
    test('Should throw error', () => {
      expect(() => inputValidator.validate(invalidInputPuzzle)).toThrow(
        'Input board contains invalid number in Row: 0, Column: 0.'
      );
    });
  });

  describe('When input does not have 9x9 numbers', () => {
    describe('When there are not exactly 9 rows', () => {
      test('Should throw error', () => {
        expect(() => inputValidator.validate([[1]])).toThrow(
          'Input board must have exactly 9 rows.'
        );
      });
    });

    describe('When there are not exactly 9 columns', () => {
      test('Should throw error', () => {
        expect(() =>
          inputValidator.validate([[1], [2], [3], [4], [5], [6], [7], [8], [9]])
        ).toThrow('Input board must have exactly 9 columns in Row 0.');
      });
    });
  });
});