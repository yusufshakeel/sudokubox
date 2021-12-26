'use strict';

const { TOTAL_ROWS, TOTAL_COLUMNS, RANDOM_BOARD } = require('../constants');
const BoardBuilder = require('../builders/board-builder');
const BoardValidator = require('../validators/board-validator');
const { getRandomInteger } = require('../helpers');

function RandomBoardBuilder(config) {
  const { logging } = config;

  this.build = () => {
    logging.debug({
      moduleName: 'RandomBoardBuilder',
      functionName: 'build',
      message: 'ENTERED build block'
    });

    const boardValidator = new BoardValidator();
    const totalNumberOfCells = TOTAL_ROWS * TOTAL_COLUMNS;
    const totalCellsToFill = getRandomInteger(
      RANDOM_BOARD.MINIMUM_NUMBER_OF_CELLS_TO_FILL,
      RANDOM_BOARD.MAXIMUM_NUMBER_OF_CELLS_TO_FILL
    );

    let puzzle = Array(totalNumberOfCells).fill(0);
    let board = new BoardBuilder(puzzle).build();
    let positionThatCanBeFilled = new Set(Array.from(Array(totalNumberOfCells).keys()));

    const totalCellsFilled = puzzle => puzzle.filter(v => v !== 0).length;
    const getRandomValue = () => getRandomInteger(1, 9);
    const getRandomIndex = () => getRandomInteger(0, positionThatCanBeFilled.size - 1);

    let index = getRandomIndex();
    let value = getRandomValue();
    puzzle[index] = value;
    positionThatCanBeFilled.delete(index);

    while (totalCellsFilled(puzzle) < totalCellsToFill) {
      let newPuzzle = [...puzzle];
      index = getRandomIndex();
      value = getRandomValue();
      newPuzzle[index] = value;
      board = new BoardBuilder(newPuzzle).build();
      if (boardValidator.isValid(board)) {
        puzzle = [...newPuzzle];
        positionThatCanBeFilled.delete(index);
      }
    }

    logging.debug({
      moduleName: 'RandomBoardBuilder',
      functionName: 'build',
      message: 'EXITING build block'
    });

    return {
      puzzle,
      board,
      totalCellsFilled: totalCellsToFill
    };
  };
}

module.exports = RandomBoardBuilder;
