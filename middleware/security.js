const bcrypt = require("bcryptjs");
const { findUserByEmail, findUserById } = require("../database");
const { checkJWToken } = require("../utils/security");

async function hashPassword(req, res, next) {
  const { password } = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  req.hashedPassword = hashedPassword;
  next();
}

async function getUser(req, res, next) {
  try {
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      res.status(400).json({ message: "no user with this email" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error finding the user...");
    res.status(400).json({ message: "no user with this email" });
  }
}

function authUser(req, res, next) {
  try {
    const parsedToken = checkJWToken(req.body.jwt);
    req.userId = parsedToken.userId;
    next();
  } catch (error) {
    console.log("error: " + error);
    res.status(403).json({ message: "invalid token" });
  }
}

async function requireAdmin(req, res, next) {
  try {
    const user = await findUserById(req.userId);
    console.log("user found: " + user);

    if (!user) {
      res.status(400).json({ message: "no user with this id" });
    }

    if (user.role == null || user.role == undefined || user.role == "basic") {
      res.status(403).json({ message: "forbidden" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error finding a user: " + error);
    res.status(400).json({ message: error });
  }
}

module.exports = { hashPassword, getUser, authUser, requireAdmin };
