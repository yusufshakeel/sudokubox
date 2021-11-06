'use strict';

const { EMPTY_CELL } = require('../constants');
const { getMarkup } = require('../helpers');

function MarkupBuilder() {
  const self = this;

  this.withBoard = board => {
    self.board = [...board];
    return self;
  };

  this.build = () => {
    return self.board.reduce((result, row, rowIndex) => {
      const rowResult = row.reduce((rowResult, cell, columnIndex) => {
        if (cell === EMPTY_CELL) {
          return {
            ...rowResult,
            [`${rowIndex},${columnIndex}`]: getMarkup(rowIndex, columnIndex, self.board)
          };
        }

        return rowResult;
      }, {});

      return { ...result, ...rowResult };
    }, {});
  };
}

module.exports = MarkupBuilder;
