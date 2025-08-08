const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { checkDemoMode } = require('../middleware/demoMode');
const { demoProtection } = require('../middleware/demoProtection');
const {
  getAllCurrencies,
  getDefaultCurrency,
  getCurrencyById,
  createCurrency,
  updateCurrency,
  deleteCurrency,
  setDefaultCurrency,
  toggleCurrencyStatus,
  formatAmount,
  seedDefaultCurrencies
} = require('../controller/currencyConfigController');

// Public routes (no authentication required)
router.get('/default', getDefaultCurrency);
router.get('/active', getAllCurrencies); // Will filter active currencies via query param
router.post('/format', formatAmount);

// Admin routes (authentication required - add middleware as needed)
router.get('/', getAllCurrencies);
router.get('/:id', getCurrencyById);
router.post('/', demoProtection, verifyToken, checkDemoMode, createCurrency);
router.put('/:id', demoProtection, verifyToken, checkDemoMode, updateCurrency);
router.delete('/:id', demoProtection, verifyToken, checkDemoMode, deleteCurrency);
router.patch('/:id/set-default', demoProtection, verifyToken, checkDemoMode, setDefaultCurrency);
router.patch('/:id/toggle-status', demoProtection, verifyToken, checkDemoMode, toggleCurrencyStatus);
router.post('/seed-defaults', demoProtection, verifyToken, checkDemoMode, seedDefaultCurrencies);

module.exports = router;