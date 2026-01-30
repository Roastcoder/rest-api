const db = require('../config/database');

const payoutSettingController = {
  getAllSettings: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT ps.*, u.name as user_name, au.name as advisor_name, p.name as product_name 
        FROM payout_settings ps 
        LEFT JOIN users u ON ps.user_id = u.id 
        LEFT JOIN users au ON ps.advisor_user_id = au.id 
        LEFT JOIN products p ON ps.product_id = p.id
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSettingById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM payout_settings WHERE id = ?', [req.params.id]);
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
      const { user_id, advisor_user_id, product_id, product_category, payout_rate, rate_type, is_custom_rate } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO payout_settings (user_id, advisor_user_id, product_id, product_category, payout_rate, rate_type, is_custom_rate) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [user_id, advisor_user_id, product_id, product_category, payout_rate, rate_type, is_custom_rate]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Setting created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateSetting: async (req, res) => {
    try {
      const { payout_rate, rate_type, is_custom_rate } = req.body;
      const [result] = await db.execute('UPDATE payout_settings SET payout_rate = ?, rate_type = ?, is_custom_rate = ? WHERE id = ?', [payout_rate, rate_type, is_custom_rate, req.params.id]);
      
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
      const [result] = await db.execute('DELETE FROM payout_settings WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Setting not found' });
      }
      
      res.json({ message: 'Setting deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = payoutSettingController;