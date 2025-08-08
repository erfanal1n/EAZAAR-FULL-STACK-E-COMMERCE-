const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { checkDemoMode } = require('../middleware/demoMode');
const { demoProtection } = require('../middleware/demoProtection');
const {
  createAdminRole,
  getAllAdminRoles,
  getAdminRoleById,
  updateAdminRole,
  deleteAdminRole,
  getAvailablePagesForRole,
} = require("../controller/adminRoleController");

// Get available pages for role creation
router.get("/available-pages", getAvailablePagesForRole);

// Create a new admin role
router.post("/create", demoProtection, verifyToken, checkDemoMode, createAdminRole);

// Get all admin roles
router.get("/all", getAllAdminRoles);

// Get admin role by ID
router.get("/:id", getAdminRoleById);

// Update admin role
router.put("/:id", demoProtection, verifyToken, checkDemoMode, updateAdminRole);

// Delete admin role
router.delete("/:id", demoProtection, verifyToken, checkDemoMode, deleteAdminRole);

module.exports = router;