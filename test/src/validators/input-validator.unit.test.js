'use strict';

const InputValidator = require('../../../src/validators/input-validator');
const { puzzle: validInputPuzzle } = require('../../test-data/sudoku-puzzle-easy');
const { puzzle: invalidInputPuzzle } = require('../../test-data/sudoku-puzzle-invalid-input');

describe('InputValidator', () => {
  const inputValidator = new InputValidator();

  describe('When input uses allowed numbers', () => {
    test('Should not throw error', () => {
      expect(() => inputValidator.validate(validInputPuzzle)).not.toThrow();
    });
  });

  describe('When input uses disallowed numbers', () => {
    test('Should throw error', () => {
      expect(() => inputValidator.validate(invalidInputPuzzle)).toThrow(
        'Input board contains invalid number in Row: 0, Column: 0.'
      );
    });
  });

  describe('When input does not have 9x9 numbers', () => {
    describe('When there are not exactly 9 rows', () => {
      test('Should throw error', () => {
        expect(() => inputValidator.validate([[1]])).toThrow(
          'Input board must have exactly 9 rows.'
        );
      });
    });

    describe('When there are not exactly 9 columns', () => {
      test('Should throw error', () => {
        expect(() =>
          inputValidator.validate([[1], [2], [3], [4], [5], [6], [7], [8], [9]])
        ).toThrow('Input board must have exactly 9 columns in Row 0.');
      });
    });
  });
});
