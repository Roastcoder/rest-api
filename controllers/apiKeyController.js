const db = require('../config/database');

const apiKeyController = {
  getAllApiKeys: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM api_keys');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getApiKeyById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM api_keys WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'API Key not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createApiKey: async (req, res) => {
    try {
      const { name, api_key, rate_limit, is_active, created_by, channel_code } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO api_keys (name, api_key, rate_limit, is_active, created_by, channel_code) VALUES (?, ?, ?, ?, ?, ?)`,
        [name, api_key, rate_limit, is_active, created_by, channel_code]
      );
      
      res.status(201).json({ id: result.insertId, message: 'API Key created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateApiKey: async (req, res) => {
    try {
      const { name, rate_limit, is_active } = req.body;
      const [result] = await db.execute('UPDATE api_keys SET name = ?, rate_limit = ?, is_active = ? WHERE id = ?', [name, rate_limit, is_active, req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'API Key not found' });
      }
      
      res.json({ message: 'API Key updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteApiKey: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM api_keys WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'API Key not found' });
      }
      
      res.json({ message: 'API Key deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = apiKeyController;