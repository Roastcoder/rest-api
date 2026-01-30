const express = require('express');
const router = express.Router();
const leadStatusHistoryController = require('../controllers/leadStatusHistoryController');

router.get('/', leadStatusHistoryController.getAllHistory);
router.get('/:id', leadStatusHistoryController.getHistoryById);
router.post('/', leadStatusHistoryController.createHistory);
router.delete('/:id', leadStatusHistoryController.deleteHistory);

module.exports = router;