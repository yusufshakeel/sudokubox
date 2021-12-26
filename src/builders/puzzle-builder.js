'use strict';

const BoardBuilder = require('../builders/board-builder');
const { getRandomInteger } = require('../helpers');

function PuzzleBuilder(config) {
  const self = this;
  const { logging } = config;

  /**
   * This will set the input.
   * @param {number[]} input
   * @return {PuzzleBuilder}
   */
  this.withInput = input => {
    self.input = input;
    return self;
  };

  /**
   * This will set the minimum number of cells to fill.
   * @param {number} cellCount
   * @return {PuzzleBuilder}
   */
  this.withMinimumNumberOfCellsToFill = cellCount => {
    self.minNumberOfCellsToFill = cellCount;
    return self;
  };

  /**
   * This will set the maximum number of cells to fill.
   * @param {number} cellCount
   * @return {PuzzleBuilder}
   */
  this.withMaximumNumberOfCellsToFill = cellCount => {
    self.maxNumberOfCellsToFill = cellCount;
    return self;
  };

  /**
   * This will return the puzzle.
   * @return {{totalCellsFilled: number, puzzle: number[], board: number[][]}}
   */
  this.build = () => {
    logging.debug({
      moduleName: 'PuzzleBuilder',
      functionName: 'build',
      message: 'ENTERED build block'
    });

    const totalCellsToFill = getRandomInteger(
      self.minNumberOfCellsToFill,
      self.maxNumberOfCellsToFill
    );

    const EMPTY = 0;
    let puzzle = [...self.input];
    let board = new BoardBuilder(puzzle).build();
    const positionsThatCanBeEmptied = [...puzzle.keys()];
    const totalCellsFilled = puzzle => puzzle.filter(v => v !== 0).length;
    const getRandomPositionIndex = positions => getRandomInteger(0, positions.length - 1);

    let filledCells = totalCellsFilled(puzzle);
    while (filledCells > totalCellsToFill) {
      const index = positionsThatCanBeEmptied.splice(
        getRandomPositionIndex(positionsThatCanBeEmptied),
        1
      )[0];
      puzzle[index] = EMPTY;
      board = new BoardBuilder(puzzle).build();
      filledCells = totalCellsFilled(puzzle);
    }

    logging.debug({
      moduleName: 'PuzzleBuilder',
      functionName: 'build',
      message: 'EXITING build block'
    });

    return {
      puzzle,
      board,
      totalCellsFilled: totalCellsFilled(puzzle)
    };
  };
}

module.exports = PuzzleBuilder;
