'use strict';

const { getMarkupCellIndices } = require('../helpers');

function MarkupSolver() {
  this.solve = (markup, board) => {
    let partiallySolvedBoard = [...board];
    Object.entries(markup).forEach(([cell, value]) => {
      if (value.length === 1) {
        const { rowIndex, columnIndex } = getMarkupCellIndices(cell);
        partiallySolvedBoard[rowIndex][columnIndex] = value[0];
      }
    });
    return partiallySolvedBoard;
  };
}

module.exports = MarkupSolver;
