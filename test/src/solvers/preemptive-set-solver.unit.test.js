'use strict';

const PreemptiveSetSolver = require('../../../src/solvers/preemptive-set-solver');

const {
  partiallySolvedBoardMarkupToFindPreemptiveSet,
  partiallySolvedBoardPreemptiveSet,
  partiallySolvedBoardMarkupAfterSolvingPreemptiveSet
} = require('../../test-data/sudoku-puzzle-hard');

describe('PreemptiveSetSolver', () => {
  const preemptiveSetSolver = new PreemptiveSetSolver();

  test('Should return markup', () => {
    const result = preemptiveSetSolver.solve(
      partiallySolvedBoardPreemptiveSet,
      partiallySolvedBoardMarkupToFindPreemptiveSet
    );
    expect(result).toStrictEqual(partiallySolvedBoardMarkupAfterSolvingPreemptiveSet);
  });

  describe('When preemptive set is along the row', () => {
    describe('When row markup has only cell present in preemptive set', () => {
      test('Should return the same markup', () => {
        const result = preemptiveSetSolver.solve(
          [
            {
              cells: ['7,6', '7,7'],
              id: '7,6-7,7',
              size: 2,
              values: [1, 5]
            }
          ],
          {
            '7,6': [1, 5],
            '7,7': [1, 5]
          }
        );
        expect(result).toStrictEqual({
          '7,6': [1, 5],
          '7,7': [1, 5]
        });
      });
    });

    describe('When row markup has other cells apart from cells in preemptive set', () => {
      test('Should return the updated markup', () => {
        const result = preemptiveSetSolver.solve(
          [
            {
              cells: ['5,0', '7,0'],
              id: '5,0-7,0',
              size: 2,
              values: [1, 8]
            },
            {
              cells: ['7,6', '7,7'],
              id: '7,6-7,7',
              size: 2,
              values: [1, 5]
            }
          ],
          {
            '7,0': [1, 8],
            '7,6': [1, 5],
            '7,7': [1, 5]
          }
        );
        expect(result).toStrictEqual({
          '7,0': [8],
          '7,6': [1, 5],
          '7,7': [1, 5]
        });
      });
    });
  });

  describe('When preemptive set is along the column', () => {
    describe('When column markup has only cell present in preemptive set', () => {
      test('Should return the same markup', () => {
        const result = preemptiveSetSolver.solve(
          [
            {
              cells: ['0,3', '2,3'],
              id: '0,3-2,3',
              size: 2,
              values: [5, 9]
            }
          ],
          {
            '0,3': [5, 9],
            '2,3': [5, 9]
          }
        );
        expect(result).toStrictEqual({
          '0,3': [5, 9],
          '2,3': [5, 9]
        });
      });
    });

    describe('When column markup has other cells apart from cells in preemptive set', () => {
      test('Should return the updated markup', () => {
        const result = preemptiveSetSolver.solve(
          [
            {
              cells: ['0,3', '2,3'],
              id: '0,3-2,3',
              size: 2,
              values: [5, 9]
            }
          ],
          {
            '0,3': [5, 9],
            '2,3': [5, 9],
            '6,3': [1, 5]
          }
        );
        expect(result).toStrictEqual({
          '0,3': [5, 9],
          '2,3': [5, 9],
          '6,3': [1]
        });
      });
    });
  });

  describe('When preemptive set is in sub board', () => {
    describe('When sub board markup has only cell present in preemptive set', () => {
      test('Should return the same markup', () => {
        const result = preemptiveSetSolver.solve(
          [
            {
              cells: ['4,0', '5,1'],
              id: '4,0-5,1',
              size: 2,
              values: [2, 6]
            }
          ],
          {
            '4,0': [2, 6],
            '5,1': [2, 6]
          }
        );
        expect(result).toStrictEqual({
          '4,0': [2, 6],
          '5,1': [2, 6]
        });
      });
    });

    describe('When sub board markup has other cells apart from cells in preemptive set', () => {
      test('Should return the updated markup', () => {
        const result = preemptiveSetSolver.solve(
          [
            {
              cells: ['4,0', '5,1'],
              id: '4,0-5,1',
              size: 2,
              values: [2, 6]
            }
          ],
          {
            '4,0': [2, 6],
            '5,1': [2, 6],
            '5,2': [1, 2, 3]
          }
        );
        expect(result).toStrictEqual({
          '4,0': [2, 6],
          '5,1': [2, 6],
          '5,2': [1, 3]
        });
      });
    });
  });
});
