const express = require('express');
const router = express.Router();
const kycSubmissionController = require('../controllers/kycSubmissionController');

router.get('/', kycSubmissionController.getAllSubmissions);
router.get('/:id', kycSubmissionController.getSubmissionById);
router.post('/', kycSubmissionController.createSubmission);
router.put('/:id', kycSubmissionController.updateSubmission);
router.delete('/:id', kycSubmissionController.deleteSubmission);

module.exports = router;