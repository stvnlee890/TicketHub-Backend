const express = require("express");
const router = express.Router();
const User = require("../model/Users");
const bcrypt = require("bcrypt");
const { createUserToken } = require("../auth/auth");

router.post("/signup", async (req, res, next) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password });
    console.log(req.body);
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
