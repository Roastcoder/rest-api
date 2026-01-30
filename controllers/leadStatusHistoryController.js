const db = require('../config/database');

const leadStatusHistoryController = {
  getAllHistory: async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT lsh.*, l.lead_id as lead_reference, l.customer_name 
        FROM lead_status_history lsh 
        LEFT JOIN leads l ON lsh.lead_id = l.id
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getHistoryById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM lead_status_history WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'History not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createHistory: async (req, res) => {
    try {
      const { lead_id, old_status, new_status, changed_by, notes } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO lead_status_history (lead_id, old_status, new_status, changed_by, notes) VALUES (?, ?, ?, ?, ?)`,
        [lead_id, old_status, new_status, changed_by, notes]
      );
      
      res.status(201).json({ id: result.insertId, message: 'History created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteHistory: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM lead_status_history WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'History not found' });
      }
      
      res.json({ message: 'History deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = leadStatusHistoryController;