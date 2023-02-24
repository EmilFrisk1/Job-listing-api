const { createUser } = require("../database");
const { createJWToken, comparePasswords } = require("./../utils/security");
const { constants } = require("./../constants");

async function signUp(req, res) {
  try {
    const { email, username } = req.body;
    const user = await createUser(
      username,
      email,
      req.hashedPassword,
      false,
      null
    );

    console.log(user);
    const token = createJWToken(
      { userId: user[0].user_id },
      { expiresIn: constants.expiresIn }
    );
    res.setHeader("jwt", token);
    res.status(201).json({ message: "user created" });
  } catch (error) {
    console.error("test + " + error.message);
    res.status(400).json({ message: error.message });
  }
}

async function signIn(req, res) {
  try {
    const result = await comparePasswords(
      req.body.password,
      req.user.user_password
    );
    if (!result) {
      res.status(400).json({ message: "email or password is wrong" });
    }

    const token = createJWToken(
      { userId: req.user.user_id },
      { expiresIn: constants.expiresIn }
    );

    res.setHeader("jwt", token);
    res.status(200).json({ message: "ok" });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { signUp, signIn };
