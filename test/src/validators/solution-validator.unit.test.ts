import SolutionValidator from '../../../src/validators/solution-validator';
import SudokuPuzzleEasy from '../../test-data/sudoku-puzzle-easy';
const {
  solution,
  puzzle,
  wrongSolution,
  wrongSolution2,
  wrongSolution3
} = SudokuPuzzleEasy;

describe('SolutionValidator', () => {
  const solutionValidator = new SolutionValidator();

  describe('When solution has solved the puzzle', () => {
    test('Should return true', () => {
      expect(solutionValidator.isSolved(solution)).toBeTruthy();
    });
  });

  describe('When solution has not solved the puzzle', () => {
    describe('When there is still some empty cell', () => {
      test('Should return false', () => {
        expect(solutionValidator.isSolved(puzzle)).toBeFalsy();
      });
    });

    describe('When puzzle is not correctly solved', () => {
      test('Should return false', () => {
        expect(solutionValidator.isSolved(wrongSolution)).toBeFalsy();
        expect(solutionValidator.isSolved(wrongSolution2)).toBeFalsy();
        expect(solutionValidator.isSolved(wrongSolution3)).toBeFalsy();
      });
    });
  });
});