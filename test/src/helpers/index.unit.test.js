'use strict';

const {
  getRow,
  getColumn,
  isUniqueValueInRow,
  isUniqueValueInColumn
} = require('../../../src/helpers');
const { puzzle } = require('../../test-data/sudoku-puzzle-easy');

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
