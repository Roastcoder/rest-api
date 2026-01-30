const express = require('express');
const router = express.Router();
const apiKeyController = require('../controllers/apiKeyController');

router.get('/', apiKeyController.getAllApiKeys);
router.get('/:id', apiKeyController.getApiKeyById);
router.post('/', apiKeyController.createApiKey);
router.put('/:id', apiKeyController.updateApiKey);
router.delete('/:id', apiKeyController.deleteApiKey);

module.exports = router;