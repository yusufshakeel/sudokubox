'use strict';

const { TOTAL_ROWS } = require('../constants');

function BoardBuilder(input) {
  const isNewRow = index => (index + 1) % TOTAL_ROWS === 0;

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
