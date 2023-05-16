import BacktrackBoardSolver from '../../../src/solvers/backtrack-board-solver';
import BoardSolver from '../../../src/solvers/board-solver';
import MarkupSolver from '../../../src/solvers/markup-solver';
import PreemptiveSetSolver from '../../../src/solvers/preemptive-set-solver';
import MarkupBuilder from '../../../src/builders/markup-builder';
import PreemptiveSetBuilder from '../../../src/builders/preemptive-set-builder';
import LoggingHelper from '../../../src/helpers/logging-helper';
import SolutionValidator from '../../../src/validators/solution-validator';
import BoardValidator from '../../../src/validators/board-validator';
import SudokuPuzzleUnsolvable from '../../test-data/sudoku-puzzle-unsolvable';
import SudokuPuzzleExpert from '../../test-data/sudoku-puzzle-expert';

const {
  partiallySolvedBoard: partiallySolvedUnsolvableInputBoard
} = SudokuPuzzleUnsolvable;
const {
  partiallySolvedBoard: partiallySolvedExpertPuzzleInputBoard
} = SudokuPuzzleExpert;

describe('BacktrackBoardSolver', () => {
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

  const backtrackBoardSolver = new BacktrackBoardSolver({ logging, markupBuilder, boardSolver });

  describe('When partially solved board is solvable', () => {
    test('Should return result', () => {
      const result = backtrackBoardSolver.solve(partiallySolvedExpertPuzzleInputBoard);
      expect(result.isPuzzleSolved).toBeTruthy();
    });
  });

  describe('When partially solved board is unsolvable', () => {
    test('Should return result', () => {
      const result = backtrackBoardSolver.solve(partiallySolvedUnsolvableInputBoard);
      expect(result.isPuzzleSolved).toBeFalsy();
    });
  });
});