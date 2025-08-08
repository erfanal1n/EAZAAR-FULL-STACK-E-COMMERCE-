const express = require("express");
const router = express.Router();
const { checkDemoMode } = require("../middleware/demoMode");
const { demoProtection } = require("../middleware/demoProtection");
const verifyToken = require("../middleware/verifyToken");
const {
  registerAdmin,
  loginAdmin,
  updateStaff,
  changePassword,
  addStaff,
  getAllStaff,
  deleteStaff,
  getStaffById,
  forgetPassword,
  confirmAdminForgetPass,
} = require("../controller/admin.controller");

//register a staff
router.post("/register", registerAdmin);

//login a admin
router.post("/login", loginAdmin);

//change password
router.patch("/change-password", demoProtection, verifyToken, checkDemoMode, changePassword);

//add staff
router.post("/add", demoProtection, verifyToken, checkDemoMode, addStaff);

//get all staff
router.get("/all", getAllStaff);

//forget password
router.patch("/forget-password", forgetPassword);

//confirm forget password
router.patch("/confirm-forget-password", confirmAdminForgetPass);

//get staff by id
router.get("/get/:id", getStaffById);

//update staff
router.patch("/update-stuff/:id", demoProtection, verifyToken, checkDemoMode, updateStaff);

//delete staff
router.delete("/:id", demoProtection, verifyToken, checkDemoMode, deleteStaff);

module.exports = router;
