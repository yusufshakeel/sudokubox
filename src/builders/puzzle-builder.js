'use strict';

const { TOTAL_ROWS, TOTAL_COLUMNS } = require('../constants');
const BoardBuilder = require('../builders/board-builder');
const BoardValidator = require('../validators/board-validator');
const { getRandomInteger } = require('../helpers');

function PuzzleBuilder(config) {
  const self = this;
  const { logging, performance } = config;

  /**
   * This will set the minimum number of cells to fill.
   * @param {number} cellCount
   */
  this.withMinimumNumberOfCellsToFill = cellCount => {
    self.minNumberOfCellsToFill = cellCount;
    return self;
  };

  /**
   * This will set the maximum number of cells to fill.
   * @param {number} cellCount
   */
  this.withMaximumNumberOfCellsToFill = cellCount => {
    self.maxNumberOfCellsToFill = cellCount;
    return self;
  };

  this.build = () => {
    logging.debug({
      moduleName: 'PuzzleBuilder',
      functionName: 'build',
      message: 'ENTERED build block'
    });

    performance.startTimer();

    const boardValidator = new BoardValidator();
    const totalNumberOfCells = TOTAL_ROWS * TOTAL_COLUMNS;
    const totalCellsToFill = getRandomInteger(
      self.minNumberOfCellsToFill,
      self.maxNumberOfCellsToFill
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

    performance.stopTimer();

    logging.debug({
      moduleName: 'PuzzleBuilder',
      functionName: 'build',
      message: 'EXITING build block'
    });

    return {
      puzzle,
      board,
      totalCellsFilled: totalCellsToFill,
      performance: performance.stats()
    };
  };
}

module.exports = PuzzleBuilder;
