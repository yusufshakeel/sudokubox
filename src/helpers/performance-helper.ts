import * as process from 'process';

export default class PerformanceHelper {
  private logPerformance = false;
  private startedAt: [number,number] = [0,0];
  private duration: [number,number] = [0,0];

  constructor(config: any) {
    this.logPerformance = config.logPerformance || false;
  }

  public startTimer() {
    this.startedAt = process.hrtime();
  }

  public stopTimer() {
    this.duration = process.hrtime(this.startedAt);
  }

  public stats() {
    if (this.logPerformance) {
      const nano = this.duration[0] * 1e9 + this.duration[1];
      return {
        duration: {
          nano,
          micro: nano / 1e3,
          milli: nano / 1e6,
          second: nano / 1e9
        }
      };
    }
  }
}