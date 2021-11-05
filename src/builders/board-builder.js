'use strict';

const { TOTAL_ROWS } = require('../constants');

/**
 * This will build the sudoku board.
 * @param {number[]} input This is the one dimensional array.
 * @constructor
 */
function BoardBuilder(input) {
  const isNewRow = index => (index + 1) % TOTAL_ROWS === 0;

  /**
   * This will return the sudoku board.
   * @returns {number[][]}
   */
  this.build = () => {
    const { board } = input.reduce(
      (result, current, index) => {
        const row = [...result.row, current];
        return isNewRow(index) ? { board: [...result.board, row], row: [] } : { ...result, row };
      },
      { board: [], row: [] }
    );
    return board;
  };
}

module.exports = BoardBuilder;
