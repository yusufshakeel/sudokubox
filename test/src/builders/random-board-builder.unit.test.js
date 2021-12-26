'use strict';

const RandomBoardBuilder = require('../../../src/builders/random-board-builder');
const BoardValidator = require('../../../src/validators/board-validator');
const LoggingHelper = require('../../../src/helpers/logging-helper');
const { RANDOM_BOARD } = require('../../../src/constants');

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
