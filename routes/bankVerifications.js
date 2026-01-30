const express = require('express');
const router = express.Router();
const bankVerificationController = require('../controllers/bankVerificationController');

router.get('/', bankVerificationController.getAllVerifications);
router.get('/:id', bankVerificationController.getVerificationById);
router.post('/', bankVerificationController.createVerification);
router.put('/:id', bankVerificationController.updateVerification);
router.delete('/:id', bankVerificationController.deleteVerification);

module.exports = router;