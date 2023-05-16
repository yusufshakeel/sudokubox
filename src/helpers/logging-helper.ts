import * as console from 'console';

export default class LoggingHelper {
  private isLoggingEnabled = false;
  private LOG = console;

  constructor(config: any = {}) {
    this.isLoggingEnabled = config.isLoggingEnabled || false;
    this.LOG = config.LOG || console;
  }

  private time() {
    return new Date().toISOString();
  }

  public debug(data: any) {
    this.isLoggingEnabled &&
    this.LOG.debug(
      JSON.stringify({
        timestamp: this.time(),
        type: 'DEBUG',
        data
      })
    );
  }
}