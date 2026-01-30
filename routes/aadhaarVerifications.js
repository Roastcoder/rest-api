const express = require('express');
const router = express.Router();
const aadhaarVerificationController = require('../controllers/aadhaarVerificationController');

router.get('/', aadhaarVerificationController.getAllVerifications);
router.get('/:id', aadhaarVerificationController.getVerificationById);
router.post('/', aadhaarVerificationController.createVerification);
router.put('/:id', aadhaarVerificationController.updateVerification);
router.delete('/:id', aadhaarVerificationController.deleteVerification);

module.exports = router;