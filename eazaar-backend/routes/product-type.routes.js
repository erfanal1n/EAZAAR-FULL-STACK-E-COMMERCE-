const express = require('express');
const router = express.Router();
// internal
const productTypeController = require('../controller/product-type.controller');
const verifyToken = require('../middleware/verifyToken');
const { checkDemoMode } = require('../middleware/demoMode');
const { demoProtection } = require('../middleware/demoProtection');

// get single product type
router.get('/get/:id', productTypeController.getSingleProductType);
// add product type
router.post('/add', demoProtection, verifyToken, checkDemoMode, productTypeController.addProductType);
// add all product type
router.post('/add-all', demoProtection, verifyToken, checkDemoMode, productTypeController.addAllProductType);
// get all product type
router.get('/all', productTypeController.getAllProductType);
// get active product type
router.get('/active', productTypeController.getActiveProductType);
// get product type by slug
router.get('/slug/:slug', productTypeController.getProductTypeBySlug);
// delete product type
router.delete('/delete/:id', demoProtection, verifyToken, checkDemoMode, productTypeController.deleteProductType);
// update product type
router.patch('/edit/:id', demoProtection, verifyToken, checkDemoMode, productTypeController.updateProductType);
// toggle product type status
router.patch('/toggle-status/:id', demoProtection, verifyToken, checkDemoMode, productTypeController.toggleProductTypeStatus);
// get product type statistics
router.get('/stats', productTypeController.getProductTypeStats);

module.exports = router;