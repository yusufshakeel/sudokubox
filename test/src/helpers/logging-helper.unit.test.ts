import LoggingHelper from '../../../src/helpers/logging-helper';

describe('LoggingHelper', () => {
  describe('When logging is enabled', () => {
    describe('Debug', () => {
      test('Should log', () => {
        const config = { isLoggingEnabled: true, logger: { debug: jest.fn() } };
        const loggingHelper = new LoggingHelper(config);
        loggingHelper.debug('Some data');
        expect(config.logger.debug).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('When logging is disabled', () => {
    describe('When passing config', () => {
      describe('Debug', () => {
        test('Should log', () => {
          const config = { logger: { debug: jest.fn() } };
          const loggingHelper = new LoggingHelper(config);
          loggingHelper.debug('Some data');
          expect(config.logger.debug).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('When not passing config', () => {
      describe('Debug', () => {
        test('Should log', () => {
          const loggingHelper= new LoggingHelper();
          expect(() => loggingHelper.debug('Some data')).not.toThrow();
        });
      });
    });
  });
});