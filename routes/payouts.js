const express = require('express');
const router = express.Router();
const payoutController = require('../controllers/payoutController');

// GET /api/payouts - Get all payouts
router.get('/', payoutController.getAllPayouts);

// GET /api/payouts/:id - Get payout by ID
router.get('/:id', payoutController.getPayoutById);

// GET /api/payouts/channel/:channelCode - Get payouts by channel code
router.get('/channel/:channelCode', payoutController.getPayoutsByChannel);

// GET /api/payouts/status/:status - Get payouts by status
router.get('/status/:status', payoutController.getPayoutsByStatus);

// POST /api/payouts - Create new payout
router.post('/', payoutController.createPayout);

// PUT /api/payouts/:id - Update payout
router.put('/:id', payoutController.updatePayout);

// DELETE /api/payouts/:id - Delete payout
router.delete('/:id', payoutController.deletePayout);

module.exports = router;