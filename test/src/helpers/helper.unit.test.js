'use strict';

const { arrayEquals } = require('../../../src/helpers/helper');

describe('arrayEquals', () => {
  describe('When arrays are equal', () => {
    test('Should return true', () => {
      expect(arrayEquals([1, 2, 3], [2, 1, 3])).toBeTruthy();
      expect(arrayEquals([1, 2, 3], [1, 2, 3])).toBeTruthy();
    });
  });

  describe('When arrays are not equal', () => {
    test('Should return false', () => {
      expect(arrayEquals([1, 2, 3], [1, 1, 3])).toBeFalsy();
    });
  });
});
