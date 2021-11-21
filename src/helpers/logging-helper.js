'use strict';

function LoggingHelper(config = {}) {
  const { isLoggingEnabled = false, logfile, fs, LOG = console } = config;
  const time = () => new Date().toISOString();

  this.debug = data => {
    const log = JSON.stringify({
      timestamp: time(),
      type: 'DEBUG',
      data
    });

    isLoggingEnabled && LOG.debug(log);
    !!logfile && fs.appendFileSync(logfile, `${log}\n`, { encoding: 'utf8' });
  };
}

module.exports = LoggingHelper;
