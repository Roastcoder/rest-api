const express = require('express');
const router = express.Router();
const withdrawalRequestController = require('../controllers/withdrawalRequestController');

router.get('/', withdrawalRequestController.getAllRequests);
router.get('/:id', withdrawalRequestController.getRequestById);
router.post('/', withdrawalRequestController.createRequest);
router.put('/:id', withdrawalRequestController.updateRequest);
router.delete('/:id', withdrawalRequestController.deleteRequest);

module.exports = router;