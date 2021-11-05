'use strict';

const { EMPTY_CELL } = require('../constants');
const { getMarkup } = require('../helpers');

function MarkupBuilder(board) {
  this.build = () => {
    return board.reduce((result, row, rowIndex) => {
      const rowResult = row.reduce((rowResult, cell, columnIndex) => {
        if (cell === EMPTY_CELL) {
          return {
            ...rowResult,
            [`${rowIndex},${columnIndex}`]: { values: getMarkup(rowIndex, columnIndex, board) }
          };
        }

        return rowResult;
      }, {});

      return { ...result, ...rowResult };
    }, {});
  };
}

module.exports = MarkupBuilder;
