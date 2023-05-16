import RandomBoardBuilder from '../../../src/builders/random-board-builder';
import BoardValidator from '../../../src/validators/board-validator';
import LoggingHelper from '../../../src/helpers/logging-helper';
import CONSTANTS from '../../../src/constants';
const { RANDOM_BOARD } = CONSTANTS;

describe('RandomBoardBuilder', () => {
  const boardValidator = new BoardValidator();
  const loggingHelper = new LoggingHelper({ isLoggingEnabled: true });

  test('Should be able to create random board', () => {
    const randomBoardBuilder = new RandomBoardBuilder({ logging: loggingHelper });
    const { puzzle, board, totalCellsFilled } = randomBoardBuilder.build();
    expect(puzzle).toHaveLength(81);
    expect(boardValidator.isValid(board)).toBeTruthy();
    expect(totalCellsFilled).toBeLessThanOrEqual(RANDOM_BOARD.MAXIMUM_NUMBER_OF_CELLS_TO_FILL);
    expect(totalCellsFilled).toBeGreaterThanOrEqual(RANDOM_BOARD.MINIMUM_NUMBER_OF_CELLS_TO_FILL);
  });
});