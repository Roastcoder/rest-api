const db = require('../config/database');

const kycSubmissionController = {
  getAllSubmissions: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM kyc_submissions');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSubmissionById: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM kyc_submissions WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Submission not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createSubmission: async (req, res) => {
    try {
      const { email, aadhar, pan, selfie_path, submitted_at, bank_name, account_number, ifsc_code, pan_image, aadhar_image, bank_image, status } = req.body;
      
      const [result] = await db.execute(
        `INSERT INTO kyc_submissions (email, aadhar, pan, selfie_path, submitted_at, bank_name, account_number, ifsc_code, pan_image, aadhar_image, bank_image, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [email, aadhar, pan, selfie_path, submitted_at, bank_name, account_number, ifsc_code, pan_image, aadhar_image, bank_image, status]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Submission created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateSubmission: async (req, res) => {
    try {
      const { status } = req.body;
      const [result] = await db.execute('UPDATE kyc_submissions SET status = ? WHERE id = ?', [status, req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Submission not found' });
      }
      
      res.json({ message: 'Submission updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteSubmission: async (req, res) => {
    try {
      const [result] = await db.execute('DELETE FROM kyc_submissions WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Submission not found' });
      }
      
      res.json({ message: 'Submission deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = kycSubmissionController;