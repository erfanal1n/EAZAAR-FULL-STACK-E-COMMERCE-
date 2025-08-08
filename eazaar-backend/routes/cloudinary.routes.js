const express = require('express');
const router = express.Router();
// internal
const uploader = require('../middleware/uploder');
const { cloudinaryController } = require('../controller/cloudinary.controller');
const verifyToken = require('../middleware/verifyToken');
const { checkDemoMode } = require('../middleware/demoMode');
const { demoProtection } = require('../middleware/demoProtection');
const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});


//add image
router.post('/add-img', demoProtection, verifyToken, checkDemoMode, upload.single('image'), cloudinaryController.saveImageCloudinary);

//add image
router.post('/add-multiple-img', demoProtection, verifyToken, checkDemoMode, upload.array('images',5), cloudinaryController.addMultipleImageCloudinary);

//delete image
router.delete('/img-delete', demoProtection, verifyToken, checkDemoMode, cloudinaryController.cloudinaryDeleteController);

module.exports = router;