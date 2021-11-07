'use strict';

const {
  segregateMarkup,
  getMatchingMarkupByValues,
  getRowMarkup,
  getMarkupCellIndices,
  getColumnMarkup,
  getSubBoardMarkup,
  filterMarkup
} = require('../helpers');

function PreemptiveSetBuilder(config) {
  const { logging } = config;
  const self = this;

  const preemptiveSet = (values, markup) => {
    const size = values.length;
    const cells = Object.keys(markup);
    const id = cells.join('-');
    return { id, size, values, cells };
  };

  const updatePreemptiveSets = (preemptiveSets, values, markup) => {
    const record = preemptiveSet(values, markup);
    const alreadyAdded = preemptiveSets.find(v => v.id === record.id);
    return alreadyAdded ? [...preemptiveSets] : [...preemptiveSets, record];
  };

  this.withMarkup = markup => {
    self.markup = { ...markup };
    return self;
  };

  this.build = () => {
    logging.debug({
      moduleName: 'PreemptiveSetBuilder',
      functionName: 'build',
      message: 'ENTERED build block'
    });

    const segregatedMarkup = segregateMarkup(self.markup);

    const segregatedMarkupGroupSizes = Object.keys(segregatedMarkup)
      .map(v => parseInt(v))
      .sort();

    const numberOfMarkupGroups = segregatedMarkupGroupSizes.length;

    let preemptiveSets = [];

    for (
      let markupGroupSize = 2;
      markupGroupSize <= segregatedMarkupGroupSizes[numberOfMarkupGroups - 1];
      markupGroupSize++
    ) {
      const markupByGroupSize = segregatedMarkup[markupGroupSize];

      Object.entries(markupByGroupSize).forEach(current => {
        const [currentCell, currentCellValues] = current;

        const { rowIndex: currentCellRowIndex, columnIndex: currentCellColumnIndex } =
          getMarkupCellIndices(currentCell);

        const matchingMarkupCells = getMatchingMarkupByValues(currentCellValues, markupByGroupSize);

        const filteredMarkup = filterMarkup(matchingMarkupCells, markupByGroupSize);

        const rowMarkup = getRowMarkup(currentCellRowIndex, filteredMarkup);

        const columnMarkup = getColumnMarkup(currentCellColumnIndex, filteredMarkup);

        const subBoardMarkup = getSubBoardMarkup(
          currentCellRowIndex,
          currentCellColumnIndex,
          filteredMarkup
        );

        if (Object.keys(rowMarkup).length === markupGroupSize) {
          preemptiveSets = updatePreemptiveSets(preemptiveSets, currentCellValues, rowMarkup);
        }
        if (Object.keys(columnMarkup).length === markupGroupSize) {
          preemptiveSets = updatePreemptiveSets(preemptiveSets, currentCellValues, columnMarkup);
        }
        if (Object.keys(subBoardMarkup).length === markupGroupSize) {
          preemptiveSets = updatePreemptiveSets(preemptiveSets, currentCellValues, subBoardMarkup);
        }
      });
    }

    logging.debug({ moduleName: 'PreemptiveSetBuilder', functionName: 'build', preemptiveSets });
    return preemptiveSets;
  };
}

module.exports = PreemptiveSetBuilder;
