const db = require('../config/database');

const bankVerificationController = {
  getAllVerifications: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM bank_verifications');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getVerificationById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM bank_verifications WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Verification not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createVerification: async (req, res) => {
    try {
      const { user_id, user_email, account_number, ifsc_code, bank_name, branch_name, account_holder_name, account_exists, status } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO bank_verifications (user_id, user_email, account_number, ifsc_code, bank_name, branch_name, account_holder_name, account_exists, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [user_id, user_email, account_number, ifsc_code, bank_name, branch_name, account_holder_name, account_exists, status]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Verification created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateVerification: async (req, res) => {
    try {
      const { status, account_exists } = req.body;
      const [result] = await db.execute('UPDATE bank_verifications SET status = ?, account_exists = ? WHERE id = ?', [status, account_exists, req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Verification not found' });
      }
      
      res.json({ message: 'Verification updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteVerification: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM bank_verifications WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Verification not found' });
      }
      
      res.json({ message: 'Verification deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = bankVerificationController;