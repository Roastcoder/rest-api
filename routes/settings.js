const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');

router.get('/', settingController.getAllSettings);
router.get('/:id', settingController.getSettingById);
router.get('/key/:key', settingController.getSettingByKey);
router.post('/', settingController.createSetting);
router.put('/:id', settingController.updateSetting);
router.delete('/:id', settingController.deleteSetting);

module.exports = router;