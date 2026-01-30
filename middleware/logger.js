const db = require('../config/database');

const logger = {
  info: (msg, data) => console.log(`INFO: ${msg}`, data),
  error: (msg, error) => console.error(`ERROR: ${msg}`, error)
};

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

      logger.info('API Request', logData);
    } catch (error) {
      logger.error('Audit log failed', error);
    }
  });

  next();
};

module.exports = { auditLog, logger };