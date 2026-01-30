const db = require('../config/database');

const referralHierarchyController = {
  getAllHierarchy: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT rh.*, u1.name as referrer_name, u2.name as referred_name 
        FROM referral_hierarchy rh 
        LEFT JOIN users u1 ON rh.referrer_user_id = u1.id 
        LEFT JOIN users u2 ON rh.referred_user_id = u2.id
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getHierarchyById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM referral_hierarchy WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Hierarchy not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createHierarchy: async (req, res) => {
    try {
      const { referrer_user_id, referred_user_id, level, referral_code } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO referral_hierarchy (referrer_user_id, referred_user_id, level, referral_code) VALUES (?, ?, ?, ?)`,
        [referrer_user_id, referred_user_id, level, referral_code]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Hierarchy created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteHierarchy: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM referral_hierarchy WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Hierarchy not found' });
      }
      
      res.json({ message: 'Hierarchy deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = referralHierarchyController;