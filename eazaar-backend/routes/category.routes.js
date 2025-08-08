const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');
const verifyToken = require('../middleware/verifyToken');
const { checkDemoMode } = require('../middleware/demoMode');
const { demoProtection } = require('../middleware/demoProtection');

// get
router.get('/get/:id', categoryController.getSingleCategory);
// add
router.post('/add', demoProtection, verifyToken, checkDemoMode, categoryController.addCategory);
// add All Category
router.post('/add-all', demoProtection, verifyToken, checkDemoMode, categoryController.addAllCategory);
// get all Category
router.get('/all', categoryController.getAllCategory);
// get Product Type Category
router.get('/show/:type', categoryController.getProductTypeCategory);
// get Show Category
router.get('/show', categoryController.getShowCategory);
// delete category
router.delete('/delete/:id', demoProtection, verifyToken, checkDemoMode, categoryController.deleteCategory);
// delete product
router.patch('/edit/:id', demoProtection, verifyToken, checkDemoMode, categoryController.updateCategory);

module.exports = router;