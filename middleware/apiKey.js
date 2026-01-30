const db = require('../config/database');
const crypto = require('crypto');

const validateApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
      return res.status(401).json({ error: 'API key required' });
    }

    const hashedKey = crypto.createHash('sha256').update(apiKey).digest('hex');
    
    const [rows] = await db.execute(
      'SELECT * FROM api_keys WHERE key_hash = ? AND is_active = 1 AND expires_at > NOW()',
      [hashedKey]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid or expired API key' });
    }

    req.apiKey = rows[0];
    next();
  } catch (error) {
    res.status(500).json({ error: 'API key validation failed' });
  }
};

module.exports = { validateApiKey };