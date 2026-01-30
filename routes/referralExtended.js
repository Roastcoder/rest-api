const express = require('express');
const router = express.Router();
const referralBonusController = require('../controllers/referralBonusController');
const referralHierarchyController = require('../controllers/referralHierarchyController');
const referralLinkController = require('../controllers/referralLinkController');

// Referral Bonuses
router.get('/bonuses', referralBonusController.getAllBonuses);
router.get('/bonuses/:id', referralBonusController.getBonusById);
router.post('/bonuses', referralBonusController.createBonus);
router.put('/bonuses/:id', referralBonusController.updateBonus);
router.delete('/bonuses/:id', referralBonusController.deleteBonus);

// Referral Hierarchy
router.get('/hierarchy', referralHierarchyController.getAllHierarchy);
router.get('/hierarchy/:id', referralHierarchyController.getHierarchyById);
router.post('/hierarchy', referralHierarchyController.createHierarchy);
router.delete('/hierarchy/:id', referralHierarchyController.deleteHierarchy);

// Referral Links
router.get('/links', referralLinkController.getAllLinks);
router.get('/links/:id', referralLinkController.getLinkById);
router.post('/links', referralLinkController.createLink);
router.put('/links/:id', referralLinkController.updateLink);
router.delete('/links/:id', referralLinkController.deleteLink);

module.exports = router;