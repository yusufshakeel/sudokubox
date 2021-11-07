'use strict';

const PreemptiveSetBuilder = require('../../../src/builders/preemptive-set-builder');
const LoggingHelper = require('../../../src/helpers/logging-helper');

const {
  partiallySolvedBoardMarkupToFindPreemptiveSet,
  partiallySolvedBoardPreemptiveSet
} = require('../../test-data/sudoku-puzzle-hard');

describe('PreemptiveSetBuilder', () => {
  const logging = new LoggingHelper({ isLoggingEnabled: true });
  const preemptiveSetBuilder = new PreemptiveSetBuilder({ logging });

  describe('When preemptive set exists in the markup', () => {
    test('Should return preemptive set', () => {
      const preemptiveSet = preemptiveSetBuilder
        .withMarkup(partiallySolvedBoardMarkupToFindPreemptiveSet)
        .build();
      expect(preemptiveSet).toStrictEqual(partiallySolvedBoardPreemptiveSet);
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
