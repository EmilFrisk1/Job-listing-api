const { deleteUser, editUser } = require("../database");

async function deleteUserCntrl(req, res) {
  try {
    await deleteUser(req.userId);
    res.status(200).json({ message: "user deleted" });
  } catch (error) {
    console.log("error deleting a user: " + error);
  }
}

async function editUserCntrl(req, res) {
  try {
    await editUser(req.body, req.userId);
    res.status(200).json({ message: "user edited" });
  } catch (error) {
    console.log("error editing user: " + error);
    res.status(400);
  }
}

async function setAdminCntrl(req, res) {
  try {
    await editUser({ role: "admin" }, req.body.user_id);
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log("error editing user: " + error);
  }
}

module.exports = { deleteUserCntrl, editUserCntrl, setAdminCntrl };
