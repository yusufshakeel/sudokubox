import BoardSolver from '../../../src/solvers/board-solver';
import MarkupSolver from '../../../src/solvers/markup-solver';
import PreemptiveSetSolver from '../../../src/solvers/preemptive-set-solver';
import MarkupBuilder from '../../../src/builders/markup-builder';
import PreemptiveSetBuilder from '../../../src/builders/preemptive-set-builder';
import LoggingHelper from '../../../src/helpers/logging-helper';
import SolutionValidator from '../../../src/validators/solution-validator';
import BoardValidator from '../../../src/validators/board-validator';
import BoardBuilder from '../../../src/builders/board-builder';
import SudokuPuzzleUnsolvable from '../../test-data/sudoku-puzzle-unsolvable';
import SudokuPuzzleExpert from '../../test-data/sudoku-puzzle-expert';
import SudokuPuzzleEasy from '../../test-data/sudoku-puzzle-easy';

const { input: unsolvablePuzzleInput } = SudokuPuzzleUnsolvable;
const { input: expertPuzzleInput } = SudokuPuzzleExpert;
const { input: easyPuzzleInput } = SudokuPuzzleEasy;

describe('BoardSolver', () => {
  const logging = new LoggingHelper();
  const markupBuilder = new MarkupBuilder({ logging });
  const preemptiveSetBuilder = new PreemptiveSetBuilder({ logging });
  const markupSolver = new MarkupSolver({ logging });
  const preemptiveSetSolver = new PreemptiveSetSolver({ logging });
  const solutionValidator = new SolutionValidator();
  const boardValidator = new BoardValidator();

  const boardSolver = new BoardSolver({
    logging,
    markupBuilder,
    preemptiveSetBuilder,
    markupSolver,
    preemptiveSetSolver,
    solutionValidator,
    boardValidator
  });

  describe('When board becomes invalid eventually', () => {
    test('Should return result', () => {
      const inputBoard = new BoardBuilder(unsolvablePuzzleInput).build();
      const result = boardSolver.solve(inputBoard);
      expect(result.isPuzzleSolved).toBeFalsy();
    });
  });

  describe('When board does not change', () => {
    test('Should return result', () => {
      const inputBoard = new BoardBuilder(expertPuzzleInput).build();
      const result = boardSolver.solve(inputBoard);
      expect(result.isPuzzleSolved).toBeFalsy();
    });
  });

  describe('When board is solved', () => {
    test('Should return result', () => {
      const inputBoard = new BoardBuilder(easyPuzzleInput).build();
      const result = boardSolver.solve(inputBoard);
      expect(result.isPuzzleSolved).toBeTruthy();
    });
  });
});