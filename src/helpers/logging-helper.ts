import { LoggingConfigType } from '../ts-def/logging-config-type';
import { LoggerType } from '../ts-def/logger-type';

export default class LoggingHelper {
  private isLoggingEnabled = false;
  private logger: LoggerType;

  constructor(config: LoggingConfigType = {}) {
    this.isLoggingEnabled = config.isLoggingEnabled || false;
    this.logger = config.logger || { debug: () => { /* do nothing */ } };
  }

  public debug(data: any) {
    this.isLoggingEnabled &&
    this.logger.debug({
      data
    });
  }
}