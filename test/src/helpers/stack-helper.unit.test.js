'use strict';

const StackHelper = require('../../../src/helpers/stack-helper');

describe('StackHelper', () => {
  describe('When stack is empty', () => {
    describe('When peek is called', () => {
      test('Should return undefined', () => {
        const stack = new StackHelper();
        expect(stack.peek()).toBeUndefined();
      });
    });

    describe('When pop is called', () => {
      test('Should return undefined', () => {
        const stack = new StackHelper();
        expect(stack.pop()).toBeUndefined();
      });
    });

    describe('When push is called', () => {
      test('Should return size of the stack', () => {
        const stack = new StackHelper();
        expect(stack.push({ cellRowIndex: 1, cellColumnIndex: 1, value: 1 })).toBe(1);
      });
    });

    describe('When size is called', () => {
      test('Should return 0', () => {
        const stack = new StackHelper();
        expect(stack.size()).toBe(0);
      });
    });
  });

  describe('When stack has item', () => {
    describe('When peek is called', () => {
      test('Should return that item', () => {
        const stack = new StackHelper();
        stack.push({ cellRowIndex: 1, cellColumnIndex: 1, value: 1 });
        expect(stack.peek()).toStrictEqual({ cellRowIndex: 1, cellColumnIndex: 1, value: 1 });
      });
    });

    describe('When pop is called', () => {
      test('Should return that item', () => {
        const stack = new StackHelper();
        stack.push({ cellRowIndex: 1, cellColumnIndex: 1, value: 1 });
        expect(stack.pop()).toStrictEqual({ cellRowIndex: 1, cellColumnIndex: 1, value: 1 });
        expect(stack.size()).toBe(0);
      });
    });

    describe('When push is called', () => {
      test('Should return that item', () => {
        const stack = new StackHelper();
        stack.push({ cellRowIndex: 1, cellColumnIndex: 1, value: 1 });
        expect(stack.push({ cellRowIndex: 2, cellColumnIndex: 2, value: 4 })).toBe(2);
        expect(stack.size()).toBe(2);
      });
    });
  });
});
