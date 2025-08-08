const express = require('express');
const router = express.Router();
const {
  addCoupon,
  addAllCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
} = require('../controller/coupon.controller');
const verifyToken = require('../middleware/verifyToken');
const { checkDemoMode } = require('../middleware/demoMode');
const { demoProtection } = require('../middleware/demoProtection');

//add a coupon
router.post('/add', demoProtection, verifyToken, checkDemoMode, addCoupon);

//add multiple coupon
router.post('/all', demoProtection, verifyToken, checkDemoMode, addAllCoupon);

//get all coupon
router.get('/', getAllCoupons);

//get a coupon
router.get('/:id', getCouponById);

//update a coupon
router.patch('/:id', demoProtection, verifyToken, checkDemoMode, updateCoupon);

//delete a coupon
router.delete('/:id', demoProtection, verifyToken, checkDemoMode, deleteCoupon);

module.exports = router;
