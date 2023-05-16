import MarkupBuilder from '../../../src/builders/markup-builder';
import LoggingHelper from '../../../src/helpers/logging-helper';
import SudokuPuzzleEasy from '../../test-data/sudoku-puzzle-easy';
const { puzzle, markup } = SudokuPuzzleEasy;

describe('MarkupBuilder', () => {
  test('Should return markup', () => {
    const logging = new LoggingHelper({ isLoggingEnabled: true });
    const markupBuilder = new MarkupBuilder({ logging });
    expect(markupBuilder.withBoard(puzzle).build()).toStrictEqual(markup);
  });
});