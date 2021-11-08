'use strict';

const PerformanceHelper = require('../../../src/helpers/performance-helper');

describe('PerformanceHelper', () => {
  test('Should return performance numbers', () => {
    const performance = new PerformanceHelper();
    performance.startTimer();
    performance.stopTimer();
    const result = performance.stats();
    expect(Object.keys(result)).toStrictEqual(['duration']);
    expect(Object.keys(result.duration)).toStrictEqual(['nano', 'micro', 'milli', 'second']);
  });
});
