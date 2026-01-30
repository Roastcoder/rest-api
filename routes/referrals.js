const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');

// GET /api/referrals - Get all referrals
router.get('/', referralController.getAllReferrals);

// GET /api/referrals/:id - Get referral by ID
router.get('/:id', referralController.getReferralById);

// GET /api/referrals/referrer/:referrerId - Get referrals by referrer user ID
router.get('/referrer/:referrerId', referralController.getReferralsByReferrer);

// GET /api/referrals/status/:status - Get referrals by status
router.get('/status/:status', referralController.getReferralsByStatus);

// POST /api/referrals - Create new referral
router.post('/', referralController.createReferral);

// PUT /api/referrals/:id - Update referral
router.put('/:id', referralController.updateReferral);

// DELETE /api/referrals/:id - Delete referral
router.delete('/:id', referralController.deleteReferral);

module.exports = router;