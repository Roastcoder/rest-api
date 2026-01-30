const express = require('express');
const router = express.Router();
const { advisorProductController, productHistoryController, userNoticeReadController } = require('../controllers/miscControllers');

// Advisor Products
router.get('/advisor-products', advisorProductController.getAllAdvisorProducts);
router.get('/advisor-products/:id', advisorProductController.getAdvisorProductById);
router.post('/advisor-products', advisorProductController.createAdvisorProduct);
router.put('/advisor-products/:id', advisorProductController.updateAdvisorProduct);
router.delete('/advisor-products/:id', advisorProductController.deleteAdvisorProduct);

// Product History
router.get('/product-history', productHistoryController.getAllHistory);
router.get('/product-history/:id', productHistoryController.getHistoryById);
router.post('/product-history', productHistoryController.createHistory);

// User Notice Reads
router.get('/user-notice-reads', userNoticeReadController.getAllReads);
router.post('/user-notice-reads', userNoticeReadController.createRead);

module.exports = router;