const express = require('express');
const router = express.Router();
const brandController = require('../controller/brand.controller');
const verifyToken = require('../middleware/verifyToken');
const { checkDemoMode } = require('../middleware/demoMode');
const { demoProtection } = require('../middleware/demoProtection');

// add Brand
router.post('/add', demoProtection, verifyToken, checkDemoMode, brandController.addBrand);
// add All Brand
router.post('/add-all', demoProtection, verifyToken, checkDemoMode, brandController.addAllBrand);
// get Active Brands
router.get('/active',brandController.getActiveBrands);
// get all Brands
router.get('/all',brandController.getAllBrands);
// delete brand
router.delete('/delete/:id', demoProtection, verifyToken, checkDemoMode, brandController.deleteBrand);
// get single
router.get('/get/:id', brandController.getSingleBrand);
// delete product
router.patch('/edit/:id', demoProtection, verifyToken, checkDemoMode, brandController.updateBrand);

module.exports = router;