'use strict';

/**
 * This is for recording performance.
 * @constructor
 */
function PerformanceHelper(config) {
  const { logPerformance } = config;
  let startedAt = 0;
  let duration = 0;

  /**
   * Start the timer.
   */
  this.startTimer = () => {
    startedAt = process.hrtime();
  };

  /**
   * Stop the timer.
   */
  this.stopTimer = () => {
    duration = process.hrtime(startedAt);
  };

  /**
   * This will return performance statistics.
   * @returns {{duration: {micro: number, nano: number, milli: number, second: number}}}
   */
  this.stats = () => {
    if (logPerformance) {
      const nano = duration[0] * 1e9 + duration[1];
      return {
        duration: {
          nano,
          micro: nano / 1e3,
          milli: nano / 1e6,
          second: nano / 1e9
        }
      };
    }
  };
}

module.exports = PerformanceHelper;
