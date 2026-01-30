const winston = require('winston');
const db = require('../config/database');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/audit.log' }),
    new winston.transports.Console()
  ]
});

const auditLog = async (req, res, next) => {
  const startTime = Date.now();
  
  res.on('finish', async () => {
    try {
      const logData = {
        user_id: req.user?.id || null,
        api_key_id: req.apiKey?.id || null,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        user_agent: req.get('User-Agent'),
        status_code: res.statusCode,
        response_time: Date.now() - startTime,
        timestamp: new Date()
      };

      await db.execute(`
        INSERT INTO audit_logs (user_id, api_key_id, method, url, ip, user_agent, status_code, response_time, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        logData.user_id, logData.api_key_id, logData.method, logData.url,
        logData.ip, logData.user_agent, logData.status_code, logData.response_time, logData.timestamp
      ]);

      logger.info('API Request', logData);
    } catch (error) {
      logger.error('Audit log failed', error);
    }
  });

  next();
};

module.exports = { auditLog, logger };