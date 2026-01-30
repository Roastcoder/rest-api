const db = require('../config/database');

const withdrawalRequestController = {
  getAllRequests: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT w.*, u.name as user_name, u.email as user_email 
        FROM withdrawal_requests w 
        LEFT JOIN users u ON w.user_id = u.id
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getRequestById: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT w.*, u.name as user_name, u.email as user_email 
        FROM withdrawal_requests w 
        LEFT JOIN users u ON w.user_id = u.id 
        WHERE w.id = ?
      `, [req.params.id]);
      
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Request not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createRequest: async (req, res) => {
    try {
      const { user_id, amount, status, request_date, processed_date, invoice_path, notes } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO withdrawal_requests (user_id, amount, status, request_date, processed_date, invoice_path, notes) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [user_id, amount, status, request_date, processed_date, invoice_path, notes]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Request created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateRequest: async (req, res) => {
    try {
      const { status, processed_date, invoice_path, notes } = req.body;
      const [result] = await db.execute('UPDATE withdrawal_requests SET status = ?, processed_date = ?, invoice_path = ?, notes = ? WHERE id = ?', [status, processed_date, invoice_path, notes, req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Request not found' });
      }
      
      res.json({ message: 'Request updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteRequest: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM withdrawal_requests WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Request not found' });
      }
      
      res.json({ message: 'Request deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = withdrawalRequestController;