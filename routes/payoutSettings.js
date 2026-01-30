const express = require('express');
const router = express.Router();
const payoutSettingController = require('../controllers/payoutSettingController');

router.get('/', payoutSettingController.getAllSettings);
router.get('/:id', payoutSettingController.getSettingById);
router.post('/', payoutSettingController.createSetting);
router.put('/:id', payoutSettingController.updateSetting);
router.delete('/:id', payoutSettingController.deleteSetting);

module.exports = router;