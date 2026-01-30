const express = require('express');
const router = express.Router();
const payoutLedgerController = require('../controllers/payoutLedgerController');

router.get('/', payoutLedgerController.getAllLedger);
router.get('/:id', payoutLedgerController.getLedgerById);
router.post('/', payoutLedgerController.createLedger);
router.put('/:id', payoutLedgerController.updateLedger);
router.delete('/:id', payoutLedgerController.deleteLedger);

module.exports = router;