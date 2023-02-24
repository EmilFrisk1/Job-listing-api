const express = require("express");
const {
  deleteUserCntrl,
  editUserCntrl,
  setAdminCntrl,
} = require("../controller/user");
const { authUser, requireAdmin } = require("../middleware/security");
const {
  validateEditUser,
  validateSetAdmin,
} = require("../middleware/validation");
const router = express.Router();

router.delete("/delete-user", authUser, deleteUserCntrl);
router.put("/edit-user", authUser, validateEditUser, editUserCntrl);
router.put(
  "/set-admin",
  authUser,
  requireAdmin,
  validateSetAdmin,
  setAdminCntrl
);

module.exports = router;
