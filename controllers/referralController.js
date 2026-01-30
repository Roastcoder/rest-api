const db = require('../config/database');

const referralController = {
  // Get all referrals
  getAllReferrals: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT r.*, 
               u1.name as referrer_name, u1.email as referrer_email,
               u2.name as referred_name, u2.email as referred_email
        FROM referral_users r 
        LEFT JOIN users u1 ON r.referrer_user_id = u1.id 
        LEFT JOIN users u2 ON r.referred_user_id = u2.id
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get referral by ID
  getReferralById: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT r.*, 
               u1.name as referrer_name, u1.email as referrer_email,
               u2.name as referred_name, u2.email as referred_email
        FROM referral_users r 
        LEFT JOIN users u1 ON r.referrer_user_id = u1.id 
        LEFT JOIN users u2 ON r.referred_user_id = u2.id 
        WHERE r.id = ?
      `, [req.params.id]);
      
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Referral not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create new referral
  createReferral: async (req, res) => {
    try {
      const { 
        referrer_user_id, referred_user_id, referral_code, referrer_name,
        first_lead_date, first_activation_date, total_commission_earned,
        status, level
      } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO referral_users (referrer_user_id, referred_user_id, 
         referral_code, referrer_name, first_lead_date, first_activation_date, 
         total_commission_earned, status, level) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [referrer_user_id, referred_user_id, referral_code, referrer_name,
         first_lead_date, first_activation_date, total_commission_earned,
         status, level]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Referral created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update referral
  updateReferral: async (req, res) => {
    try {
      const { 
        first_lead_date, first_activation_date, total_commission_earned,
        status, level
      } = req.body;
      
      const [result] = await db.execute(
        `UPDATE referral_users SET first_lead_date = ?, first_activation_date = ?, 
         total_commission_earned = ?, status = ?, level = ? WHERE id = ?`,
        [first_lead_date, first_activation_date, total_commission_earned,
         status, level, req.params.id]
      );
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Referral not found' });
      }
      
      res.json({ message: 'Referral updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete referral
  deleteReferral: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM referral_users WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Referral not found' });
      }
      
      res.json({ message: 'Referral deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get referrals by referrer user ID
  getReferralsByReferrer: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT r.*, u.name as referred_name, u.email as referred_email
        FROM referral_users r 
        LEFT JOIN users u ON r.referred_user_id = u.id 
        WHERE r.referrer_user_id = ?
      `, [req.params.referrerId]);
      
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get referrals by status
  getReferralsByStatus: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM referral_users WHERE status = ?', [req.params.status]);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = referralController;