const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const logsDir = path.join(__dirname, '..', 'logs');
const logFile = path.join(logsDir, 'requests.txt');

async function ensureLogsDir() {
  try {
    await fsp.mkdir(logsDir, { recursive: true });
  } catch (err) {
    // If we can't create the dir, we'll still let the request proceed
    console.error('Logger: failed to ensure logs directory:', err.message);
  }
}

module.exports = async function logger(req, res, next) {
  const ts = new Date().toISOString();
  const line = `${ts}\t${req.method}\t${req.originalUrl}\n`;

  try {
    await ensureLogsDir();
    await fsp.appendFile(logFile, line, 'utf8');
  } catch (err) {
    // Do not block the request if logging fails
    console.error('Logger: failed to write log:', err.message);
  }

  next();
};
