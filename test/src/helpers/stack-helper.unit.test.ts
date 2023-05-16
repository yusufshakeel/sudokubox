import StackHelper from '../../../src/helpers/stack-helper';

describe('StackHelper', () => {
  let stack: StackHelper;

  beforeEach(() => {
    stack = new StackHelper();
  });

  describe('When stack is empty', () => {
    describe('When peek is called', () => {
      test('Should return undefined', () => {
        expect(stack.peek()).toBeUndefined();
      });
    });

    describe('When pop is called', () => {
      test('Should return undefined', () => {
        expect(stack.pop()).toBeUndefined();
      });
    });

    describe('When push is called', () => {
      test('Should return size of the stack', () => {
        expect(stack.push({ cellRowIndex: 1, cellColumnIndex: 1, value: 1 })).toBe(1);
      });
    });

    describe('When size is called', () => {
      test('Should return 0', () => {
        expect(stack.size()).toBe(0);
      });
    });

    describe('When raw is called', () => {
      test('Should return stack', () => {
        expect(stack.raw()).toStrictEqual([]);
      });
    });
  });

  describe('When stack has item', () => {
    describe('When peek is called', () => {
      test('Should return that item', () => {
        stack.push({ cellRowIndex: 1, cellColumnIndex: 1, value: 1 });
        expect(stack.peek()).toStrictEqual({ cellRowIndex: 1, cellColumnIndex: 1, value: 1 });
      });
    });

    describe('When pop is called', () => {
      test('Should return that item', () => {
        stack.push({ cellRowIndex: 1, cellColumnIndex: 1, value: 1 });
        expect(stack.pop()).toStrictEqual({ cellRowIndex: 1, cellColumnIndex: 1, value: 1 });
        expect(stack.size()).toBe(0);
      });
    });

    describe('When push is called', () => {
      test('Should return that item', () => {
        stack.push({ cellRowIndex: 1, cellColumnIndex: 1, value: 1 });
        expect(stack.push({ cellRowIndex: 2, cellColumnIndex: 2, value: 4 })).toBe(2);
        expect(stack.size()).toBe(2);
      });
    });

    describe('When raw is called', () => {
      test('Should return stack', () => {
        stack.push({ cellRowIndex: 1, cellColumnIndex: 1, value: 1 });
        stack.push({ cellRowIndex: 2, cellColumnIndex: 2, value: 2 });
        expect(stack.raw()).toStrictEqual([
          {
            cellColumnIndex: 1,
            cellRowIndex: 1,
            value: 1
          },
          {
            cellColumnIndex: 2,
            cellRowIndex: 2,
            value: 2
          }
        ]);
      });
    });
  });
});