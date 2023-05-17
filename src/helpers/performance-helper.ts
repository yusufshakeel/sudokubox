import { PerformanceConfigType } from '../ts-def/performance-config-type';

export default class PerformanceHelper {
  private logPerformance = false;
  private startedAt = 0;
  private endedAt = 0;

  constructor(config: PerformanceConfigType) {
    this.logPerformance = config.logPerformance || false;
  }

  public startTimer() {
    this.startedAt = new Date().getTime();
  }

  public stopTimer() {
    this.endedAt = new Date().getTime();
  }

  public stats() {
    if (this.logPerformance) {
      const milli = this.endedAt - this.startedAt;
      return {
        duration: {
          nano: milli * 1e6,
          micro: milli * 1e3,
          milli,
          second: milli / 1e3
        }
      };
    }
  }
}