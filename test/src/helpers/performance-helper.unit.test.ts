import PerformanceHelper from '../../../src/helpers/performance-helper';

describe('PerformanceHelper', () => {
  describe('When logPerformance is false', () => {
    test('Should return undefined', () => {
      const performance = new PerformanceHelper({ logPerformance: false });
      performance.startTimer();
      performance.stopTimer();
      expect(performance.stats()).toBeUndefined();
    });
  });

  describe('When logPerformance is true', () => {
    test('Should return performance numbers', () => {
      const performance = new PerformanceHelper({ logPerformance: true });
      performance.startTimer();
      performance.stopTimer();
      const result = performance.stats();
      expect(result).toStrictEqual({
        duration: {
          nano: expect.any(Number),
          micro: expect.any(Number),
          milli: expect.any(Number),
          second: expect.any(Number)
        }
      });
    });
  });
});