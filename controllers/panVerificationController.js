const db = require('../config/database');

const panVerificationController = {
  getAllVerifications: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM pan_verifications');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getVerificationById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM pan_verifications WHERE id = ?', [req.params.id]);
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
      const { user_id, user_email, pan_number, full_name, first_name, middle_name, last_name, dob, father_name, gender, aadhaar_link_status, status } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO pan_verifications (user_id, user_email, pan_number, full_name, first_name, middle_name, last_name, dob, father_name, gender, aadhaar_link_status, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [user_id, user_email, pan_number, full_name, first_name, middle_name, last_name, dob, father_name, gender, aadhaar_link_status, status]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Verification created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateVerification: async (req, res) => {
    try {
      const { status, aadhaar_link_status } = req.body;
      const [result] = await db.execute('UPDATE pan_verifications SET status = ?, aadhaar_link_status = ? WHERE id = ?', [status, aadhaar_link_status, req.params.id]);
      
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
      const [result] = await db.execute('DELETE FROM pan_verifications WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Verification not found' });
      }
      
      res.json({ message: 'Verification deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = panVerificationController;