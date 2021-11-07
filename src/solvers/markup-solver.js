'use strict';

const { getMarkupCellIndices } = require('../helpers');

function MarkupSolver(config) {
  const { logging } = config;

  this.solve = (markup, board) => {
    let isBoardChanged = false;
    let partiallySolvedBoard = [...board];
    Object.entries(markup).forEach(([cell, value]) => {
      if (value.length === 1) {
        const { rowIndex, columnIndex } = getMarkupCellIndices(cell);
        partiallySolvedBoard[rowIndex][columnIndex] = value[0];
        isBoardChanged = true;

        logging.debug({
          moduleName: 'MarkupSolver',
          functionName: 'solve',
          message: 'Cell found with one markup',
          rowIndex,
          columnIndex,
          valueUsedToFillTheCell: value[0]
        });
      }
    });

    const markupSolverResult = { isBoardChanged, board: partiallySolvedBoard };
    logging.debug({ moduleName: 'MarkupSolver', functionName: 'solve', markupSolverResult });

    return markupSolverResult;
  };
}

module.exports = MarkupSolver;
