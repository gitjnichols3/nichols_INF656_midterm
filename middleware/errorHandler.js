const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const logsDir = path.join(__dirname, '..', 'logs');
const errorLog = path.join(logsDir, 'error.txt');

async function appendError(line) {
  try {
    await fsp.mkdir(logsDir, { recursive: true });
    await fsp.appendFile(errorLog, line, 'utf8');
  } catch (e) {
    console.error('Error logging failed:', e.message);
  }
}

// 404 handler (unknown routes)
function notFound(req, res, next) {
  const line = `${new Date().toISOString()}\t404\t${req.method}\t${req.originalUrl}\n`;
  appendError(line).finally(() => {
    res.status(404).json({ error: 'Not found', path: req.originalUrl });
  });
}

// Global error handler (thrown/rejected errors)
function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const line = `${new Date().toISOString()}\t${status}\t${req.method}\t${req.originalUrl}\t${err.message}\n`;
  appendError(line).finally(() => {
    res.status(status).json({ error: status === 404 ? 'Not found' : 'Server error' });
  });
}

module.exports = { notFound, errorHandler };
