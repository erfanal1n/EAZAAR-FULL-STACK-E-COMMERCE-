const express = require('express');
const { fileUpload } = require('../controller/upload.controller');
const uploader = require('../middleware/uploder');
const verifyToken = require('../middleware/verifyToken');
const { checkDemoMode } = require('../middleware/demoMode');
const { demoProtection } = require('../middleware/demoProtection');

const router = express.Router();

// routes
router.post('/single', demoProtection, verifyToken, checkDemoMode, uploader.single('file'), fileUpload)

module.exports = router;