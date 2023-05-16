import { arrayEquals, isEmpty } from '../../../src/helpers/helper';

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

describe('isEmpty', () => {
  describe('When checking array', () => {
    describe('When array is empty', () => {
      test('Should return true', () => {
        expect(isEmpty([])).toBeTruthy();
      });
    });

    describe('When array is not empty', () => {
      test('Should return false', () => {
        expect(isEmpty([1, 2])).toBeFalsy();
      });
    });
  });

  describe('When checking object', () => {
    describe('When object is empty', () => {
      test('Should return true', () => {
        expect(isEmpty({})).toBeTruthy();
      });
    });

    describe('When object is not empty', () => {
      test('Should return false', () => {
        expect(isEmpty({ key: 'value' })).toBeFalsy();
      });
    });
  });
});