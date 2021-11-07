'use strict';

function LoggingHelper(config = {}) {
  const { isLoggingEnabled = false, LOG = console } = config;
  const time = () => new Date().toISOString();

  this.debug = data => {
    isLoggingEnabled &&
      LOG.debug(
        JSON.stringify({
          timestamp: time(),
          type: 'DEBUG',
          data: data
        })
      );
  };
}

module.exports = LoggingHelper;
