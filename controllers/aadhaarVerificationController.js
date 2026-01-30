const db = require('../config/database');

const aadhaarVerificationController = {
  getAllVerifications: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM aadhaar_verifications');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getVerificationById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM aadhaar_verifications WHERE id = ?', [req.params.id]);
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
      const { user_id, user_email, aadhaar_number, name, dob, gender, house, street, locality, landmark, district, state, pincode, full_address, photo, status } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO aadhaar_verifications (user_id, user_email, aadhaar_number, name, dob, gender, house, street, locality, landmark, district, state, pincode, full_address, photo, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [user_id, user_email, aadhaar_number, name, dob, gender, house, street, locality, landmark, district, state, pincode, full_address, photo, status]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Verification created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateVerification: async (req, res) => {
    try {
      const { status } = req.body;
      const [result] = await db.execute('UPDATE aadhaar_verifications SET status = ? WHERE id = ?', [status, req.params.id]);
      
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
      const [result] = await db.execute('DELETE FROM aadhaar_verifications WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Verification not found' });
      }
      
      res.json({ message: 'Verification deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = aadhaarVerificationController;