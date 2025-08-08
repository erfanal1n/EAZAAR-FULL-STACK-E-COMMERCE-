const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { checkDemoMode } = require('../middleware/demoMode');
const { demoProtection } = require('../middleware/demoProtection');

// Import controller functions
const controller = require("../controller/invoice-settings.controller");
const { getInvoiceSettings, updateInvoiceSettings, resetInvoiceSettings } = controller;

const router = express.Router();

// Get invoice settings (public - needed for displaying invoices)
router.get("/", getInvoiceSettings);

// Update invoice settings (admin only)
router.put("/", demoProtection, verifyToken, checkDemoMode, updateInvoiceSettings);

// Reset invoice settings (admin only)
router.delete("/reset", demoProtection, verifyToken, checkDemoMode, resetInvoiceSettings);

module.exports = router;