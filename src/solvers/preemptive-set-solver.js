'use strict';

const {
  isRowPreemptiveSet,
  getRowMarkup,
  getMarkupCellIndices,
  omitMarkup,
  isColumnPreemptiveSet,
  getColumnMarkup,
  isSubBoardPreemptiveSet,
  getSubBoardMarkup,
  updateBoardMarkupUsingPreemptiveSet
} = require('../helpers');
const { isEmpty } = require('../helpers/helper');

function PreemptiveSetSolver(config) {
  const { logging } = config;

  this.solve = (preemptiveSets, markup) => {
    let boardMarkup = { ...markup };

    preemptiveSets.forEach(preemptiveSet => {
      if (isRowPreemptiveSet(preemptiveSet)) {
        logging.debug({
          moduleName: 'PreemptiveSetSolver',
          functionName: 'solve',
          message: 'ENTERED isRowPreemptiveSet block',
          preemptiveSet
        });

        const { rowIndex } = getMarkupCellIndices(preemptiveSet.cells[0]);
        const rowMarkup = getRowMarkup(rowIndex, boardMarkup);
        const markupAfterOmittingPreemptiveSetCells = omitMarkup(preemptiveSet.cells, rowMarkup);
        if (!isEmpty(markupAfterOmittingPreemptiveSetCells)) {
          boardMarkup = updateBoardMarkupUsingPreemptiveSet(
            boardMarkup,
            preemptiveSet,
            markupAfterOmittingPreemptiveSetCells
          );
        }
      }

      if (isColumnPreemptiveSet(preemptiveSet)) {
        logging.debug({
          moduleName: 'PreemptiveSetSolver',
          functionName: 'solve',
          message: 'ENTERED isColumnPreemptiveSet block',
          preemptiveSet
        });

        const { columnIndex } = getMarkupCellIndices(preemptiveSet.cells[0]);
        const columnMarkup = getColumnMarkup(columnIndex, boardMarkup);
        const markupAfterOmittingPreemptiveSetCells = omitMarkup(preemptiveSet.cells, columnMarkup);
        if (!isEmpty(markupAfterOmittingPreemptiveSetCells)) {
          boardMarkup = updateBoardMarkupUsingPreemptiveSet(
            boardMarkup,
            preemptiveSet,
            markupAfterOmittingPreemptiveSetCells
          );
        }
      }

      if (isSubBoardPreemptiveSet(preemptiveSet)) {
        logging.debug({
          moduleName: 'PreemptiveSetSolver',
          functionName: 'solve',
          message: 'ENTERED isSubBoardPreemptiveSet block',
          preemptiveSet
        });

        const { rowIndex, columnIndex } = getMarkupCellIndices(preemptiveSet.cells[0]);
        const subBoardMarkup = getSubBoardMarkup(rowIndex, columnIndex, boardMarkup);
        const markupAfterOmittingPreemptiveSetCells = omitMarkup(
          preemptiveSet.cells,
          subBoardMarkup
        );
        if (!isEmpty(markupAfterOmittingPreemptiveSetCells)) {
          boardMarkup = updateBoardMarkupUsingPreemptiveSet(
            boardMarkup,
            preemptiveSet,
            markupAfterOmittingPreemptiveSetCells
          );
        }
      }
    });

    logging.debug({ moduleName: 'PreemptiveSetSolver', functionName: 'solve', boardMarkup });
    return boardMarkup;
  };
}

module.exports = PreemptiveSetSolver;
