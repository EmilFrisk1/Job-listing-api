const express = require("express");
const {
  getEmployeesCntrl,
  deleteEmployeeCntrl,
  createEmployeeCntrl,
  editEmployeeCntrl,
} = require("../controller/employee");
const { authUser, requireAdmin } = require("../middleware/security");
const {
  validateDeleteEmployee,
  validateCreateEmployee,
  validateEditEmployee,
} = require("../middleware/validation");
const router = express.Router();

router.post("/get-employees", authUser, requireAdmin, getEmployeesCntrl);
router.delete(
  "/delete-employee",
  authUser,
  requireAdmin,
  validateDeleteEmployee,
  deleteEmployeeCntrl
);
router.post(
  "/create-employee",
  authUser,
  requireAdmin,
  validateCreateEmployee,
  createEmployeeCntrl
);
router.put(
  "/edit-employee",
  authUser,
  requireAdmin,
  validateEditEmployee,
  editEmployeeCntrl
);

module.exports = router;
