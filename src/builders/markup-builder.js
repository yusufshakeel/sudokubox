'use strict';

const { EMPTY_CELL } = require('../constants');
const { getMarkup } = require('../helpers');

function MarkupBuilder(config) {
  const { logging } = config;
  const self = this;

  this.withBoard = board => {
    self.board = [...board];
    return self;
  };

  this.build = () => {
    const markup = self.board.reduce((result, row, rowIndex) => {
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

    logging.debug({ moduleName: 'MarkupBuilder', functionName: 'build', markup });
    return markup;
  };
}

module.exports = MarkupBuilder;
