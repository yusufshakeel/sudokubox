'use strict';

const {
  getRow,
  getColumn,
  getMarkup,
  isUniqueValueInRow,
  isUniqueValueInColumn,
  isUniqueValueInSubBoard,
  getSubBoardIndices,
  getSubBoardAsOneDimensionalArray,
  getMarkupCellIndices,
  getOutputArrayFromBoard,
  getRowMarkup,
  getColumnMarkup,
  getSubBoardMarkup,
  isRowPreemptiveSet,
  isColumnPreemptiveSet,
  isSubBoardPreemptiveSet,
  segregateMarkup,
  getMatchingMarkupByValues,
  filterMarkup,
  omitMarkup,
  updateBoardMarkupUsingPreemptiveSet
} = require('../../../src/helpers');

const { puzzle, solution, output } = require('../../test-data/sudoku-puzzle-easy');

const {
  partiallySolvedBoardMarkupToFindPreemptiveSet,
  partiallySolvedBoardSegregatedMarkupToFindPreemptiveSet
} = require('../../test-data/sudoku-puzzle-hard');

describe('getRow', () => {
  test('Should return row', () => {
    expect(getRow(2, puzzle)).toStrictEqual([4, 8, 0, 0, 6, 0, 0, 5, 0]);
  });
});

describe('getColumn', () => {
  test('Should return column', () => {
    expect(getColumn(3, puzzle)).toStrictEqual([2, 0, 0, 7, 0, 0, 0, 0, 0]);
  });
});

describe('isUniqueValueInRow', () => {
  describe('When value is unique in row', () => {
    test('Should return true', () => {
      expect(isUniqueValueInRow(1, 0, [1, 3, 6, 2, 5, 9, 7, 4, 8])).toBeTruthy();
    });
  });

  describe('When value is not unique in row', () => {
    test('Should return false', () => {
      expect(isUniqueValueInRow(1, 2, [1, 3, 1, 2, 5, 9, 7, 4, 8])).toBeFalsy();
    });
  });
});

describe('isUniqueValueInColumn', () => {
  describe('When value is unique in column', () => {
    test('Should return true', () => {
      expect(isUniqueValueInColumn(1, 0, [1, 3, 6, 2, 5, 9, 7, 4, 8])).toBeTruthy();
    });
  });

  describe('When value is not unique in column', () => {
    test('Should return false', () => {
      expect(isUniqueValueInColumn(1, 2, [1, 3, 1, 2, 5, 9, 7, 4, 8])).toBeFalsy();
    });
  });
});

describe('isUniqueValueInSubBoard', () => {
  describe('When value is unique in sub board', () => {
    test('Should return true', () => {
      expect(isUniqueValueInSubBoard(1, 0, 0, solution)).toBeTruthy();
    });
  });

  describe('When value is not unique in sub board', () => {
    test('Should return false', () => {
      expect(isUniqueValueInSubBoard(4, 0, 0, puzzle)).toBeFalsy();
    });
  });
});

describe('getSubBoardIndices', () => {
  describe('When cell in sub board #1', () => {
    test('Should return sub board indices', () => {
      expect(getSubBoardIndices(2, 2)).toStrictEqual({
        rowStartIndex: 0,
        rowEndIndex: 2,
        columnStartIndex: 0,
        columnEndIndex: 2
      });
    });
  });

  describe('When cell in sub board #2', () => {
    test('Should return sub board indices', () => {
      expect(getSubBoardIndices(2, 5)).toStrictEqual({
        rowStartIndex: 0,
        rowEndIndex: 2,
        columnStartIndex: 3,
        columnEndIndex: 5
      });
    });
  });

  describe('When cell in sub board #3', () => {
    test('Should return sub board indices', () => {
      expect(getSubBoardIndices(2, 7)).toStrictEqual({
        rowStartIndex: 0,
        rowEndIndex: 2,
        columnStartIndex: 6,
        columnEndIndex: 8
      });
    });
  });

  describe('When cell in sub board #4', () => {
    test('Should return sub board indices', () => {
      expect(getSubBoardIndices(5, 2)).toStrictEqual({
        rowStartIndex: 3,
        rowEndIndex: 5,
        columnStartIndex: 0,
        columnEndIndex: 2
      });
    });
  });

  describe('When cell in sub board #5', () => {
    test('Should return sub board indices', () => {
      expect(getSubBoardIndices(5, 5)).toStrictEqual({
        rowStartIndex: 3,
        rowEndIndex: 5,
        columnStartIndex: 3,
        columnEndIndex: 5
      });
    });
  });

  describe('When cell in sub board #6', () => {
    test('Should return sub board indices', () => {
      expect(getSubBoardIndices(5, 8)).toStrictEqual({
        rowStartIndex: 3,
        rowEndIndex: 5,
        columnStartIndex: 6,
        columnEndIndex: 8
      });
    });
  });

  describe('When cell in sub board #7', () => {
    test('Should return sub board indices', () => {
      expect(getSubBoardIndices(7, 2)).toStrictEqual({
        rowStartIndex: 6,
        rowEndIndex: 8,
        columnStartIndex: 0,
        columnEndIndex: 2
      });
    });
  });

  describe('When cell in sub board #8', () => {
    test('Should return sub board indices', () => {
      expect(getSubBoardIndices(7, 5)).toStrictEqual({
        rowStartIndex: 6,
        rowEndIndex: 8,
        columnStartIndex: 3,
        columnEndIndex: 5
      });
    });
  });

  describe('When cell in sub board #9', () => {
    test('Should return sub board indices', () => {
      expect(getSubBoardIndices(7, 8)).toStrictEqual({
        rowStartIndex: 6,
        rowEndIndex: 8,
        columnStartIndex: 6,
        columnEndIndex: 8
      });
    });
  });
});

describe('getSubBoardAsOneDimensionalArray', () => {
  test('Should return sub board', () => {
    expect(getSubBoardAsOneDimensionalArray(0, 2, 0, 2, puzzle)).toStrictEqual([
      1, 3, 0, 0, 2, 5, 4, 8, 0
    ]);
  });
});

describe('getMarkup', () => {
  test('Should return markup of a cell', () => {
    expect(getMarkup(0, 2, puzzle)).toStrictEqual([6, 9]);
    expect(getMarkup(1, 0, puzzle)).toStrictEqual([7]);
    expect(getMarkup(2, 2, puzzle)).toStrictEqual([7, 9]);
  });
});

describe('getMarkupCellIndices', () => {
  test('Should return cell indices', () => {
    expect(getMarkupCellIndices('0,2')).toStrictEqual({ rowIndex: 0, columnIndex: 2 });
  });
});

describe('getOutputArrayFromBoard', () => {
  test('Should return output array', () => {
    expect(getOutputArrayFromBoard(solution)).toStrictEqual(output);
  });
});

describe('getRowMarkup', () => {
  test('Should return row markup', () => {
    expect(getRowMarkup(7, partiallySolvedBoardMarkupToFindPreemptiveSet)).toStrictEqual({
      '7,0': [1, 8],
      '7,6': [1, 5],
      '7,7': [1, 5]
    });
  });
});

describe('getColumnMarkup', () => {
  test('Should return column markup', () => {
    expect(getColumnMarkup(0, partiallySolvedBoardMarkupToFindPreemptiveSet)).toStrictEqual({
      '0,0': [1, 2, 9],
      '1,0': [6, 9],
      '2,0': [1, 4, 8, 9],
      '4,0': [2, 6],
      '5,0': [1, 8],
      '7,0': [1, 8],
      '8,0': [1, 3, 9]
    });
  });
});

describe('getSubBoardMarkup', () => {
  test('Should return sub board markup', () => {
    expect(getSubBoardMarkup(7, 6, partiallySolvedBoardMarkupToFindPreemptiveSet)).toStrictEqual({
      '6,6': [1, 4, 7, 9],
      '6,7': [1, 9],
      '7,6': [1, 5],
      '7,7': [1, 5],
      '8,6': [1, 7, 9]
    });
  });
});

describe('isRowPreemptiveSet', () => {
  describe('When preemptive set cells are along a row', () => {
    test('Should return true', () => {
      expect(
        isRowPreemptiveSet({ cells: ['7,6', '7,7'], someMoreFields: 'someMoreValues' })
      ).toBeTruthy();
    });
  });

  describe('When preemptive set cells are not along a row', () => {
    test('Should return false', () => {
      expect(
        isRowPreemptiveSet({ cells: ['0,3', '2,3'], someMoreFields: 'someMoreValues' })
      ).toBeFalsy();
    });
  });
});

describe('isColumnPreemptiveSet', () => {
  describe('When preemptive set cells are along a column', () => {
    test('Should return true', () => {
      expect(
        isColumnPreemptiveSet({ cells: ['0,3', '2,3'], someMoreFields: 'someMoreValues' })
      ).toBeTruthy();
    });
  });

  describe('When preemptive set cells are not along a column', () => {
    test('Should return false', () => {
      expect(
        isColumnPreemptiveSet({ cells: ['7,6', '7,7'], someMoreFields: 'someMoreValues' })
      ).toBeFalsy();
    });
  });
});

describe('isSubBoardPreemptiveSet', () => {
  describe('When preemptive set cells are in the same sub board', () => {
    test('Should return true', () => {
      expect(
        isSubBoardPreemptiveSet({ cells: ['0,3', '2,5'], someMoreFields: 'someMoreValues' })
      ).toBeTruthy();
    });
  });

  describe('When preemptive set cells are not in the same sub board', () => {
    test('Should return false', () => {
      expect(
        isSubBoardPreemptiveSet({ cells: ['2,2', '5,2'], someMoreFields: 'someMoreValues' })
      ).toBeFalsy();
    });
  });
});

describe('segregateMarkup', () => {
  test('Should segregate markup', () => {
    expect(segregateMarkup(partiallySolvedBoardMarkupToFindPreemptiveSet)).toStrictEqual(
      partiallySolvedBoardSegregatedMarkupToFindPreemptiveSet
    );
  });
});

describe('getMatchingMarkupByValues', () => {
  const markup = {
    '7,0': [1, 8],
    '7,6': [1, 5],
    '7,7': [1, 5]
  };

  describe('When some match is present', () => {
    test('Should return the matching markup cell', () => {
      expect(getMatchingMarkupByValues([1, 5], markup)).toStrictEqual(['7,6', '7,7']);
    });
  });

  describe('When no match is present', () => {
    test('Should return empty array', () => {
      expect(getMatchingMarkupByValues([5, 9], markup)).toStrictEqual([]);
    });
  });
});

describe('filterMarkup', () => {
  describe('When cells are present in the markup', () => {
    test('Should return matching markup', () => {
      expect(filterMarkup(['0,1'], { '0,0': [1, 2], '0,1': [2, 3] })).toStrictEqual({
        '0,1': [2, 3]
      });
    });
  });

  describe('When cells are not present in the markup', () => {
    test('Should return matching markup', () => {
      expect(filterMarkup(['2,3'], { '0,0': [1, 2], '0,1': [2, 3] })).toStrictEqual({});
    });
  });
});

describe('omitMarkup', () => {
  describe('When markup has cells to omit', () => {
    test('Should return markup after omitting the cells', () => {
      expect(omitMarkup(['0,1'], { '0,1': [1, 2], '2,2': [5, 6] })).toStrictEqual({
        '2,2': [5, 6]
      });
    });
  });

  describe('When markup does not have cells to omit', () => {
    test('Should return the markup', () => {
      expect(omitMarkup(['0,1'], { '1,1': [1, 2], '2,2': [5, 6] })).toStrictEqual({
        '1,1': [1, 2],
        '2,2': [5, 6]
      });
    });
  });

  describe('When markup only has cells that will be omittes', () => {
    test('Should return empty object', () => {
      expect(omitMarkup(['1,1', '2,1'], { '1,1': [1, 2], '2,1': [5, 6] })).toStrictEqual({});
    });
  });
});

describe('updateBoardMarkupUsingPreemptiveSet', () => {
  describe('When markup of a cell has more than one possible values', () => {
    test('Should return updated markup for the board', () => {
      const boardMarkup = {
        '7,0': [1, 8],
        '7,6': [1, 5],
        '7,7': [1, 5]
      };
      const preemptiveSet = {
        cells: ['7,6', '7,7'],
        id: '7,6-7,7',
        size: 2,
        values: [1, 5]
      };
      const markupToUpdate = {
        '7,0': [1, 8]
      };
      expect(
        updateBoardMarkupUsingPreemptiveSet(boardMarkup, preemptiveSet, markupToUpdate)
      ).toStrictEqual({
        '7,0': [8],
        '7,6': [1, 5],
        '7,7': [1, 5]
      });
    });
  });

  describe('When markup of a cell has only one value', () => {
    test('Should return same markup for the board', () => {
      const boardMarkup = {
        '7,0': [8],
        '7,6': [1, 5],
        '7,7': [1, 5]
      };
      const preemptiveSet = {
        cells: ['7,6', '7,7'],
        id: '7,6-7,7',
        size: 2,
        values: [1, 5]
      };
      const markupToUpdate = {
        '7,0': [1, 8]
      };
      expect(
        updateBoardMarkupUsingPreemptiveSet(boardMarkup, preemptiveSet, markupToUpdate)
      ).toStrictEqual({
        '7,0': [8],
        '7,6': [1, 5],
        '7,7': [1, 5]
      });
    });
  });
});
