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

function PreemptiveSetSolver() {
  this.solve = (preemptiveSets, markup) => {
    let boardMarkup = { ...markup };

    // loop preemptiveSets
    // pick an entry from preemptiveSets
    preemptiveSets.forEach(preemptiveSet => {
      // if the picked preemptiveSet is of type row preemptive set
      // then:
      // find all markup in that row other than the ones present in preemptive set
      // remove the values present in preemptive set from those markup
      if (isRowPreemptiveSet(preemptiveSet)) {
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

      // if the picked preemptiveSet is of type column preemptive set
      // then:
      // find all markup in that column other than the ones present in preemptive set
      // remove the values present in preemptive set from those markup
      if (isColumnPreemptiveSet(preemptiveSet)) {
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

      // if the picked preemptiveSet is of type sub board preemptive set
      // then:
      // find all markup in that sub board other than the ones present in preemptive set
      // remove the values present in preemptive set from those markup
      if (isSubBoardPreemptiveSet(preemptiveSet)) {
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

    return boardMarkup;
  };
}

module.exports = PreemptiveSetSolver;
