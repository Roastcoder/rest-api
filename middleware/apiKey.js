const db = require('../config/database');

const validateApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
    
    if (!apiKey) {
      return res.status(401).json({ error: 'API key required' });
    }
    
    const [rows] = await db.execute(
      'SELECT ak.*, u.role_id, r.name as role_name FROM api_keys ak LEFT JOIN users u ON ak.created_by = u.id LEFT JOIN roles r ON u.role_id = r.id WHERE ak.api_key = ? AND ak.is_active = 1',
      [apiKey]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    req.apiKey = rows[0];
    req.user = {
      id: rows[0].created_by,
      role: rows[0].role_name,
      user_type: rows[0].role_name
    };
    next();
  } catch (error) {
    res.status(500).json({ error: 'API key validation failed' });
  }
};

module.exports = { validateApiKey };