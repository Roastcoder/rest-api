const db = require('../config/database');

const referralBonusController = {
  getAllBonuses: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT rb.*, u1.name as referrer_name, u2.name as referred_name, l.customer_name 
        FROM referral_bonuses rb 
        LEFT JOIN users u1 ON rb.referrer_id = u1.id 
        LEFT JOIN users u2 ON rb.referred_user_id = u2.id 
        LEFT JOIN leads l ON rb.lead_id = l.id
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getBonusById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM referral_bonuses WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Bonus not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createBonus: async (req, res) => {
    try {
      const { referrer_id, referred_user_id, lead_id, bonus_amount, status, referral_user_id } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO referral_bonuses (referrer_id, referred_user_id, lead_id, bonus_amount, status, referral_user_id) VALUES (?, ?, ?, ?, ?, ?)`,
        [referrer_id, referred_user_id, lead_id, bonus_amount, status, referral_user_id]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Bonus created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateBonus: async (req, res) => {
    try {
      const { status } = req.body;
      const [result] = await db.execute('UPDATE referral_bonuses SET status = ? WHERE id = ?', [status, req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Bonus not found' });
      }
      
      res.json({ message: 'Bonus updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteBonus: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM referral_bonuses WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Bonus not found' });
      }
      
      res.json({ message: 'Bonus deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = referralBonusController;