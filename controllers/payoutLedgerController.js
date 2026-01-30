const db = require('../config/database');

const payoutLedgerController = {
  getAllLedger: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT pl.*, u.name as user_name, su.name as source_user_name, l.customer_name, p.name as product_name 
        FROM payout_ledger pl 
        LEFT JOIN users u ON pl.user_id = u.id 
        LEFT JOIN users su ON pl.source_user_id = su.id 
        LEFT JOIN leads l ON pl.lead_id = l.id 
        LEFT JOIN products p ON pl.product_id = p.id
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getLedgerById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM payout_ledger WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Ledger entry not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createLedger: async (req, res) => {
    try {
      const { user_id, source_user_id, lead_id, level, earning_type, amount, product_id, product_category, status, payout_date, withdrawal_request_id } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO payout_ledger (user_id, source_user_id, lead_id, level, earning_type, amount, product_id, product_category, status, payout_date, withdrawal_request_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [user_id, source_user_id, lead_id, level, earning_type, amount, product_id, product_category, status, payout_date, withdrawal_request_id]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Ledger entry created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateLedger: async (req, res) => {
    try {
      const { status, payout_date } = req.body;
      const [result] = await db.execute('UPDATE payout_ledger SET status = ?, payout_date = ? WHERE id = ?', [status, payout_date, req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Ledger entry not found' });
      }
      
      res.json({ message: 'Ledger entry updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteLedger: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM payout_ledger WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Ledger entry not found' });
      }
      
      res.json({ message: 'Ledger entry deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = payoutLedgerController;