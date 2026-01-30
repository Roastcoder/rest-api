const db = require('../config/database');

const referralLinkController = {
  getAllLinks: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT rl.*, u.name as user_name, p.name as product_name 
        FROM referral_links rl 
        LEFT JOIN users u ON rl.user_id = u.id 
        LEFT JOIN products p ON rl.product_id = p.id
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getLinkById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM referral_links WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Link not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createLink: async (req, res) => {
    try {
      const { user_id, referral_code, referral_url, product_id, clicks, signups, status } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO referral_links (user_id, referral_code, referral_url, product_id, clicks, signups, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [user_id, referral_code, referral_url, product_id, clicks, signups, status]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Link created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateLink: async (req, res) => {
    try {
      const { clicks, signups, status } = req.body;
      const [result] = await db.execute('UPDATE referral_links SET clicks = ?, signups = ?, status = ? WHERE id = ?', [clicks, signups, status, req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Link not found' });
      }
      
      res.json({ message: 'Link updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteLink: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM referral_links WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Link not found' });
      }
      
      res.json({ message: 'Link deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = referralLinkController;