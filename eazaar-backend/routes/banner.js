const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { checkDemoMode } = require('../middleware/demoMode');
const { demoProtection } = require('../middleware/demoProtection');
const {
  getBannerById,
  updateBanner,
  bulkUpdateStatus,
  bulkUpdateStyle,
  bulkUpdateAnimation
} = require('../controller/bannerController');

router.get('/:id', getBannerById);
router.put('/:id', demoProtection, verifyToken, checkDemoMode, updateBanner);
router.patch('/bulk/status', demoProtection, verifyToken, checkDemoMode, bulkUpdateStatus);
router.patch('/bulk/style', demoProtection, verifyToken, checkDemoMode, bulkUpdateStyle);
router.patch('/bulk/animation', demoProtection, verifyToken, checkDemoMode, bulkUpdateAnimation);

module.exports = router;