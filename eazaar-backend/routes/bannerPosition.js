const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { checkDemoMode } = require('../middleware/demoMode');
const { demoProtection } = require('../middleware/demoProtection');
const {
  getAllPositions,
  getPositionByName,
  updatePositionSettings,
  addSlideToPosition,
  removeSlideFromPosition,
  reorderSlides
} = require('../controller/bannerPositionController');

router.get('/', getAllPositions);
router.get('/:name', getPositionByName);
router.put('/:id/settings', demoProtection, verifyToken, checkDemoMode, updatePositionSettings);
router.post('/:id/slides', demoProtection, verifyToken, checkDemoMode, addSlideToPosition);
router.delete('/:id/slides/:slideId', demoProtection, verifyToken, checkDemoMode, removeSlideFromPosition);
router.patch('/:id/slides/reorder', demoProtection, verifyToken, checkDemoMode, reorderSlides);

module.exports = router;