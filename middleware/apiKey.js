const db = require('../config/database');

const validateApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
    
    if (!apiKey) {
      return res.status(401).json({ error: 'API key required' });
    }
    
    const [rows] = await db.execute(
      'SELECT * FROM api_keys WHERE api_key = ? AND is_active = 1',
      [apiKey]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    req.apiKey = rows[0];
    next();
  } catch (error) {
    res.status(500).json({ error: 'API key validation failed' });
  }
};

module.exports = { validateApiKey };