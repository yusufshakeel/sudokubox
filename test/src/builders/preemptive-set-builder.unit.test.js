'use strict';

const PreemptiveSetBuilder = require('../../../src/builders/preemptive-set-builder');

const {
  partiallySolvedBoardMarkupToFindPreemptiveSet
} = require('../../test-data/sudoku-puzzle-hard');

describe('PreemptiveSetBuilder', () => {
  const preemptiveSetBuilder = new PreemptiveSetBuilder();

  describe('When preemptive set exists in the markup', () => {
    test('Should return preemptive set', () => {
      const preemptiveSet = preemptiveSetBuilder
        .withMarkup(partiallySolvedBoardMarkupToFindPreemptiveSet)
        .build();
      expect(preemptiveSet).toStrictEqual([
        {
          cells: ['0,3', '2,3'],
          id: '0,3-2,3',
          size: 2,
          values: [5, 9]
        },
        {
          cells: ['2,2', '5,2'],
          id: '2,2-5,2',
          size: 2,
          values: [1, 8]
        },
        {
          cells: ['4,0', '4,1'],
          id: '4,0-4,1',
          size: 2,
          values: [2, 6]
        },
        {
          cells: ['5,0', '5,2'],
          id: '5,0-5,2',
          size: 2,
          values: [1, 8]
        },
        {
          cells: ['5,0', '7,0'],
          id: '5,0-7,0',
          size: 2,
          values: [1, 8]
        },
        {
          cells: ['6,3', '8,3'],
          id: '6,3-8,3',
          size: 2,
          values: [1, 7]
        },
        {
          cells: ['7,6', '7,7'],
          id: '7,6-7,7',
          size: 2,
          values: [1, 5]
        }
      ]);
    });
  });

  describe('When preemptive set does not exists in the markup', () => {
    test('Should return empty array', () => {
      const preemptiveSet = preemptiveSetBuilder
        .withMarkup({
          '0,1': [4, 5],
          '7,5': [4, 5]
        })
        .build();
      expect(preemptiveSet).toStrictEqual([]);
    });
  });
});
