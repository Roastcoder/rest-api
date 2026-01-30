const db = require('../config/database');

const settingController = {
  getAllSettings: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM settings');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSettingById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM settings WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Setting not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSettingByKey: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM settings WHERE setting_key = ?', [req.params.key]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Setting not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createSetting: async (req, res) => {
    try {
      const { setting_key, setting_value } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)`,
        [setting_key, setting_value]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Setting created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateSetting: async (req, res) => {
    try {
      const { setting_value } = req.body;
      const [result] = await db.execute('UPDATE settings SET setting_value = ? WHERE id = ?', [setting_value, req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Setting not found' });
      }
      
      res.json({ message: 'Setting updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteSetting: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM settings WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Setting not found' });
      }
      
      res.json({ message: 'Setting deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = settingController;