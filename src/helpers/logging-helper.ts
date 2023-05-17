import { LoggingConfigType } from '../ts-def/logging-config-type';

export default class LoggingHelper {
  private isLoggingEnabled = false;
  private logger;

  constructor(config: LoggingConfigType = {}) {
    this.isLoggingEnabled = config.isLoggingEnabled || false;
    this.logger = config.logger || { debug: () => { /* do nothing */ } };
  }

  private time() {
    return new Date().toISOString();
  }

  public debug(data: any) {
    this.isLoggingEnabled &&
    this.logger.debug(
      JSON.stringify({
        timestamp: this.time(),
        type: 'DEBUG',
        data
      })
    );
  }
}