const express = require('express');
const router = express.Router();
const panVerificationController = require('../controllers/panVerificationController');

router.get('/', panVerificationController.getAllVerifications);
router.get('/:id', panVerificationController.getVerificationById);
router.post('/', panVerificationController.createVerification);
router.put('/:id', panVerificationController.updateVerification);
router.delete('/:id', panVerificationController.deleteVerification);

module.exports = router;