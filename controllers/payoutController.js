const db = require('../config/database');

const payoutController = {
  // Get all payouts
  getAllPayouts: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT p.*, l.customer_name, l.lead_id as lead_reference, u.name as user_name 
        FROM payouts p 
        LEFT JOIN leads l ON p.lead_id = l.id 
        LEFT JOIN users u ON p.channel_code = u.channel_code
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get payout by ID
  getPayoutById: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT p.*, l.customer_name, l.lead_id as lead_reference, u.name as user_name 
        FROM payouts p 
        LEFT JOIN leads l ON p.lead_id = l.id 
        LEFT JOIN users u ON p.channel_code = u.channel_code 
        WHERE p.id = ?
      `, [req.params.id]);
      
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Payout not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create new payout
  createPayout: async (req, res) => {
    try {
      const { 
        lead_id, channel_code, commission_amount, bonus_amount, 
        status, payout_date, deduction_amount, payout_remark 
      } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO payouts (lead_id, channel_code, commission_amount, 
         bonus_amount, status, payout_date, deduction_amount, payout_remark) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [lead_id, channel_code, commission_amount, bonus_amount, 
         status, payout_date, deduction_amount, payout_remark]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Payout created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update payout
  updatePayout: async (req, res) => {
    try {
      const { 
        commission_amount, bonus_amount, status, payout_date, 
        deduction_amount, payout_remark 
      } = req.body;
      
      const [result] = await db.execute(
        `UPDATE payouts SET commission_amount = ?, bonus_amount = ?, 
         status = ?, payout_date = ?, deduction_amount = ?, payout_remark = ? 
         WHERE id = ?`,
        [commission_amount, bonus_amount, status, payout_date, 
         deduction_amount, payout_remark, req.params.id]
      );
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Payout not found' });
      }
      
      res.json({ message: 'Payout updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete payout
  deletePayout: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM payouts WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Payout not found' });
      }
      
      res.json({ message: 'Payout deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get payouts by channel code
  getPayoutsByChannel: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT p.*, l.customer_name, l.lead_id as lead_reference 
        FROM payouts p 
        LEFT JOIN leads l ON p.lead_id = l.id 
        WHERE p.channel_code = ?
      `, [req.params.channelCode]);
      
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get payouts by status
  getPayoutsByStatus: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM payouts WHERE status = ?', [req.params.status]);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = payoutController;