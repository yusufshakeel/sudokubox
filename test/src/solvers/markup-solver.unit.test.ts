import MarkupSolver from '../../../src/solvers/markup-solver';
import LoggingHelper from '../../../src/helpers/logging-helper';
import SudokuPuzzleEasy from '../../test-data/sudoku-puzzle-easy';

const {
  puzzle,
  markup,
  partiallySolvedBoardUsingMarkup
} = SudokuPuzzleEasy;

describe('MarkupSolver', () => {
  const logging = new LoggingHelper({ isLoggingEnabled: true });
  const markupSolver = new MarkupSolver({ logging });

  describe('When board has cells with markup having one number', () => {
    test('Should return updated board with filled cells using markup', () => {
      expect(markupSolver.solve(markup, puzzle)).toStrictEqual({
        isBoardChanged: true,
        board: partiallySolvedBoardUsingMarkup
      });
    });
  });
});