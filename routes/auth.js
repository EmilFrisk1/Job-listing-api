const express = require("express");
const { createUser } = require("../database");
const router = express.Router();
const {
  validateSignup,
  validateSignIn,
} = require("./../middleware/validation");
const { hashPassword, getUser } = require("./../middleware/security");
const { signUp, signIn } = require("../controller/auth");

router.post("/signup", validateSignup, hashPassword, signUp);

router.post("/signin", validateSignIn, getUser, signIn);

module.exports = router;
