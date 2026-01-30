const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

// GET /api/leads - Get all leads
router.get('/', leadController.getAllLeads);

// GET /api/leads/:id - Get lead by ID
router.get('/:id', leadController.getLeadById);

// GET /api/leads/channel/:channelCode - Get leads by channel code
router.get('/channel/:channelCode', leadController.getLeadsByChannel);

// GET /api/leads/status/:status - Get leads by status
router.get('/status/:status', leadController.getLeadsByStatus);

// POST /api/leads - Create new lead
router.post('/', leadController.createLead);

// PUT /api/leads/:id - Update lead
router.put('/:id', leadController.updateLead);

// DELETE /api/leads/:id - Delete lead
router.delete('/:id', leadController.deleteLead);

module.exports = router;