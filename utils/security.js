const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { parse } = require("dotenv");
const { constants } = require("../constants");
require("dotenv").config();

async function utilHashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

function createJWToken(payload, options, secret = process.env.JWT_SECRET) {
  try {
    return jwt.sign(payload, secret, options);
  } catch (error) {
    console.log("error signing jwt token: " + error);
    return { message: "error signing jwt token: " + error };
  }
}

function checkJWToken(token) {
  try {
    const parsedToken = jwt.decode(token, { complete: true });
    if (!parsedToken) {
      throw new Error("Invalid JWT token");
    }
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    const currentTime = Math.floor(Date.now() / 1000);
    const timeLeft = parsedToken.payload.exp - currentTime;

    if (timeLeft < 300) {
      // less than 5 minutes time -> new one
      const token = createJWToken(
        { userId: parsedToken.payload.userId },
        { expiresIn: constants.expiresIn }
      );
      return jwt.decode(token, { complete: true }).payload;
    } else {
      return parsedToken.payload;
    }
  } catch (error) {
    throw new Error("Invalid JWT token");
  }
}

async function comparePasswords(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

module.exports = {
  createJWToken,
  comparePasswords,
  checkJWToken,
  utilHashPassword,
};
